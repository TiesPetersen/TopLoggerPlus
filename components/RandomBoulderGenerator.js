import React, { useEffect, useState } from 'react'
import OptionDropDown from './OptionDropDown'
import Checkbox from './Checkbox'
import Button from './Button'
import { useToplogger } from '@/context/toploggerContext'
import Card from './Card'

export default function RandomBoulderGenerator() {
    const [ randomBoulder, setRandomBoulder ] = useState(null)
    const [ colorOptions, setColorOptions] = useState([])
    const { boulderList } = useToplogger()

    const colors = boulderList[1].data.gym.climbGroups

    function changeColorOptions(event) {
        var colorOptionsTemp = colorOptions

        const index = colorOptionsTemp.indexOf(event.target.name)
        if (index != -1) {
            colorOptionsTemp.splice(index, 1)
        } else {
            colorOptionsTemp.push(event.target.name)
        }
        setColorOptions([...colorOptionsTemp]);
    }


    function generateRandomBoulder() {
        setRandomBoulder("o")
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
                            {colors.map((color) => (
                                <Checkbox onChange={changeColorOptions} checked={colorOptions.indexOf(color.id) != -1} color={color} key={color.id}/>
                            ))}
                        </div>
                    </OptionDropDown>
                    <OptionDropDown title='Groups'> 
                        Some group options
                    </OptionDropDown>
                    <OptionDropDown title='Walls'>
                        Some walls options
                    </OptionDropDown>
                    <OptionDropDown title='Grades'>
                        Some grades options
                    </OptionDropDown>
                </div>
                <Button text='Generate random boulder' onClick={generateRandomBoulder} />
            </Card>
            {randomBoulder ? 
                <Card>
                    <div className='text-center mb-3 text-xl font-bold'>
                        Generated Boulder
                    </div>
                    <div className='mt-4 border-2 rounded-lg p-2'>
                        Some random boulder
                    </div>
                </Card> : ''}
        </div>
    )
}
