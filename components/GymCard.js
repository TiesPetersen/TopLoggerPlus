'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import Button from './Button'
import { useLocal } from '@/context/localContext'

export default function GymCard() {
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState('')
    const [gymList, setGymList] = useState([])
    const [filteredGymList, setFilteredGymList] = useState([])

    const { gym, setGym} = useLocal()

    // get gyms
    useEffect(() => {
        async function getGyms() {
            const response = await fetch('/api/toploggerhandler', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({func: 'allGyms'})})
            
            if (response.ok) {
                const allGyms = await response.json()
                setGymList(allGyms[0].data.gyms)
                setLoading(false)
            }
        }

        getGyms()
    }, [])

    // filter gyms on input
    useEffect(() => {
        if (text && !loading) {
            var gymListCopy = gymList
            setFilteredGymList(gymListCopy.filter((gym) => gym.climbTypeDefault == 'boulder' && gym.name.toLowerCase().indexOf(text.toLowerCase()) != -1))
        } else {
            setFilteredGymList([])
        }
    }, [text])

    function selectGym(id) {
        setGym(id)
        setText('')
    }

    return (
        <Card>
            <div className='text-center mb-3 text-lg font-bold'>
                Select your gym
            </div>
            {!loading ? 
            <div>
                {gym ? 
                <div className='mb-3'>
                    Current gym: <b>{gymList.find((gymObj) => gymObj.id == gym)?.name}</b>
                </div> : ''}
                <div>
                    <input type='text' className='w-full rounded p-1 text-zinc-900' placeholder='Type here...' value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                <div className='mt-4'>
                    {filteredGymList.length > 0 ? 
                    <div className='flex flex-col gap-3'>
                        {filteredGymList.map((gym) => 
                        (<div className='p-4 bg-zinc-800 rounded-lg border border-zinc-700 border-4' key={gym.id}>
                                <div className='flex justify-between'>
                                    <div>
                                        {gym.name}
                                    </div>
                                    <div>
                                        <Button text='Select' href='/' onClick={() => selectGym(gym.id)}/>
                                    </div>
                                </div>
                        </div>)
                        )}
                    </div> :
                    <div className='text-zinc-300'>
                        Start typing to see gyms...
                    </div>
                    }   
                </div>
            </div> :
            <div className='text-center text-zinc-300'>
                Loading...
            </div>
        }
        </Card>
  )
}
