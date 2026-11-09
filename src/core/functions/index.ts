import { env } from '@local/core/envs';

export const publicAsset = (path: string): string => {
  const basePath = env.basePath.endsWith('/') ? env.basePath : `${env.basePath}/`;
  return `${basePath}${path.replace(/^\/+/, '')}`;
};

export const tableString = (
  value: unknown,
  options: {
    indent?: number;
    fallback?: string;
    sortKeys?: boolean;
  } = {},
): string => {
  const { indent = 2, fallback = '[Unserializable]', sortKeys = false } = options;

  const seen = new WeakSet<object>();

  const safeStringify = (input: unknown): string => {
    try {
      return (
        JSON.stringify(
          input,
          (_key, val: unknown) => {
            if (typeof val === 'bigint') {
              return val.toString();
            }

            if (typeof val === 'function') {
              return `[Function${val.name ? `: ${val.name}` : ''}]`;
            }

            if (typeof val === 'symbol') {
              return val.toString();
            }

            if (val instanceof Error) {
              return {
                name: val.name,
                message: val.message,
                stack: val.stack,
              };
            }

            if (val instanceof Date) {
              return val.toISOString();
            }

            if (typeof val === 'object' && val !== null) {
              if (seen.has(val)) {
                return '[Circular]';
              }

              seen.add(val);
            }

            return val;
          },
          indent,
        ) ?? String(input)
      );
    } catch {
      return fallback;
    }
  };

  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  if (typeof value !== 'object') {
    return safeStringify(value);
  }

  const entries = Object.entries(value);

  const normalizedEntries = sortKeys ? entries.sort(([a], [b]) => a.localeCompare(b)) : entries;

  return normalizedEntries.map(([key, val]) => `${key}: ${safeStringify(val)}`).join('\n');
};

type GenericObject<T> = {
  [key: string]: T;
};

export function transformObjectToArray<T>(obj: GenericObject<T>): Array<T> {
  return Object.entries(obj).map(([, value]) => ({
    ...value,
  }));
}
