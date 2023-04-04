# yjs-bundle #

bundles several yjs packages in a single module in order to avoid "[Yjs was already imported](https://github.com/yjs/yjs/issues/438)" problems

## Background ##

When using [Yjs](https://github.com/yjs/yjs) in a browser (or another no-build environment, typical import statements such as

```
import * as Y                from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { YKeyValue }         from 'y-utility/y-keyvalue'
```

may lead to a completely unpredictable behaviour of Yjs.

A brief look into the browser console will reveal one or multiple error messages starting with

```
```
