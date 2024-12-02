'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import GymCard from './GymCard'
import { useLocal } from '@/context/localContext'
import { redirect } from 'next/navigation'
import Button from './Button'

export default function ToolTemplate({children, title}) {
    const [loadingGyms, setLoadingGyms] = useState(true)
    const [loadingBoulders, setLoadingBoulders] = useState(true)
    const [gymList, setGymList] = useState([])
    const [boulderList, setBoulderList] = useState([])

    const { gym, setGym} = useLocal()

    // get gyms (and boulders)
    useEffect(() => {
        async function getGyms() {
            const response = await fetch('/api/toploggerhandler', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({func: 'allGyms'})})
            
            if (response.ok) {
                const allGyms = await response.json()
                setGymList(allGyms[0].data.gyms)
                setLoadingGyms(false)
            }
        }

        async function getBoulders() {
            const response = await fetch('/api/toploggerhandler', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({func: 'boulders', gymId: gym})})
            
            if (response.ok) {
                const boulders = await response.json()
                console.log(boulders)
                setBoulderList(boulders)
                setLoadingBoulders(false)
            }
        }

        getGyms()
        getBoulders()
    }, [])

    if (!gym && !loadingGyms) {
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
                
                {loadingGyms ? 'Retrieving gyms from TopLogger...' : 
                <div className='flex flex-col gap-3'>
                    <div>Selected gym:  <b>{gymList.find((gymObj) => gymObj.id == gym)?.name}</b></div>
                    <Button href='/' text='Change'/>
                </div>}
            </Card>
            {!loadingGyms && gym ? 
            <Card>
                {loadingBoulders ? 'Retrieving boulders from TopLogger...' :
                children}
            </Card>
            : ''}
        </div>
    )
}
