# yjs-bundle #

bundles several yjs packages in a single module in order to avoid "[Yjs was already imported](https://github.com/yjs/yjs/issues/438)" problems

## Background ##

When using [Yjs](https://github.com/yjs/yjs) in a browser (or another no-build environment, typical import statements such as

```
import * as Y                from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { YKeyValue }         from 'y-utility/y-keyvalue'
```

may lead to a **completely unpredictable behaviour of Yjs**.

A brief look into the browser console will reveal one or multiple error messages starting with `Yjs was already imported. This breaks constructor checks and will lead to issues!`

As written by [dmonad](https://github.com/dmonad): this message has to be taken seriously - **Yjs will not work as expected**!

But how does it then become possible to use Yjs within a browser without having to use a build environment (which will collect all required imports and build a large package including every import only once - together with other advantages)?

One possibility is to just bundle Yjs and all packages that depend on it into one module which may then be safely imported into a script - such an approach is by no means elegant but makes Yjs usable even within no-build environments.

This is what this repo wants to provide.

It currently bundles

* Yjs
* y-indexeddb
* y-websocket
* y-webrtc and
* y-keyvalue

into a single monolith.

## Usage ##

As a consequence, import statements like those shown above will either have to be rewritten as

```
import * as Y                from 'https://rozek.github.io/yjs-bundle/dist/yjs-bundle.esm.js'
import { WebsocketProvider } from 'https://rozek.github.io/yjs-bundle/dist/yjs-bundle.esm.js'
import { YKeyValue }         from 'https://rozek.github.io/yjs-bundle/dist/yjs-bundle.esm.js'
```

or - and that's the **recommended approach** - you will have to provide an importmap with the following contents:

```
<script type="importmap">
{
  "imports": {
    "yjs":          "https://rozek.github.io/yjs-bundle/dist/yjs-bundle.esm.js",
    "y-indexeddb":  "https://rozek.github.io/yjs-bundle/dist/yjs-bundle.esm.js",
    "y-websocket":  "https://rozek.github.io/yjs-bundle/dist/yjs-bundle.esm.js",
    "y-webrtc":     "https://rozek.github.io/yjs-bundle/dist/yjs-bundle.esm.js",
    "y-utility/y-keyvalue":"https://rozek.github.io/yjs-bundle/dist/yjs-bundle.esm.js"
  }
}
</script>
```

and use the same import statements as shown in the docs.

The **potential disadvantage of importmaps**, however, is that you - or your customers - will need a reasonably modern browser. Definitely supported browsers include:

* Chrome ≥ 89
* MS Edge ≥ 89
* Safari ≥ 16.4
* Firefox ≥ 108
* Opera ≥ 76
<br>&nbsp;<br>
* Chrome for Android ≥ 111
* Safari on iOS ≥ 16.4

(see "[Can I use](https://caniuse.com/import-maps)" for additional details, especially if your browser is not listed above)
 
## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/yjs-bundle/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
