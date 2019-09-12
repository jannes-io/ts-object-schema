import isValidData, { Schema } from '../';
import { expect } from 'chai';

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
  type: 'array',
}, {
  key: 'testOptional',
  type: 'number',
  optional: true,
}];

describe('ts-shallow-object-schema', () => {
  it('validates data', () => {
    expect(isValidData(testSchema, testData)).to.equal(true);
  });
  it('invalidates data', () => {
    const brokenData = {
      ...testData,
      testObj: undefined
    };
    expect(isValidData(testSchema, brokenData)).to.equal(false);
  });
  it('runs successful custom validators', () => {
    const customValidator: (data: ITest) => boolean = (data) => data.testArr.length === 3;
    const schemaWithValidator: Schema<ITest> = [{
      key: 'testArr',
      type: 'array',
      customValidator
    }];
    expect(isValidData(schemaWithValidator, testData)).to.equal(true);
  });
  it('runs invalid custom validators', () => {
    const customValidator: (data: ITest) => boolean = (data) => data.testArr.length === 2;
    const schemaWithValidator: Schema<ITest> = [{
      key: 'testArr',
      type: 'array',
      customValidator
    }];
    expect(isValidData(schemaWithValidator, testData)).to.equal(false);
  });
});
