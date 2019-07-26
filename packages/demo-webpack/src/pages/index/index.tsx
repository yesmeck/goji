import React, { useState } from 'react'
import { render, unstable_setBridgreType } from 'fard'
import './index.styl'

unstable_setBridgreType('template')

function Counter () {
  const [count, setCount] = useState(0)
  return (
    <view>
      <view className='text'>{count}</view>
      {/*
      // @ts-ignore */}
      <button className='btn' onTap={() => setCount(count + 1)}>
        +
      </button>
      {/*
      // @ts-ignore */}
      <button className='btn' onTap={() => setCount(count - 1)}>
        -
      </button>
    </view>
  )
}

render(Counter)
