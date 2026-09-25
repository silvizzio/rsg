# RSG IOC operator guide

This repository contains the user guide for the Red Sea Global Integrated Operations Centre (IOC) Digital Twin. It covers the interface, four operator roles, simulation workflows, and shared terminology.

The site uses Next.js and renders the guide from MDX files in `content/docs/`.

## Preview the guide locally

Use Node.js 24, as specified in `package.json`. Install the dependencies if needed:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open [the local guide](http://localhost:3000/rsg). The `/rsg` path is required by the site's configuration. Edits appear as you save them.

## Edit the wording

The current guide has 12 chapters in `content/docs/`. Homepage text is in `src/app/page.tsx`, and the system and simulation diagrams are in `src/components/system-map.tsx` and `src/components/sim-flow.tsx`.

Keep product labels, example values, image filenames, and link destinations intact when editing. Links to simulation sections depend on both the simulation heading and the persona heading, so check incoming links if either heading changes.

Screenshots are stored in `private/images/docs/`. See [the image watcher instructions](tools/WATCH-README.md) for the image-processing workflow.

Older chapters remain in `content/_archive/docs/` for reference. The site loads its chapters from `content/docs/`, so edits to the archive do not change the published guide.

## Check changes

```bash
npm run build
npm run lint
```

The build checks TypeScript and renders the documentation pages. It needs network access to download the Inter font from Google Fonts. The lint command checks the application code.

To preview a completed production build:

```bash
npm run start
```

The site also provides buttons to download a chapter or the full guide as a PDF.

## Editorial reference

Follow [Documentation writing style](./EDITORIAL-STYLE.md) when revising the guide. Keep explanations natural, practical, and consistent with the product.
