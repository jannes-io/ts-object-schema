export interface IField<T> {
  key: string & keyof T;
  type: 'number' | 'string' | 'boolean' | 'object' | 'array';
  optional?: boolean;
}

export type Schema<T> = IField<T>[];

function isObj(data: unknown): data is object {
  return typeof data === 'object' && !!data;
}

function hasAllRequiredFields(requiredKeys: string[], data: object): boolean {
  return requiredKeys.filter(key => key in data).length === requiredKeys.length;
}

function simpleTypesCheck<T>(schema: Schema<T>, data: object): boolean {
  const assertedData = data as unknown as T;

  return schema.filter((field) => {
    if (field.optional && !(field.key in data)) {
      return true;
    }

    if (field.type === 'array') {
      return Array.isArray(assertedData[field.key]);
    }
    return typeof assertedData[field.key] === field.type;
  }).length === schema.length;
}

export default function isValidData<T>(schema: Schema<T>, data: unknown): data is T {
  if (!isObj(data)) {
    return false;
  }

  const requiredKeys = schema.filter(({ optional }) => !optional).map(({ key }) => key);
  return hasAllRequiredFields(requiredKeys, data) && simpleTypesCheck(schema, data);
}
