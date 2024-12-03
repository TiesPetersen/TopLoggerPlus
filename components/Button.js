import Link from 'next/link'
import React from 'react'

export default function Button(props) {
    const { text, href, disabled, onClick } = props;

    // TODO have option to not have Link component

    return (
        <Link onClick={onClick} href={disabled ? '' : href}><div className={(disabled ? 'bg-zinc-400 text-zinc-700 ' : 'bg-zinc-100 hover:bg-zinc-300 ') + ' text-zinc-900 text-center p-2 rounded-lg'}>{ text }</div></Link>
    )
}
