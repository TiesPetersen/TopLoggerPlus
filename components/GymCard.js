'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import Button from './Button'
import { useLocal } from '@/context/localContext'
import { useToplogger } from '@/context/toploggerContext'

export default function GymCard() {
    const [text, setText] = useState('')
    const [filteredGymList, setFilteredGymList] = useState([])

    const { gymId, setGymId, gymIdStatus} = useLocal()
    const { gymList, gymListStatus} = useToplogger()

    // FILTER GYMS ON INPUT FIELD CHANGE
    useEffect(() => {
        if (text !== '' && gymListStatus == 'success') {
            var gymListCopy = gymList
            setFilteredGymList(gymListCopy.filter((gym) => gym.climbTypeDefault == 'boulder' && gym.name.toLowerCase().indexOf(text.toLowerCase()) != -1))
        } else {
            setFilteredGymList([])
        }
    }, [text])

    function selectGym(id) {
        setGymId(id)
        setText('')
    }

    return (
        <Card>
            <div className='text-center mb-3 text-xl font-bold'>
                Select Your Gym
            </div>
            { (gymListStatus === 'loading' || gymIdStatus === 'loading') && 'Retrieving gyms from TopLogger...'}
            { gymListStatus === 'failed' && 'Failed to retrieve gyms from TopLogger. Please try again later.'}
            { gymListStatus === 'success' && gymIdStatus === 'success' &&
            <div>
                <div className=''>
                    <div className='mb-3'>Selected gym: <b>{gymList.find((gymObj) => gymObj.id == gymId)?.name}</b></div>
                </div>
                <div>
                    <div>
                        <input type='text' className='w-full bg-zinc-700 rounded p-2 placeholder:text-zinc-300' placeholder='Search for your gym...' value={text} onChange={(e)=>setText(e.target.value)}/>
                    </div>
                    {filteredGymList.length > 0 ? 
                    <div className='flex flex-col gap-3 mt-4'>
                        {filteredGymList.map((gym) => 
                        (<div className='p-4 bg-zinc-800 rounded-lg border border-zinc-700 border-4' key={gym.id}>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        {gym.name}
                                    </div>
                                    <div>
                                        <Button text='Select' onClick={() => selectGym(gym.id)}/>
                                    </div>
                                </div>
                        </div>)
                        )}
                    </div> : ''}   
                </div> 
            </div>}
        </Card>
  )
}
