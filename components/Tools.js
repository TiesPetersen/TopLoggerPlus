import Link from 'next/link'
import React from 'react'
import Button from './Button'
import Card from './Card'

export default function Tools() {
    return (
        <Card>
            <div className='text-center mb-3 text-lg font-bold'>
                All Tools
            </div>
            <div className='flex flex-col gap-5 justify-center text-center'>
                <div>
                    <div className='text-left text-zinc-300'>General</div>
                    <hr className='mb-2 border-zinc-400'/>
                    <Button href='/random-boulder-generator' text='Random Boulder Generator' />
                </div>
                <div>
                    <div className='text-left text-zinc-300'>Random Boulder Comp</div>
                    <hr className='mb-2 border-zinc-400'/>
                    <div className='flex flex-col gap-2'>
                        <Button href='/comp-mode' text='Comp Mode' disabled/>
                        <Button href='/blitz-comp' text='Blitz Comp' disabled/>
                    </div>
                </div>
            </div>
        </Card>      
    )
}
