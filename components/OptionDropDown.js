'use client'

import React, { useState } from 'react'

export default function OptionDropDown({children, title}) {
    const [dropped, setDropped] = useState(false)

    return (
        <div>
            <div className='flex justify-between border-2 rounded-lg p-2 hover:bg-zinc-700' onClick={() => setDropped(!dropped)}>
                <div className=''>
                    {title}
                </div>
                <div>
                    {dropped ? 
                    <i className="fa-solid fa-chevron-up"></i> 
                    :
                    <i className="fa-solid fa-chevron-down"></i>
                    }
                </div>
            </div>
            <div className={'' + (dropped ? '' : 'hidden')}>
                {children}
            </div>
        </div>
        
    )
}
