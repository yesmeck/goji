# Goji

🚧 Work in Progress 🚧

React ❤️ Mini Program

## Visions

Write React code, run as Mini Program.

## Usage

```js
import React, { useState } from 'react'
import { View, Text, Button, render } from 'fard' // will rename later
import './index.styl'

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <View>
      <Text>{count}</Text>
      <Button onClick={() => setCount(count + 1)}>+</Button>
    </View>
  )
}

render(App)
```

For more details see [packages/demo-webpack](./packages/demo-webpack).

## Architecture

![image](https://user-images.githubusercontent.com/1812118/62456261-9f830d00-b7aa-11e9-9d8d-8558bf890620.png)


Goji is inspired from [fard](https://github.com/132yse/fard) and [remax](https://github.com/remaxjs/remax).

This picture show the architecture of fard.

![](https://ae01.alicdn.com/kf/HTB1hkZ2Xlv0gK0jSZKbq6zK2FXax.jpg)

And here is an article about fard: [fard：fre 转小程序的新思路](https://zhuanlan.zhihu.com/p/70363354)

## How to contribute

Since `fard` use monorepo managed by [lerna](https://github.com/lerna/lerna) you should install `lerna` at first.

```bash
npm i -g lerna
```

Then install all dependencies:

```bash
lerna bootstrap
```

> For more details of how to use Lerna see [the official documents](https://lerna.js.org/).

For example run these commands if you'd like to run fard-demo with Webpack:

```bash
cd packages/demo-webpack
yarn build
```
