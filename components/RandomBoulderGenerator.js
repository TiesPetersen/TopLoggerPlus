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
    const { boulderList, colorCount, wallCount, groupCount, grades, gradeCount } = useToplogger()

    const colors = boulderList[1].data.gym.holdColors
    const groups = boulderList[1].data.gym.climbGroups
    const walls =  boulderList[1].data.gym.walls

    function changeColorOptions(event) {
        var colorOptionsTemp = colorOptions

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

            if (hasColor && hasGrade && hasGroup && hasWall) {
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
                <div className='text-center mb-3 text-xl font-bold'>
                    Options
                </div>
                <div className='mb-3 flex flex-col gap-3'>
                    <OptionDropDown title='Colors'>
                        <div className='flex flex-col gap-2 mt-3 ms-1'>
                            {colors.map((color) => {
                                if (color.id in colorCount){
                                    return (
                                    <Checkbox onChange={changeColorOptions} checked={colorOptions.indexOf(color.id) != -1} objId={color.id} text={color.nameLoc + ' (' + colorCount[color.id] + 'x)'} key={color.id}/>
                                    )}
                            })}
                        </div>
                    </OptionDropDown>
                    <OptionDropDown title='Groups'> 
                        <div className='flex flex-col gap-2 mt-3 ms-1'>
                            {groups.map((group) => {
                                if (group.id in groupCount) {
                                    return (
                                    <Checkbox onChange={changeGroupOptions} checked={groupOptions.indexOf(group.id) != -1} objId={group.id} text={group.nameLoc  + ' (' + groupCount[group.id] + 'x)'} key={group.id}/>
                                )}
                            })}
                        </div>
                    </OptionDropDown>
                    <OptionDropDown title='Walls'>
                        <div className='flex flex-col gap-2 mt-3 ms-1'>
                            {walls.map((wall) => {
                                if (wall.id in wallCount) {
                                    return (
                                    <Checkbox onChange={changeWallOptions} checked={wallOptions.indexOf(wall.id) != -1} objId={wall.id} text={wall.nameLoc  + ' (' + wallCount[wall.id] + 'x)'} key={wall.id}/>
                            )}
                            })}
                        </div>
                    </OptionDropDown>
                    <OptionDropDown title='Grades'>
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
