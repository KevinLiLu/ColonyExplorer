# eslint-config-colony

The eslint configuration used for Colony OSS projects. Instructions copied from [eslint-config-airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/README.md)

## Usage

Our default export contains all of our ESLint rules.

**Requirements**

* `eslint`
* `babel-eslint`
* `eslint-config-airbnb-base`
* `eslint-config-prettier`
* `eslint-plugin-flowtype`
* `eslint-plugin-import`
* `eslint-plugin-prettier`
* `prettier`

If you use yarn, run `npm info "@colony/eslint-config-colony@latest" peerDependencies` to list the peer dependencies and versions, then run `yarn add --dev <dependency>@<version>` for each listed peer dependency. See below for npm instructions.

1. Install the correct versions of each package, which are listed by the command:

  ```sh
  npm info "@colony/eslint-config-colony@latest" peerDependencies
  ```

  Linux/OSX users can run

  ```sh
  (
    export PKG=@colony/eslint-config-colony;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev "$PKG@latest"
  )
  ```


2. Add `"extends": "@colony/eslint-config-colony"` to your .eslintrc
