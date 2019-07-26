import React, { useState, Fragment } from 'react'
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
    <Fragment>
      {[1000, 2000, 4000, 8000].map(c => (
        // @ts-ignore
        <button class='btn' onTap={() => setCount(c)} key={c}>
          {c}
        </button>
      ))}
      {/*
      // @ts-ignore */}
      <button
        onTap={() => setShowArrayDOM(!showArrayDOM)}
        style={{ fontWeight: "bold" }}
      >
        Render array of DOM nodes
      </button>
      {/*
      // @ts-ignore */}
      <button onTap={() => setShowText(!showText)}>Show text</button>
      {showArrayDOM && <ArrayDOM count={count} /> }
      {showText && <view>hello, world!</view>}
    </Fragment>
  )
}

render(Counter)
