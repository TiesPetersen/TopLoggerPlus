import Link from 'next/link'
import React from 'react'

export default function Button(props) {
    const { text, href } = props;

    return (
        <Link href={href}><div className='bg-blue-600 p-2 rounded-lg hover:bg-blue-500'>{ text }</div></Link>
    )
}
