# TS Object Schema

Quick shallow object schema for strict TS types with **0** dependencies.

![License](https://img.shields.io/github/license/jannes-io/ts-object-schema)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue)](https://www.typescriptlang.org/) 

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

const lengthValidator: (data: ITest) => boolean = (data) => data.testArr.length === 3;

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
  type: 'array',
  customValidator: lengthValidator,
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