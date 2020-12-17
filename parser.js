const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, './origin/0.bs-editor.f270638c2023ffb55cebfb84fb4f17cedc5ea827.js'), {
  encoding: 'utf-8'
}).toString();

const ast = parser.parse(code);

const filesMap = {};

traverse(ast, {
  ArrayExpression(arrayPath) {
    // Module
    arrayPath.traverse({
      FunctionExpression(modulePath) {
        const moduleParams = modulePath.node.params;
        if (moduleParams.length === 3
          && moduleParams[0].name == 't'
          && moduleParams[1].name == 'e'
          && moduleParams[2].name == 'i') {

          modulePath.scope.rename('e', 'exports');
          modulePath.scope.rename('i', 'imports');

          modulePath.traverse({
            UnaryExpression(unaryPath) {
              const unaryArg = unaryPath.node.argument;
              if (unaryPath.node.operator === '!' && types.isNumericLiteral(unaryArg)) {
                /**
                 * convert `!0` => `true`
                 * convert `!1` => `false`
                 */
                if (unaryArg.value == 0) {
                  unaryPath.replaceWith(types.booleanLiteral(true));
                } else if (unaryArg.value == 1) {
                  unaryPath.replaceWith(types.booleanLiteral(false));
                }
              } else if (unaryPath.node.operator === 'void' && types.isNumericLiteral(unaryArg) && unaryArg.value === 0) {
                // convert `void 0` => `undefined`
                unaryPath.replaceWith(types.identifier('undefined'));
              }
            },
            ExpressionStatement(expressionPath) {
              expressionPath.traverse({
                AssignmentExpression(assignPath) {
                  const assignNode = assignPath.node;
                  if (types.isAssignmentExpression(assignNode.right)) {
                    assignPath.skip();
                  }
                  if (assignNode.operator === '='
                    && types.isMemberExpression(assignNode.left)
                    && types.isIdentifier(assignNode.left.object)
                    && assignNode.left.object.name === 'exports') {
                    const exportName = assignNode.left.property.name;

                    if (exportName === 'default') {
                      /**
                       * remove `exports.default = void 0`
                       */
                      if (types.isUnaryExpression(assignNode.right)
                        && assignNode.right.operator === 'void'
                        && types.isNumericLiteral(assignNode.right.argument)
                        && assignNode.right.argument.value === 0) {
                        assignPath.remove();
                      } else if (types.isExpressionStatement(assignPath.parent)) {
                        // convert `exports.default = any;` => `export default any;`
                        assignPath.parentPath.replaceWith(types.exportDefaultDeclaration(assignNode.right));
                      }
                    } else {
                      expressionPath.insertBefore(types.exportNamedDeclaration(
                        types.variableDeclaration('const', [types.variableDeclarator(types.identifier(exportName), assignNode.right)])
                      ));
                      assignPath.remove();
                    }
                  }
                }
              });
            },
            VariableDeclaration(variablePath) {
              variablePath.traverse({
                AssignmentExpression(assignPath) {
                  const assignNode = assignPath.node;
                  if (types.isAssignmentExpression(assignNode.right)) {
                    assignPath.skip();
                  }
                  if (assignNode.operator === '='
                    && types.isMemberExpression(assignNode.left)
                    && types.isIdentifier(assignNode.left.object)
                    && assignNode.left.object.name === 'exports') {
                    const exportName = assignNode.left.property.name;

                    if (exportName !== 'default') {
                      variablePath.insertBefore(types.exportNamedDeclaration(
                        types.variableDeclaration('const', [types.variableDeclarator(types.identifier(exportName), assignNode.right)])
                      ));
                      assignPath.replaceWith(assignNode.right);
                    }
                  }
                }
              });
            },
            CallExpression(callPath) {
              const args = callPath.node.arguments;
              if (args.length === 3 && types.isStringLiteral(args[1]) && args[1].value === '__esModule') {
                callPath.remove();
              }
            }
          });

          const { body, directives } = modulePath.node.body;
          const { code } = generate(types.program(body, directives, 'module'));

          filesMap[modulePath.key] = code;
        }
        modulePath.skip();
      }
    });
  }
});

Object.keys(filesMap).forEach(key => {
  const filePath = path.join(__dirname + `/logs/${key}.js`);
  fs.writeFileSync(filePath, filesMap[key], { encoding: 'utf-8' });
});