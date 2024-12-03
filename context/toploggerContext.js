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

    const [colorCount, setColorCount] = useState({})
    const [groupCount, setGroupCount] = useState({})
    const [wallCount, setWallCount] = useState({})
    const [ grades, setGrades ] = useState([])
    const [ gradeCount, setGradeCount] = useState([])

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
        setBoulderLoading(true)

        async function getBoulders() {
            console.log('Getting Boulders')
            const response = await fetch('/api/toploggerhandler', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({func: 'boulders', gymId: gym})})
            
            if (response.ok) {
                const boulders = await response.json()
                console.log(boulders)
                setBoulderList(boulders)
                setBoulderLoading(false)

                analyseBoulders(boulders)
            }
        }

        function analyseBoulders(boulders) {
            var colorCountTemp = {}
            var groupCountTemp = {}
            var wallCountTemp = {}
            var gradeCountTemp = {}
        
            boulders[0].data.climbs.data.forEach(climb => {
                if (climb.holdColorId in colorCountTemp) {
                    colorCountTemp[climb.holdColorId] += 1
                } else {
                    colorCountTemp[climb.holdColorId] = 1
                }
        
                if (climb.wallId in wallCountTemp) {
                    wallCountTemp[climb.wallId] += 1
                } else {
                    wallCountTemp[climb.wallId] = 1
                }
        
                climb.climbGroupClimbs.forEach(group => {
                    if (group.climbGroupId in groupCountTemp) {
                        groupCountTemp[group.climbGroupId] += 1
                    } else {
                        groupCountTemp[group.climbGroupId] = 1
                    }
                })

                if (climb.grade.toString() in gradeCountTemp){
                    gradeCountTemp[climb.grade.toString()] += 1
                } else {
                    gradeCountTemp[climb.grade.toString()] = 1
                }
        
            });


        
            console.log('colorCount', colorCountTemp)
            console.log('groupCount', groupCountTemp)
            console.log('wallCount', wallCountTemp)
            console.log('gradeCount', gradeCountTemp)
            console.log('grades', Object.keys(gradeCountTemp))

            setColorCount(colorCountTemp)
            setGroupCount(groupCountTemp)
            setWallCount(wallCountTemp)
            setGradeCount(gradeCountTemp)
            setGrades(Object.keys(gradeCountTemp))
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
        setBoulderLoading,
        colorCount,
        wallCount,
        groupCount,
        grades,
        gradeCount
    }

    return (
        <toploggerContext.Provider value={value}>
            {children}
        </toploggerContext.Provider>
    )
}