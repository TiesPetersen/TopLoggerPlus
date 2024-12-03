'use client'

import Button from '@/components/Button'
import OptionDropDown from '@/components/OptionDropDown'
import ToolTemplate from '@/components/ToolTemplate'
import React, { Suspense, useState } from 'react'

export default function RandomBoulderGeneratorPage() {
    const [randomBoulder, setRandomBoulder] = useState(null)
    

    var colors = ['red', 'green', 'yellow']

    function generateRandomBoulder() {
        setRandomBoulder('i')
    }

    return (
        <ToolTemplate title='Random Boulder Generator'>
            <div className='text-center mb-3 text-xl font-bold'>
                Options
            </div>
            <div className='mb-3 flex flex-col gap-3'>
                <OptionDropDown title='Colors'>
                    <div className='flex flex-col gap-2 mt-3 ms-1'>
                        {colors.map((color) => (
                            <div className='flex gap-3' key={color}>
                                <input className='h-6 w-6 border-2 border-zinc-100 appearance-none rounded hover:bg-zinc-600 checked:hover:bg-zinc-100 checked:bg-zinc-100' type='checkbox' id='red' name='red' value='red'/>
                                <div>{color}</div>
                            </div>
                        ))}
                    </div>
                </OptionDropDown>
                <OptionDropDown title='Groups'>
                    Some group options
                </OptionDropDown>
                <OptionDropDown title='Grades'>
                    Some grades options
                </OptionDropDown>
                <OptionDropDown title='Walls'>
                    Some walls options
                </OptionDropDown>
            </div>
            <Button href='#' text='Generate random boulder' onClick={generateRandomBoulder} />
            <div>
                {randomBoulder ? 
                <div className='mt-4'>
                    Some random boulder
                </div> : ''}
            </div>
        </ToolTemplate>
    )
}
