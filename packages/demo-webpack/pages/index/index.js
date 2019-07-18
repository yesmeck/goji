import React, { useState } from 'react'
import { render, unstable_setBridgreType } from 'fard'
import './index.styl'

unstable_setBridgreType('template')

function Counter () {
  const [count, setCount] = useState(0)
  return (
    <view>
      <view className='text'>{count}</view>
      <button className='btn' onTap={() => setCount(count + 1)}>
        +
      </button>
      <button className='btn' onTap={() => setCount(count - 1)}>
        -
      </button>
    </view>
  )
}

render(Counter)
