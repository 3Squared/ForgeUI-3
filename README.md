# Forge-UI 3

ForgeUI
is designed to be a wrapper around different libraries that provide a consistent UI style. It is comprised of many different packages, as well as custom components, that have been combined to create a one-stop shop for UI.

It is primarily built upon [PrimeVue](https://primevue.org/) and provides reusable UI components, an interactive playground, and a well-structured documentation system to streamline development.

The Forge-UI component library is built with a monorepo structure using Turbo. There are four projects within the monorepo:
```
ForgeUI-3/
├── packages/
│   ├── ui/          # Main UI components library
│   ├── eslint-config-custom/   # Shared ESLint configuration
│   ├── playground/  # Interactive playground for components
├── apps/
│   ├── docs/        # Documentation & styleguide
├── turbo.json       # Turbo configuration
└── package.json     # Root package.json
|__ rennovate.json   # Rennovate config
```
## Installation

### Getting Started with Turbo
[Turbo](https://turbo.build/repo/docs) helps manage and optimize the monorepo structure efficiently. To get started with Turbo in Forge:

#### (Optional) Install turbo

If you want to install turbo you can do this globally, otherwise it will just be installed with `npm i`:

```sh
npm install -g turbo
```

### Running Turbo Commands

##### Running All Builds

```sh
turbo run build
```

##### Running a Specific Package
To build a specific package, use:
```sh
turbo run build --filter ui
```

##### Running the Development Server
```sh
turbo run dev
```

### Running Forge Locally
Clone the repository and install the dependencies:
```sh
npm i
```

Do an initial build of all the packages
(you may want to do this whenever you pull a new branch, particularly if there are changes to multiple projects): 
```sh
turbo build
```

#### Running the styleguide(docs):
Running this should serve the docs with localhost:
```sh
cd apps/docs
npm run dev
```

If you have errors with this it could be because you have not built another package.

#### Building the UI
```sh
cd packages/ui
npm run build
```

If you are working a on a component and don't want to keep building this every time you make a change, 
you can run build watch:
```sh
cd packages/ui
npm run build:watch
```

#### Running UI tests:
Run these within the ui project.


This will run the full suite of test which include both the cypress tests and vitest tests.
```sh
npm run tests
```

If you want to run individual cypress tests for debugging or add news one use this:
```sh
npm run test:component
```






