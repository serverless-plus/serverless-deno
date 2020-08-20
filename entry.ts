// Refer to tencent cloud document: https://cloud.tencent.com/document/product/583/47274
const SCF_RUNTIME_API: string | undefined = Deno.env.get('SCF_RUNTIME_API');
const SCF_RUNTIME_API_PORT: string | undefined = Deno.env.get(
  'SCF_RUNTIME_API_PORT',
);

const READY_URL = `http://${SCF_RUNTIME_API}:${SCF_RUNTIME_API_PORT}/runtime/init/ready`;
const EVENT_URL = `http://${SCF_RUNTIME_API}:${SCF_RUNTIME_API_PORT}/runtime/invocation/next`;
const RESPONSE_URL = `http://${SCF_RUNTIME_API}:${SCF_RUNTIME_API_PORT}/runtime/invocation/response`;
const ERROR_URL = `http://${SCF_RUNTIME_API}:${SCF_RUNTIME_API_PORT}/runtime/invocation/error`;

import { app } from './src/main.jsx';

const PORT = 9000;

async function post(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data),
  });
  return response.text();
}

async function forwardEventToRequest(event: any) {
  // event to get request
  console.log(
    '++++++++ Req Url +++++++',
    `http://localhost:${PORT}/${event.path}`,
  );

  // TODO: it just a demo for index path, we should transfer for all paths.
  const response = await fetch(`http://localhost:${PORT}/${event.path}`, {
    method: 'GET',
  });
  const body = await response.text();

  const apigwReturn = {
    statusCode: 200,
    body: body,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
    isBase64Encoded: false,
  };

  return apigwReturn;
}

async function run() {
  // 2. loop for event
  // get event
  const eventObj: any = await fetch(EVENT_URL);
  const event = await eventObj.json();
  await app.start({ port: PORT });

  const apigwReturn = await forwardEventToRequest(event);
  await app.close();

  if (!event) {
    const error = await post(ERROR_URL, { msg: 'error handling event' });
    console.log(`Error response: ${error}`);
  } else {
    console.log(`Send Invoke Response: ${event}`);
    await post(RESPONSE_URL, apigwReturn);
  }
}
// 1. post ready -- finish initialization
post(READY_URL, { msg: 'deno ready' }).then(() => {
  console.log(`Initialize finish`);
  run();
});
