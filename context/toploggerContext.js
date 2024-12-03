'use client'

import React, {useContext, useState, useEffect} from 'react'
import { useLocal } from './localContext'

const toploggerContext = React.createContext()

export function useToplogger() {
    return useContext(toploggerContext)
}

export function ToploggerProvider({children}) {
    const [gymList, setGymList] = useState(null)
    const [gymLoading, setGymLoading] = useState(true)
    const [boulderList, setBoulderList] = useState(null)
    const [boulderLoading, setBoulderLoading] = useState(true)

    const { gym, setGym } = useLocal()

    // get gyms (and boulders)
    useEffect(() => {
        async function getGyms() {
            console.log('Getting Gyms')
            const response = await fetch('/api/toploggerhandler', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({func: 'allGyms'})})
            
            if (response.ok) {
                const allGyms = await response.json()
                setGymList(allGyms[0].data.gyms)
                setGymLoading(false)
            }
        }

        getGyms()
    }, [])

    useEffect(() => {
        async function getBoulders() {
            console.log('Getting Boulders')
            const response = await fetch('/api/toploggerhandler', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({func: 'boulders', gymId: gym})})
            
            if (response.ok) {
                const boulders = await response.json()
                setBoulderList(boulders)
                setBoulderLoading(false)
            }
        }

        console.log("GYM", gym)

        if (gym) {
            getBoulders()
        } else {
            setBoulderLoading(false)
        }
    }, [gym])

    const value = {
        gymList,
        boulderList,
        gymLoading,
        boulderLoading,
        setGymList,
        setBoulderList,
        setGymLoading,
        setBoulderLoading
    }

    return (
        <toploggerContext.Provider value={value}>
            {children}
        </toploggerContext.Provider>
    )
}