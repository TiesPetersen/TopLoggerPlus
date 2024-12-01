'use client'

import React, {useContext, useState, useEffect} from 'react'

const localContext = React.createContext()

export function useLocal() {
    return useContext(localContext)
}

export function LocalProvider({children}) {
    const [gym, setGym] = useState(null)

    useEffect(() => {
        // get gym from local storage if stored
        const tempGym = localStorage.getItem('gym')
        if (tempGym != null) {
            setGym(tempGym)
        }
    }, [])

    useEffect(() => {
        // store gym in local storage
        if (gym != null) {
            localStorage.setItem('gym', gym)
        } else {
            localStorage.removeItem('gym')
        }
    }, [gym])

    const value = {
        gym,
        setGym
    }

    return (
        <localContext.Provider value={value}>
            {children}
        </localContext.Provider>
    )
}