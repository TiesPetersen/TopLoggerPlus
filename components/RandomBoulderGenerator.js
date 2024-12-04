import React, { useEffect, useState } from 'react'
import OptionDropDown from './OptionDropDown'
import Checkbox from './Checkbox'
import Button from './Button'
import { useToplogger } from '@/context/toploggerContext'
import Card from './Card'
import { conversion } from '@/public/gradeConversion'

export default function RandomBoulderGenerator() {
    const [ randomBoulder, setRandomBoulder ] = useState(null)
    const [ colorOptions, setColorOptions] = useState([])
    const [ groupOptions, setGroupOptions] = useState([])
    const [ wallOptions, setWallOptions ] = useState([])
    const [ gradeOptions, setGradeOptions] = useState([])
    const [ colorEnabled, setColorEnabled ] = useState(false)
    const [ groupEnabled, setGroupEnabled ] = useState(false)
    const [ wallEnabled, setWallEnabled ] = useState(false)
    const [ gradeEnabled, setGradeEnabled ] = useState(false)
    const { boulderList, colorCount, wallCount, groupCount, grades, gradeCount } = useToplogger()

    const colors = boulderList[1].data.gym.holdColors
    const groups = boulderList[1].data.gym.climbGroups
    const walls =  boulderList[1].data.gym.walls

    function changeColorOptions(event) {

        var colorOptionsTemp = colorOptions
        
        if (event.target.id == 'selectall') {
            colors.forEach((color) => {
                if (colorOptionsTemp.indexOf(color.id) == -1 && colorCount[color.id] > 0){
                    colorOptionsTemp.push(color.id)
                }
            })
            setColorOptions([...colorOptionsTemp])
            return
        } else if (event.target.id == 'deselectall') {
            colorOptionsTemp = []
            setColorOptions([...colorOptionsTemp])
            return
        }

        const index = colorOptionsTemp.indexOf(event.target.name)
        if (index != -1) {
            colorOptionsTemp.splice(index, 1)
        } else {
            colorOptionsTemp.push(event.target.name)
        }
        setColorOptions([...colorOptionsTemp]);
        console.log(colorOptionsTemp)
    }

    function changeGroupOptions(event) {
        var groupOptionsTemp = groupOptions

        if (event.target.id == 'selectall') {
            groups.forEach((group) => {
                if (groupOptionsTemp.indexOf(group.id) == -1 && groupCount[group.id] > 0){
                    groupOptionsTemp.push(group.id)
                }
            })
            setGroupOptions([...groupOptionsTemp])
            return
        } else if (event.target.id == 'deselectall') {
            groupOptionsTemp = []
            setGroupOptions([...groupOptionsTemp])
            return
        }

        const index = groupOptionsTemp.indexOf(event.target.name)
        if (index != -1) {
            groupOptionsTemp.splice(index, 1)
        } else {
            groupOptionsTemp.push(event.target.name)
        }
        setGroupOptions([...groupOptionsTemp]);
        console.log(groupOptionsTemp)
    }

    function changeWallOptions(event) {
        var wallOptionsTemp = wallOptions

        if (event.target.id == 'selectall') {
            walls.forEach((wall) => {
                if (wallOptionsTemp.indexOf(wall.id) == -1 && wallCount[wall.id] > 0){
                    wallOptionsTemp.push(wall.id)
                }
            })
            setWallOptions([...wallOptionsTemp])
            return
        } else if (event.target.id == 'deselectall') {
            wallOptionsTemp = []
            setWallOptions([...wallOptionsTemp])
            return
        }

        const index = wallOptionsTemp.indexOf(event.target.name)
        if (index != -1) {
            wallOptionsTemp.splice(index, 1)
        } else {
            wallOptionsTemp.push(event.target.name)
        }
        setWallOptions([...wallOptionsTemp]);
        console.log(wallOptionsTemp)
    }

    function changeGradeOptions(event) {
        var gradeOptionsTemp = gradeOptions

        if (event.target.id == 'selectall') {
            grades.forEach((grade) => {
                if (gradeOptionsTemp.indexOf(grade) == -1 && gradeCount[grade.toString()] > 0){
                    gradeOptionsTemp.push(grade)
                }
            })
            setGradeOptions([...gradeOptionsTemp])
            return
        } else if (event.target.id == 'deselectall') {
            gradeOptionsTemp = []
            setGradeOptions([...gradeOptionsTemp])
            return
        }

        const index = gradeOptionsTemp.indexOf(event.target.name)
        if (index != -1) {
            gradeOptionsTemp.splice(index, 1)
        } else {
            gradeOptionsTemp.push(event.target.name)
        }
        setGradeOptions([...gradeOptionsTemp]);
        console.log(gradeOptionsTemp)
    }

    function generateRandomBoulder() {
        var filteredBoulders = []
        boulderList[0].data.climbs.data.forEach((boulder) => {
            var hasColor = false
            var hasWall = false
            var hasGrade = false
            var hasGroup = false
            
            if (colorOptions.indexOf(boulder.holdColorId) != -1){
                hasColor = true
            }
            if (wallOptions.indexOf(boulder.wallId) != -1) {
                hasWall = true
            }
            if (gradeOptions.indexOf(boulder.grade.toString()) != -1) {
                hasGrade = true
            }
            boulder.climbGroupClimbs?.some((group) => {
                if (groupOptions.indexOf(group.climbGroupId) != -1) {
                    hasGroup = true
                    return true
                }
            })

            if ((!colorEnabled || hasColor) && (!gradeEnabled || hasGrade) && (!groupEnabled || hasGroup) && (!wallEnabled ||hasWall)) {
                filteredBoulders.push(boulder)
            }
        })
        console.log(filteredBoulders)

        const randBoulder = filteredBoulders[Math.floor(Math.random() * filteredBoulders.length)]
        setRandomBoulder(randBoulder)
    }

    return (
        <div>
            <Card>
                <div className='mb-3'>
                    <div className='text-center text-xl font-bold'>Options</div>
                    <div className='text-center'>Click on the menus below to enable the filter for that category.</div>
                </div>
                <div className='mb-3 flex flex-col gap-3'>
                    <OptionDropDown title='Colors' dropped={colorEnabled} setDropped={setColorEnabled}>
                        <div className='flex gap-3 justify-between mt-3'>
                            <Button onClick={changeColorOptions} name='selectall' outline text={'Select All'}/>
                            <Button onClick={changeColorOptions} name='deselectall' outline text={'Deselect All'}/>
                        </div>
                        <div className='flex flex-col gap-2 mt-3 ms-1'>
                            {colors.map((color) => {
                                if (color.id in colorCount){
                                    return (
                                    <Checkbox onChange={changeColorOptions} checked={colorOptions.indexOf(color.id) != -1} objId={color.id} text={color.nameLoc + ' (' + colorCount[color.id] + 'x)'} key={color.id}/>
                                    )}
                            })}
                        </div>
                    </OptionDropDown>
                    <OptionDropDown title='Groups' dropped={groupEnabled} setDropped={setGroupEnabled}> 
                        <div className='flex gap-3 justify-between mt-3'>
                            <Button onClick={changeGroupOptions} name='selectall' outline text={'Select All'}/>
                            <Button onClick={changeGroupOptions} name='deselectall' outline text={'Deselect All'}/>
                        </div>
                        <div className='flex flex-col gap-2 mt-3 ms-1'>
                            {groups.map((group) => {
                                if (group.id in groupCount) {
                                    return (
                                    <Checkbox onChange={changeGroupOptions} checked={groupOptions.indexOf(group.id) != -1} objId={group.id} text={group.nameLoc  + ' (' + groupCount[group.id] + 'x)'} key={group.id}/>
                                )}
                            })}
                        </div>
                    </OptionDropDown>
                    <OptionDropDown title='Walls' dropped={wallEnabled} setDropped={setWallEnabled}>
                        <div className='flex gap-3 justify-between mt-3'>
                            <Button onClick={changeWallOptions} name='selectall' outline text={'Select All'}/>
                            <Button onClick={changeWallOptions} name='deselectall' outline text={'Deselect All'}/>
                        </div>
                        <div className='flex flex-col gap-2 mt-3 ms-1'>
                            {walls.map((wall) => {
                                if (wall.id in wallCount) {
                                    return (
                                    <Checkbox onChange={changeWallOptions} checked={wallOptions.indexOf(wall.id) != -1} objId={wall.id} text={wall.nameLoc  + ' (' + wallCount[wall.id] + 'x)'} key={wall.id}/>
                            )}
                            })}
                        </div>
                    </OptionDropDown>
                    <OptionDropDown title='Grades' dropped={gradeEnabled} setDropped={setGradeEnabled}>
                        <div className='flex gap-3 justify-between mt-3'>   
                            <Button onClick={changeGradeOptions} name='selectall' outline text={'Select All'}/>
                            <Button onClick={changeGradeOptions} name='deselectall' outline text={'Deselect All'}/>
                        </div>
                        <div className='flex flex-col gap-2 mt-3 ms-1'>
                            {grades.map((grade) => {
                                if (grade in gradeCount) {
                                    return (
                                    <Checkbox onChange={changeGradeOptions} checked={gradeOptions.indexOf(grade) != -1} objId={grade} text={(conversion[grade] || grade)  + ' (' + gradeCount[grade] + 'x)'} key={grade}/>
                            )}
                            })}
                        </div>
                    </OptionDropDown>
                </div>
                <Button text='Generate random boulder' onClick={generateRandomBoulder} />
            </Card>
            {randomBoulder ? 
                <Card>
                    <div className='text-center mb-3 text-xl font-bold'>
                        Generated Boulder
                    </div>
                    <div className='mt-4 border-2 rounded-lg p-2 flex flex-col'>
                        <div>
                            {randomBoulder.holdColor.nameLoc}
                        </div>
                        <div>
                            {conversion[randomBoulder.grade]}
                        </div>
                        <div>
                            {randomBoulder.wall.nameLoc}
                        </div>
                        <div>
                            {randomBoulder.climbSetters?.[0]?.gymAdmin?.name || 'No setter'}
                        </div>
                    </div>
                </Card> : ''}
        </div>
    )
}
