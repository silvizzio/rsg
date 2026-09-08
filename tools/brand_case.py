#!/usr/bin/env python3
"""Normalise VIZZIO and POLYTRON brand names across MDX content."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

SENTINEL = "\x00"
TOKEN_RE = re.compile(SENTINEL + r"(\d+)" + SENTINEL)

SKIP_DIRS = {".git", "node_modules", ".next", "out", "build", "dist", ".vercel", ".turbo"}

FM_KEYS = {"title", "description", "summary", "label",
           "sidebar_label", "nav_label", "heading", "subtitle"}

PROTECTED_LITERALS = ["vizzio.space", "rsg-vizzio.vercel.app", "silvizzio"]

TLD = r"(?:com|net|org|io|ai|app|space|dev|co|sa|me|xyz)"

REPLACEMENTS = [
    (re.compile(r"\bpolytron\.ai\b", re.I), "POLYTRON AI"),
    (re.compile(r"\bpolytron[ \t]+one\b", re.I), "POLYTRON ONE"),
    (re.compile(r"\bpolytron\b", re.I), "POLYTRON"),
    (re.compile(r"\bworldbuilder\b", re.I), "WORLD BUILDER"),
    (re.compile(r"\bworld[ \t-]+builder\b", re.I), "WORLD BUILDER"),
    (re.compile(r"\bvizzio\b", re.I), "VIZZIO"),
]

MASK_RES = [
    re.compile(r"```.*?```", re.DOTALL),
    re.compile(r"~~~.*?~~~", re.DOTALL),
    re.compile(r"^[ \t]*(?:import|export)[ \t].*$", re.M),
    re.compile(r"`[^`\n]*`"),
    re.compile(r"^\[[^\]]+\]:[ \t]*\S+.*$", re.M),
    re.compile(r"\]\([^)\n]*\)"),
    re.compile(r"\b(?:href|src|to|url|path|slug|id|key|className|style)"
               r"\s*=\s*(?:\"[^\"]*\"|'[^']*'|\{[^}\n]*\})"),
    re.compile(r"</?[A-Z][\w.]*"),
    re.compile(r"https?://[^\s)>\"']+"),
    re.compile(r"\bwww\.[^\s)>\"']+"),
    re.compile(r"(?<![\w~.-])(?:~|\.{1,2})?/[\w./~@-]+"),
    re.compile(r"\b[\w.-]+/[\w./-]*\.\w{2,5}\b"),
]

LITERAL_RES = [re.compile(r"(?<![\w-])" + re.escape(x) + r"(?![\w-])", re.I)
               for x in PROTECTED_LITERALS]

BARE_DOMAIN_RE = re.compile(r"\b[\w-]+(?:\.[\w-]+)*\." + TLD + r"\b", re.I)

FM_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|\Z)", re.DOTALL)


class Masker:
    def __init__(self):
        self.store = []

    def stash_str(self, s):
        self.store.append(s)
        return SENTINEL + str(len(self.store) - 1) + SENTINEL

    def stash(self, m):
        return self.stash_str(m.group(0))

    def stash_domain(self, m):
        if m.group(0).lower() == "polytron.ai":
            return m.group(0)
        return self.stash_str(m.group(0))

    def unmask(self, text):
        prev = None
        while prev != text:
            prev = text
            text = TOKEN_RE.sub(lambda m: self.store[int(m.group(1))], text)
        return text


def mask_frontmatter(text, mk):
    m = FM_RE.match(text)
    if not m:
        return text
    lines = []
    for line in m.group(1).split("\n"):
        key = re.match(r"[ \t]*([\w.-]+)[ \t]*:", line)
        if key and key.group(1).lower() in FM_KEYS:
            lines.append(line)
        else:
            lines.append(mk.stash_str(line))
    return text[:m.start(1)] + "\n".join(lines) + text[m.end(1):]


def transform(text):
    mk = Masker()
    work = mask_frontmatter(text, mk)
    for rx in MASK_RES:
        work = rx.sub(mk.stash, work)
    for rx in LITERAL_RES:
        work = rx.sub(mk.stash, work)
    work = BARE_DOMAIN_RE.sub(mk.stash_domain, work)

    counts = {}
    for rx, repl in REPLACEMENTS:
        work, n = rx.subn(repl, work)
        if n:
            counts[repl] = counts.get(repl, 0) + n

    return mk.unmask(work), counts


def report(before, after):
    b = before.split("\n")
    a = after.split("\n")
    for i, (x, y) in enumerate(zip(b, a), 1):
        if x != y:
            print("  L%d  %s" % (i, x.strip()[:110]))
            print("   ->  %s" % y.strip()[:110])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=".")
    ap.add_argument("--ext", default=".mdx")
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    files = []
    for p in sorted(root.rglob("*" + args.ext)):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        files.append(p)

    changed = 0
    totals = {}
    for p in files:
        raw = p.read_text(encoding="utf-8")
        if SENTINEL in raw:
            print("SKIP (contains NUL byte): %s" % p.relative_to(root))
            continue
        new, counts = transform(raw)
        if new == raw:
            continue
        changed += 1
        print("\n%s" % p.relative_to(root))
        report(raw, new)
        for k, v in counts.items():
            totals[k] = totals.get(k, 0) + v
        if args.apply:
            p.write_text(new, encoding="utf-8")

    print("\n--- %s ---" % ("APPLIED" if args.apply else "DRY RUN"))
    print("files scanned: %d" % len(files))
    print("files changed: %d" % changed)
    for k in sorted(totals):
        print("  %-14s %d" % (k, totals[k]))
    if not args.apply and changed:
        print("\nRe-run with --apply to write changes.")


if __name__ == "__main__":
    main()
