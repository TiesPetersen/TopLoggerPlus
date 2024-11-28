import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="flex justify-center items-center p-4 bg-zinc-800">
      <Link href='/'>
        <div className="flex items-center gap-3">
          <Image width={70} height={44} src="/icon.svg" alt="toploggerplus logo" />
          <div className="font-bold text-2xl">TopLoggerPlus</div>
        </div>
      </Link>
    </div>
  )
}
