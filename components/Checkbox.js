import React from 'react'

export default function Checkbox({text, checked, onChange, objId}) {
  return (
    <div className='flex gap-3'>
      <input onChange={onChange} checked={checked} className='h-6 w-6 border-2 border-zinc-100 appearance-none rounded hover:bg-zinc-600 checked:hover:bg-zinc-100 checked:bg-zinc-100' type='checkbox' name={objId} id={objId}/>
      <label htmlFor={objId}>{text}</label>
  </div>
  )
}
