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
    arrayPath.traverse({
      FunctionExpression(path) {
        if (path.node.params.length === 3
          && path.node.params[0].name == 't'
          && path.node.params[1].name == 'e'
          && path.node.params[2].name == 'i') {

          path.traverse({
            UnaryExpression(unaryPath) {
              if (unaryPath.node.operator === '!' && types.isNumericLiteral(unaryPath.node.argument)) {
                if (unaryPath.node.argument.value == 0) {
                  unaryPath.replaceWith(types.booleanLiteral(true));
                } else if (unaryPath.node.argument.value == 1) {
                  unaryPath.replaceWith(types.booleanLiteral(false));
                }
              } else if (unaryPath.node.operator === 'void' && types.isNumericLiteral(unaryPath.node.argument) && unaryPath.node.argument.value === 0) {
                unaryPath.replaceWith(types.identifier('undefined'));
              }
            }
          });

          const { code } = generate(path.node);

          filesMap[path.key] = code;
        }
        path.skip();
      }
    });
  }
});

Object.keys(filesMap).forEach(key => {
  const filePath = path.join(__dirname + `/logs/${key}.js`);
  fs.writeFileSync(filePath, filesMap[key], { encoding: 'utf-8' });
});