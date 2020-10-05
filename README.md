# Dev mode
All assets are served from morphogen-1, via a webserver on port 3003 (see config.ts)

## Install requirements
```bash
$ npm install
$ npm tailwind:dev
```

## Running
```bash
$ npm run dev
```

Open up [localhost:3000](http://localhost:3000)

# Preparing for serving
Still needs a few more steps, but roughly:

```bash
$ npm tailwind:prod
$ npm run export
```
