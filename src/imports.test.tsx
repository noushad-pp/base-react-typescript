// This file ensures that no 2 features are dependant with each other by checking for imports from other features

import { readFileSync } from 'fs';
import path from 'path';
import * as ts from 'typescript';
import { findFiles, getAppRelativePath } from './utils/testHelper';

const featureFileRegexp = /\/src\/features\//;

const allFiles = [...findFiles(/\.(ts|tsx)$/)];
const featureFiles = allFiles.filter((filePath) => featureFileRegexp.test(filePath));
const otherFiles = allFiles.filter((filePath) => !featureFileRegexp.test(filePath));

featureFiles.forEach((filePath) => {
  const dirname = path.dirname(filePath);
  const currentFeatureName = getFeatureName(filePath);
  describe(`File ${getAppRelativePath(filePath)}`, () => {
    it('has no imports from other features', () => {
      findFileImports(filePath).forEach((importString) => {
        const importPath = path.normalize(path.join(dirname, importString));
        const importFeature = getFeatureName(importPath);
        if (importFeature !== null) {
          // It's an import from feature
          expect(importFeature).toBe(currentFeatureName);
        }
      });
    });
  });
});

otherFiles.forEach((filePath) => {
  const dirname = path.dirname(filePath);
  describe(`File ${getAppRelativePath(filePath)}`, () => {
    it('has no imports from feature inside files', () => {
      findFileImports(filePath).forEach((importString) => {
        const importPath = path.normalize(path.join(dirname, importString));
        const relativePath = getAppRelativePath(importPath);

        if (/\/features\/[a-z0-9]*\/types/i.test(relativePath)) {
          // Types cannot be reexported so let's allow it
          return;
        }

        expect(relativePath).not.toMatch(/\/features\/[a-z0-9]*\/.*/i);
      });
    });
  });
});

function getFeatureName(filePath: string): string | null {
  const result = /\/src\/features\/([a-z0-9]*)/i.exec(filePath);
  return result && result[1];
}

function findFileImports(filePath: string): string[] {
  return findImportsSync(filePath).filter((importString) => importString[0] === '.');
}

function findImportsSync(file: string): string[] {
  const content = readFileSync(file, { encoding: 'utf-8' });
  const srcFile = ts.createSourceFile(file, content, ts.ScriptTarget.ESNext);

  const imports: string[] = [];
  const walk = (node: ts.Node) => {
    if (ts.isImportDeclaration(node)) {
      // ES2015 import
      const moduleSpecifier = node.moduleSpecifier as ts.StringLiteral;
      imports.push(moduleSpecifier.text);
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      // Dynamic import()
      const moduleSpecifier = node.arguments[0];
      if (ts.isStringLiteral(moduleSpecifier)) {
        imports.push(moduleSpecifier.text);
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(srcFile as ts.Node);
  return imports;
}
