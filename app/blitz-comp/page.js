import Button from '@/components/Button'
import Card from '@/components/Card'
import ToolTemplate from '@/components/ToolTemplate'
import React from 'react'

export default function BlitzComp() {
    return (
        <ToolTemplate title='Blitz Comp'>
            <Card>
                <div className='flex flex-col gap-3 items-center'>
                    <div className='text-center text-xl font-bold'>
                        <span role='img' aria-label='construction'>🚧</span> Under Construction <span role='img' aria-label='construction'>🚧</span>
                    </div>
                    <Button href='/' text='Go back'/>
                </div>
            </Card>
        </ToolTemplate>
    )
}
