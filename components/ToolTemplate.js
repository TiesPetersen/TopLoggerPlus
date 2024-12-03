'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import GymCard from './GymCard'
import { useLocal } from '@/context/localContext'
import { redirect } from 'next/navigation'
import Button from './Button'
import { useToplogger } from '@/context/toploggerContext'

export default function ToolTemplate({children, title}) {
    const { gym, setGym} = useLocal()
    const { gymList, boulderList, gymLoading, boulderLoading} = useToplogger()


    if (!gym && !gymLoading) {
        redirect('/')
    }

    return (
        <div>
            <Card>
                <div className='text-center text-xl font-bold'>
                    {title}
                </div>
            </Card>
            <Card>
                
                {gymLoading ? 'Retrieving gyms from TopLogger...' : 
                <div className='flex flex-col gap-3'>
                    <div>Selected gym:  <b>{gymList.find((gymObj) => gymObj.id == gym)?.name}</b></div>
                    <Button href='/' text='Change'/>
                </div>}
            </Card>
            {!gymLoading && gym ? 
            <Card>
                {boulderLoading ? 'Retrieving boulders from TopLogger...' :
                children}
            </Card>
            : ''}
        </div>
    )
}
