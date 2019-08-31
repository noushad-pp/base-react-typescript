import fs from 'fs';
import path from 'path';
import React from 'react';
import { ComponentExample } from './ComponentExample';

const EXAMPLE_REGEXP = /\.example\.tsx$/;
const EXAMPLE_PATH = './src';

export function* findFiles(regexp: RegExp, currentPath: string = EXAMPLE_PATH): any {
  const realPath = path.resolve(currentPath);

  if (!fs.existsSync(realPath)) {
    return;
  }

  const files = fs.readdirSync(realPath);
  for (const name of files) {
    const fileName = path.join(realPath, name);
    const stat = fs.lstatSync(fileName);
    if (stat.isDirectory()) {
      yield* findFiles(regexp, fileName);
    }
    if (regexp.test(fileName)) {
      yield fileName;
    }
  }
}

export function* findExamples(currentPath: string = EXAMPLE_PATH): any {
  yield* findFiles(EXAMPLE_REGEXP, currentPath);
}

export function getAppRelativePath(filePath: string): string {
  return path.relative(process.cwd(), filePath);
}

type Components = {
  [s: string]: React.FunctionComponent | ComponentExample[];
};
type SupportedComponents = {
  [s: string]: React.FunctionComponent;
};

export const resolveComponents = (components: Components): SupportedComponents => {
  return Object.entries(components).reduce((carry: SupportedComponents, [name, value]): SupportedComponents => {
    if (value instanceof Function) {
      carry[name] = value;
    } else {
      value.forEach((example: unknown) => {
        if (!(example instanceof ComponentExample)) {
          throw new Error(`Only examples with instance of ComponentExample are allowed now.`);
        }
      });

      value.forEach((example: ComponentExample) => {
        if (carry[example.name]) {
          throw new Error(`Please use different names for your examples. Duplicated name: "${example.name}".`);
        }
        carry[example.name] = () => example.code;
      });
    }

    return carry;
  }, {});
};
