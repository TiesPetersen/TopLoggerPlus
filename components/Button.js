import Link from 'next/link'
import React from 'react'

export default function Button(props) {
    const { text, href, onClick, outline } = props;

    // TODO have option to not have Link component

    const button = (
        <div onClick={onClick} className={(outline ? 'border-2 border-zinc-100 hover:bg-zinc-700' : ' bg-zinc-100 hover:bg-zinc-300 text-zinc-900') + ' text-center p-2 rounded-lg'}>{ text }</div>
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
