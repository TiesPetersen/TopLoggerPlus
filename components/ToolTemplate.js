'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import GymCard from './GymCard'
import { useLocal } from '@/context/localContext'
import { redirect } from 'next/navigation'
import Button from './Button'
import { useToplogger } from '@/context/toploggerContext'

export default function ToolTemplate({children, title}) {
    const { gymId, gymIdStatus } = useLocal()
    const { gymList, gymListStatus, boulderListStatus } = useToplogger()


    // IF NO GYM SELECTED, REDIRECT TO HOME
    if (gymIdStatus == 'success' && gymId === null) {
        redirect('/')
    }

    // IF GYMID IS LOADED IT IS ALSO SET
    return (
        <div>
            <Card>
                <div className='text-center text-xl font-bold'>
                    {title}
                </div>
            </Card>
            <Card>
                { (gymListStatus === 'loading' || gymIdStatus === 'loading') && 'Retrieving gyms from TopLogger...'}
                { gymListStatus === 'failed' && 'Failed to retrieve gyms from TopLogger. Please try again later.'}
                { gymIdStatus === 'success' && gymListStatus === 'success' && 
                <div className='flex flex-col gap-3'>
                    <div>Selected gym:  <b>{gymList.find((gymObj) => gymObj.id == gymId)?.name}</b></div>
                    <Button href='/' text='Change' outline/>
                </div>}
            </Card>
            {gymListStatus === 'success' ? 
            <div>
                { boulderListStatus === 'loading' &&  <Card>Retrieving boulders from TopLogger...</Card>}
                { boulderListStatus === 'failed' && <Card>Failed to retrieve boulders from TopLogger. Please try again later.</Card>}
                { boulderListStatus === 'success' && children}
            </div> : ''}
        </div>
    )
}
