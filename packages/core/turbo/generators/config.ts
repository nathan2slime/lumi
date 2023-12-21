import type { PlopTypes } from '@turbo/gen';

const generator = (plop: PlopTypes.NodePlopAPI) => {
  const path = 'src/components/{{name}}';

  plop.setGenerator('add-component', {
    description: 'Adds a new react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: path + '/index.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: path + '/model.ts',
        templateFile: 'templates/model.hbs',
      },
      {
        type: 'add',
        path: path + '/styles.ts',
        templateFile: 'templates/styles.hbs',
      },
      {
        type: 'append',
        path: 'index.ts',
        pattern: /(?<insertion>\/\/ UI Exports)/g,
        templateFile: 'templates/export.hbs',
      },
    ],
  });
};

export default generator;
