# Serverless Deno

[Demo](https://service-gcgex6z2-1251556596.gz.apigw.tencentcs.com)

Serverless Deno Application on Tencent SCF using Custom Runtime.

## Development

Using [denon](https://github.com/denosaurs/denon) start project for automatically restart:

> Notice: Please install denon firstly.

```bash
$ npm run dev
```

## Deployment

1. Deploy deno bin file to layer:

```bash
$ npm run deploy:layer
```

> Notice: After deploy layer, we do not need deploy it next time.

2. Deploy to cloud:

> Notice: You should install [serverless cli](https://github.com/serverless/serverless) firstly.

```bash
$ npm run deploy
```

## License

MIT
