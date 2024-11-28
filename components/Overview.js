import Link from 'next/link'
import React from 'react'
import Button from './Button'

export default function Overview() {
  return (
    <div className='m-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700 border-4'>
        <div className='text-center mb-3 text-lg font-bold'>
            All Tools
        </div>
        <div className='flex flex-col gap-3 justify-center text-center'>
            <Button href='/test' text='Go to test' />
            <Button href='/asdf' text='Go to asdff' />
        </div>
    </div>
  )
}
