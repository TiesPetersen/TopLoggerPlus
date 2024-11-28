import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-3 bg-zinc-800">
      <Link href='/'>
        <div className="flex items-center gap-3">
          <img width={70} height={70} src="/icon.svg" alt="icon" />
          <div className="font-bold text-lg">TopLoggerPlus</div>
        </div>
      </Link>
      
      <div>
        {/* Right side,  */}
      </div>
    </div>
  )
}
