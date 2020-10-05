# Dev mode
All assets are served from morphogen-1, via a webserver on port 3003 (see config.ts)

## Install requirements
```bash
$ npm install
$ npm run tailwind:dev
```

## Running
```bash
$ npm run dev
```

## Data serving
I'm running this off the directory I save the runs for.
There's an instance running in the background on morphogen
```bash
$ cd /home/tal/dev/abstract-portraits/results
$ http-server -p 3003 --cors -a
```

# Preparing for "prod" (github pages etc)
See https://sapper.svelte.dev/docs#Exporting

Still needs a few more steps, but roughly:

```bash
$ npm tailwind:prod
$ npm run export
```
