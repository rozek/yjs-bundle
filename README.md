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

and use the same import statements as shown in the docs
