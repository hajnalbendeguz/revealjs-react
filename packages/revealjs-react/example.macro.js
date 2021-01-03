const { createMacro } = require('babel-plugin-macros');
const generate = require('@babel/generator').default;
const prettier = require('prettier');

const packageName = '@gregcello/revealjs-react';

function getExampleSource(example) {
  const { code } = generate(example, {});
  return prettier.format(code);
}

function addNeededImports(state, babel) {
  const t = babel.types;
  const importsToAdd = ['Example'];

  // check if there is an existing react-i18next import
  const existingImport = state.file.path.node.body.find(
    (importNode) =>
      t.isImportDeclaration(importNode) &&
      importNode.source.value === packageName,
  );

  // append Trans to existing or add a new react-i18next import for the Trans
  if (existingImport) {
    importsToAdd.forEach((name) => {
      if (
        existingImport.specifiers.findIndex(
          (specifier) => specifier.imported && specifier.imported.name === name,
        ) === -1
      ) {
        existingImport.specifiers.push(
          t.importSpecifier(t.identifier(name), t.identifier(name)),
        );
      }
    });
  } else {
    state.file.path.node.body.unshift(
      t.importDeclaration(
        importsToAdd.map((name) =>
          t.importSpecifier(t.identifier(name), t.identifier(name)),
        ),
        t.stringLiteral(packageName),
      ),
    );
  }
}

function ExampleTransform({ references, state, babel }) {
  const t = babel.types;
  const { Example } = references;
  // assert we have the @gregcello/revealjs-react Example component imported
  addNeededImports(state, babel);

  Example.forEach((referencePath) => {
    if (referencePath.parentPath.type === 'JSXOpeningElement') {
      const p = referencePath.parentPath;
      const source = t.jsxAttribute(
        'source',
        getExampleSource(referencePath.children),
      );
      const newNode = t.jsxOpeningElement(
        'Example',
        [...p.attributes, source],
        false,
      );
      referencePath.parentPath.replaceWith(newNode);
    }
  });
}

module.exports = createMacro(ExampleTransform);
