import { Application } from 'https://deno.land/x/abc@v1.0.3/mod.ts';
import React from 'https://dev.jspm.io/react';
import ReactDOMServer from 'https://dev.jspm.io/react-dom/server';

const app = new Application();

app.use((next) => (c) => {
  let e = next(c);
  if (React.isValidElement(e)) {
    e = ReactDOMServer.renderToString(e);
  }

  return e;
});

app.get('/', () => {
  return (
    <h1 style={{ textAlign: 'center', width: '600px', margin: '300px auto' }}>
      Welcome to Serverless Deno Application created by
      <br />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ listStyle: 'none' }}>
          <a href='https://serverlesscloud.cn/'>Serverless Framework</a>
        </li>
        <li>
          <a href='https://github.com/zhmushan/abc'>abc - Deno Web Framework</a>
        </li>
      </ul>
    </h1>
  );
});

export { app };
