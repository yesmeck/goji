import React, { useState } from 'react'
import { render, unstable_setBridgreType } from 'fard'
import './index.styl'

unstable_setBridgreType('template')

const ArrayDOM = ({ count }) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(<view className="cell" key={i}></view>)
  }
  return <view className="wrap">{result}</view>
}

function Counter () {
  const [count, setCount] = useState(2)
  const [showArrayDOM, setShowArrayDOM] = useState(false)
  const [showText, setShowText] = useState(false)

  return (
    <view>
      {[1000, 2000, 4000, 8000].map(c => (
        <button class='btn' onTap={() => setCount(c)} key={c}>
          {c}
        </button>
      ))}
      <button onTap={() => setShowArrayDOM(!showArrayDOM)}>Render array of DOM nodes</button>
      <button onTap={() => setShowText(!showText)}>Show text</button>
      {showArrayDOM && <ArrayDOM count={count} /> }
      {showText && <text>hello, world!</text>}
    </view>
  )
}

render(Counter)
