import React, { useState } from 'react'
import { render, unstable_setBridgreType, View, Button } from 'fard'
import './index.styl'

unstable_setBridgreType('template')

function Counter () {
  const [count, setCount] = useState(0)
  return (
    <View>
      <View className='text'>{count}</View>
      {/*
      // @ts-ignore */}
      <Button className='btn' onTap={() => setCount(count + 1)}>
        +
      </Button>
      {/*
      // @ts-ignore */}
      <Button className='btn' onTap={() => setCount(count - 1)}>
        -
      </Button>
    </View>
  )
}

render(Counter)
