import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { findExamples, resolveComponents } from './utils/testHelper';

const examples = [...findExamples()];

examples.forEach((file) => {
  const fileName = path.basename(file);
  describe(`Examples ${fileName}`, () => {
    it('renders without errors', async () => {
      const components = await import(file);
      Object.entries(resolveComponents(components)).map(([name, Component]) => {
        const div = document.createElement('div');
        ReactDOM.render(<Component />, div);
        ReactDOM.unmountComponentAtNode(div);

        expect(ReactDOMServer.renderToString(<Component />)).toMatchSnapshot(name);
      });
    });
  });
});
