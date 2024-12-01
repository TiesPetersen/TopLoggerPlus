'use client'

import Link from 'next/link'
import React from 'react'
import Button from './Button'
import Card from './Card'
import { useLocal } from '@/context/localContext'

export default function Tools() {
    const {gym} = useLocal()

    if (!gym) {
        return null;
    }

    function extendURL(url) {
        return url + '?gym=' + gym
    }

    return (
        <Card>
            <div className='text-center mb-3 text-lg font-bold'>
                2. Select Your Tool
            </div>
            <div className='flex flex-col gap-5 justify-center text-center'>
                <div>
                    <div className='text-left'>General</div>
                    <hr className='mb-2 border-zinc-400'/>
                    <Button href={extendURL('/random-boulder-generator')} text='Random Boulder Generator' />
                </div>
                <div>
                    <div className='text-left'>Random Boulder Comp</div>
                    <hr className='mb-2 border-zinc-400'/>
                    <div className='flex flex-col gap-2'>
                        <Button href={extendURL('/comp-mode')} text='Comp Mode' disabled/>
                        <Button href={extendURL('/blitz-comp')} text='Blitz Comp' disabled/>
                    </div>
                </div>
            </div>
        </Card>      
    )
}
