'use client'

import Link from 'next/link'
import React from 'react'
import Button from './Button'
import Card from './Card'
import { useLocal } from '@/context/localContext'
import { useToplogger } from '@/context/toploggerContext'

export default function Tools() {
    const { gymId, gymIdStatus } = useLocal()
    const { gymList, gymListStatus } = useToplogger()

    if (gymIdStatus !== 'success' || gymId === null || gymListStatus !== 'success') {
        return null;
    }

    return (
        <Card>
            <div className='text-center mb-3 text-xl font-bold'>
                Select Your Tool
            </div>
            <div className='flex flex-col gap-5 justify-center text-center'>
                <div>
                    <div className='text-left'>General</div>
                    <hr className='mb-2 border-zinc-400'/>
                    <Button href='/random-boulder-generator' text='Random Boulder Generator' />
                </div>
                <div>
                    <div className='text-left'>Random Boulder Comp</div>
                    <hr className='mb-2 border-zinc-400'/>
                    <div className='flex flex-col gap-2'>
                        <Button href='/comp-mode' text='Comp Mode'/>
                        <Button href='/blitz-comp' text='Blitz Comp'/>
                    </div>
                </div>
            </div>
        </Card>      
    )
}
