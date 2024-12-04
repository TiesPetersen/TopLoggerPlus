import Link from 'next/link'
import React from 'react'

export default function Button(props) {
    const { text, href, onClick, outline, name } = props;

    // TODO have option to not have Link component

    const button = (
        <div onClick={onClick} id={name || ''} className={(outline ? ' active:bg-zinc-100 active:text-zinc-900 border-2 border-zinc-100 hover:bg-zinc-700' : ' active:border-2 active:border-zinc-100 active:bg-zinc-800 active:text-zinc-100 bg-zinc-100 hover:bg-zinc-300 text-zinc-900') + ' w-full text-center p-2 rounded-lg'}>{ text }</div>
    )

    if (!href && onClick) {
        return button
    }

    if (href && !onClick) {
        return (
            <Link href={href}>{button}</Link>
        )
    }

}
