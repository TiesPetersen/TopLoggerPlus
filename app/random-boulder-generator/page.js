'use client'

import Button from '@/components/Button'
import OptionDropDown from '@/components/OptionDropDown'
import ToolTemplate from '@/components/ToolTemplate'
import React, { Suspense, useState } from 'react'

export default function RandomBoulderGeneratorPage() {
    const [randomBoulder, setRandomBoulder] = useState(null)

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
                    Some color options
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
