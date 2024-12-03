import React from 'react'

export default function Checkbox({text, checked, onChange, color}) {
  return (
    <div className='flex gap-3' key={color.id}>
    <input onChange={onChange} checked={checked} className='h-6 w-6 border-2 border-zinc-100 appearance-none rounded hover:bg-zinc-600 checked:hover:bg-zinc-100 checked:bg-zinc-100' type='checkbox' id={color.id} name={color.id}/>
    <label htmlFor={color.id}>{color.nameLoc}</label>
</div>
  )
}
