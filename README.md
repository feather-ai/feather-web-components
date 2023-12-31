# feather Web Components

This repo contains the source code for the `@feather-ai/feather-web-components` package used to show model UIs in the feather web environments.

## ⚡ Installation

To install this package:

1.  Authenticate to GitHub Packages by [following these instructions.](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)
2.  Create an `.npmrc` file in the root of your project directory which includes the following line:

```
@feather-ai:registry=https://npm.pkg.github.com
```

3. Add `@feather-ai/feather-web-components` as a dependency to your `package.json` file.
4. Run `npm i` to install the package.

You may now use the package as required.

## 🚀 Quick Start

_Coming soon_

## 🔧 For Package Developers

This repo uses [webpack 5](https://webpack.js.org/) with [Babel 7](https://babeljs.io) to compile the React source code located in `src/` into bundled ES5 JS and CSS in `dist/`. The contents of `dist` are used to create an `npm` package for use in other repos.

### Building

To build a new version of the package (without publishing):

```
npm i
npm run build
npm pack
```

Running `npm pack` will generate a new `.tar.gz` package locally which can be added to any other repo with `npm install <file location>`. This can be used for testing before publishing a new version.

### Publishing

_Coming soon_

### Development Tools

This repo also uses [Gatsby.js](https://www.gatsbyjs.com/) and [Storybook](https://storybook.js.org/) to provide live development previews of the components for testing purposes.

To start the development server:

```
npm i
npm run start
```

To launch Storybook:

```
npm i
npm run storybook
```
