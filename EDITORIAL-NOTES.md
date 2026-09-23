# Editorial review

The local repository was five commits behind GitHub. It was fast-forwarded to `dab90fa` before this editing pass.

The pass covers all 12 current guide chapters, the homepage, system and simulation diagrams, and PDF status messages. It uses direct instructions, explains how to interpret readings, and removes repeated promotional claims. Historical chapters in `content/_archive/docs/`, screenshot artwork, technical identifiers, and chapter metadata are unchanged.

## Details for Jon to confirm

- **Guest and vehicle counts:** In the Guest Experience chapter, “Vehicle type mix” and “Guest per vehicle type” both show `22 buggy, 9 shuttle, 5 bus, 4 boat, 3 bike`. Confirm whether the guest row should contain different values. The original examples have been preserved.
- **Operations wind category:** The simulation grid places Operations wind under Transport, but the detailed Operations wind section is in the Environment chapter. The Operations persona chapter also omits it from its simulation list. Confirm the intended category before moving sections or changing navigation.
- **Evacuation engines:** The Operations building-model section names Pathfinder; the simulation grid names MassMotion for evacuation. Confirm whether these describe separate integrations. Both names have been preserved.
- **Persona titles:** The guide already asks for formal role expansions to be checked against the RSG IOC Technical statement of work. That qualification remains.

The role-entry instructions now follow the Interface Guide: users sign in with an account assigned to a persona. They no longer refer to a persona-switching bar. Guest Experience dispatch wording also follows the stated division of responsibility: Guest Experience recommends a response and Operations handles the dispatch.

## Validation

- Production build and TypeScript checks passed; all 12 guide pages rendered.
- All 125 image references and 64 internal documentation links passed checks.
- Chapter metadata, heading anchors, link targets, and MDX component markup were preserved.
- The five edited application files passed ESLint.
- Repository-wide lint still reports two errors in untouched files: an explicit `any` in `src/app/docs/[slug]/page.tsx` and synchronous state updates in an effect in `src/components/search-box.tsx`. It also reports nine warnings.

