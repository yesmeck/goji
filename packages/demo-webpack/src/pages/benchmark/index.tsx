import React, { useState, Fragment } from 'react'
import { render, unstable_setBridgreType, Button, View } from 'fard'
import './index.styl'

unstable_setBridgreType('template')

const ArrayDOM = ({ count }) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(<View className="cell" key={i}></View>)
  }
  return <View className="wrap">{result}</View>
}

function Counter () {
  const [count, setCount] = useState(2)
  const [showArrayDOM, setShowArrayDOM] = useState(false)
  const [showText, setShowText] = useState(false)

  return (
    <Fragment>
      {[1000, 2000, 4000, 8000].map(c => (
        <Button className='btn' onTap={() => setCount(c)} key={c}>
          {c}
        </Button>
      ))}
      <Button
        onTap={() => setShowArrayDOM(!showArrayDOM)}
        style={{ fontWeight: "bold" }}
      >
        Render array of DOM nodes
      </Button>
      <Button onTap={() => setShowText(!showText)}>Show text</Button>
      {showArrayDOM && <ArrayDOM count={count} /> }
      {showText && <View>hello, world!</View>}
    </Fragment>
  )
}

render(Counter)
