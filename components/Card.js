import React from 'react'

export default function Card({children}) {
  return (
    <div className='m-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700 border-4'>
        {children}
    </div>
  )
}
