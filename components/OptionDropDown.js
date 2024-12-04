'use client'

import React, { useState } from 'react'

export default function OptionDropDown({children, title, dropped, setDropped}) {

    return (
        <div>
            <div className={(dropped ? 'border-2 bg-zinc-100 text-zinc-900 ' : ' border-2 hover:bg-zinc-700 ') + 'flex justify-between rounded-lg p-2'} onClick={() => setDropped(!dropped)}>
                <div className='flex items-center'>
                    <div className='me-3' style={{'fontSize': '1.75rem'}}>
                        {dropped ? <i className="fa-solid fa-toggle-on"></i> : <i className="fa-solid fa-toggle-off"></i>}
                    </div>
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
