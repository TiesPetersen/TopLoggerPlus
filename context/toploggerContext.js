'use client'

import React, {useContext, useState, useEffect} from 'react'
import { useLocal } from './localContext'

const toploggerContext = React.createContext()

export function useToplogger() {
    return useContext(toploggerContext)
}

export function ToploggerProvider({children}) {
    const [ gymList, setGymList ] = useState(null)
    const [ gymListStatus, setGymListStatus ] = useState('loading')

    const [ boulderList, setBoulderList ] = useState(null)
    const [ boulderListStatus, setBoulderListStatus ] = useState('waiting')

    // ANALYSIS DATA
    const [ colorCount, setColorCount ] = useState({})
    const [ groupCount, setGroupCount ] = useState({})
    const [ wallCount, setWallCount ] = useState({})
    const [ grades, setGrades ] = useState([])
    const [ gradeCount, setGradeCount] = useState([])

    const { gymId, gymIdStatus } = useLocal()

    // GET ALL GYMS ON LOAD
    useEffect(() => {
        async function getGyms() {
            console.log('Fetching Gyms')

            try {
                const response = await fetch('/api/toploggerhandler', {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({func: 'allGyms'})
                })

                console.log('Got a response')
                if (response.ok) {
                    console.log("Response OK")

                    const allGyms = await response.json()
                    if (allGyms[0]?.data?.gyms?.length > 0) {
                        setGymList(allGyms[0].data.gyms)
                        setGymListStatus('success')
                        console.log("GymList Updated")
                    } else {
                        console.log("No Gyms Found")
                        setGymListStatus('failed')
                    }

                } else {
                    console.log("Response Failed")
                    setGymListStatus('failed')
                }
            } catch (error) {
                console.log("Error during fetch")
                console.log(error)
                setGymListStatus('failed')
            }
        }

        getGyms()
    }, [])

    // GET BOULDERS ON GYM CHANGE
    useEffect(() => {        
        async function getBoulders() {
            console.log('Fetching Boulders')
            try {
                const response = await fetch('/api/toploggerhandler', {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({func: 'boulders', gymId: gymId})
                })

                console.log('Got a response')
                if (response.ok) {
                    console.log("Response OK")

                    const boulders = await response.json()
                    console.log(boulders)
                    if (boulders[0]?.data?.climbs?.data?.length > 0) {
                        setBoulderList(boulders)
                        console.log("BoulderList Updated")
                    } else {
                        console.log("No Boulders Found")
                        setBoulderListStatus('failed')
                    }
                } else {
                    console.log("Response Failed")
                    setBoulderListStatus('failed')
                }
            } catch (error) {
                console.log("Error during fetch")
                console.log(error)
                setBoulderListStatus('failed')
            }
        }

        console.log('GymId Changed')
        console.log("GymId", gymId)

        if (gymId != null) {
            setBoulderListStatus('loading')
            getBoulders()
        } else {
            setBoulderListStatus('waiting')
            setBoulderList(null)
        }
    }, [gymId])

    // ANALYSE BOULDERS ON BOULDER CHANGE
    useEffect(() => {
        function analyseBoulders() {
            var colorCountTemp = {}
            var groupCountTemp = {}
            var wallCountTemp = {}
            var gradeCountTemp = {}
        
            boulderList[0].data.climbs.data.forEach(climb => {
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

            setBoulderListStatus('success')
        }

        if (boulderList != null) {
            console.log("Analysing boulders")
            analyseBoulders()
            console.log("Analysis Complete")
        }
    }, [boulderList])

    const value = {
        gymList,
        boulderList,
        gymListStatus,
        boulderListStatus,
        setGymList,
        setBoulderList,
        setGymListStatus,
        setBoulderListStatus,
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