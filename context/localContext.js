'use client'

import React, {useContext, useState, useEffect} from 'react'

const localContext = React.createContext()

export function useLocal() {
    return useContext(localContext)
}

export function LocalProvider({children}) {
    const [ gymId, setGymId ] = useState(null)
    const [ gymIdStatus, setGymIdStatus ] = useState('loading')

    // GET STORED GYM ID ON LOAD
    useEffect(() => {
        console.log("Getting Stored Gym ID from Local Storage")

        const tempGymId = localStorage.getItem('gymId')
        if (tempGymId != null) {
            setGymId(tempGymId)
        }

        setGymIdStatus('success')
        
        console.log("Stored Gym ID: ", tempGymId)
    }, [])

    // STORE GYM ID IN LOCAL STORAGE ON CHANGE   
    useEffect(() => {
        console.log('GymID changed to', gymId)

        if (gymId != null) {
            console.log("Changing Gym ID in Local Storage")
            console.log('Setting Gym ID in Local Storage: ', gymId)
            localStorage.setItem('gymId', gymId)
        }
    }, [gymId])

    const value = {
        gymId,
        setGymId,
        gymIdStatus,
        setGymIdStatus
    }

    return (
        <localContext.Provider value={value}>
            {children}
        </localContext.Provider>
    )
}