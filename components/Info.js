import React from 'react'
import Card from './Card'

export default function Info() {
  return (
    <Card>
        <div className='text-center mb-3 text-lg font-bold'>
            Welcome!
        </div>
        <div className='text-gray-200'>
          TopLoggerPlus enhances the TopLogger app with extra features, useful tools, and games!
        </div>
    </Card>
  )
}
