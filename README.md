# TS Object Schema

Quick shallow object schema for strict TS types.

![License](https://img.shields.io/github/license/jannes-io/ts-object-schema)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue)](https://www.typescriptlang.org/) 
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

---

Also available on NPM.
[![NPM](https://nodei.co/npm/ts-shallow-object-schema.png)](https://nodei.co/npm/ts-shallow-object-schema/)

## Usage

```typescript
import * as assert from 'assert';
import validateObject from 'ts-shallow-object-schema';

const testData: unknown = {
  testString: 'hello',
  testInt: 5,
  testObj: {
    a: 'a',
    b: 1,
  },
  testArr: [1, 2, 3],
};

interface ITest {
  testString: string;
  testInt: number;
  testObj: object;
  testArr: number[];
  testOptional?: number;
}

const testSchema: Schema<ITest> = [{
  key: 'testString',
  type: 'string',
}, {
  key: 'testInt',
  type: 'number',
}, {
  key: 'testObj',
  type: 'object',
}, {
  key: 'testArr',
  type: 'object',
}, {
  key: 'testOptional',
  type: 'number',
  optional: true,
}];


assert.strictEquals(validateObject(testSchema, testData), true); // true

const otherSchema: Schema<ITest> = [{
  key: 'missingKey',
  type: 'string',
}, ...testSchema];

assert.strictEquals(validateObject(otherSchema, testData), false); // true
```

### Scripts

Run a script using `yarn <script-name>`. To add/edit/remove scripts, see `scripts` section in `package.json`.

| Script | Usage |
| --- | --- |
|`lint`|Runs tslint and checks all files for any violations.|
|`build`|Builds the typescript into the dist folder|
|`upload`|Runs all of the above and adds dist_files files to dist before publishing on npm|

#### Dist files
In `./dist_files` you can find all the files that have to be included in the npm package
but which are not a result of the TypeScript compile process. Ex. package.json, README.md, LICENSE,... .
These files are automatically added to `./dist` when running `upload`.

Do not forget to change the version in `./dist_files/package.json` before running `upload`.
The package will be rejected by npm if the version is not changed.

#### TSLint
This project uses tslint to ensure a consistent code style.
To enable tslint please see your editor's manual.

⚠ Pull requests with tslint violations **WILL BE DENIED** ⚠

For PHPStorm/WebStorm this is under
Languages & Frameworks > TypeScript > TSLint > Automatic configuration

Depending on your editor/IDE you might have to change some automatic code completion settings.
