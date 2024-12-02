import Link from 'next/link'
import React from 'react'

export default function BottomInfo() {
  return (
    <div className='text-center'>
        <div className="flex justify-center items-center gap-3 mb-1 text-zinc-400">
            <div className='mb-1'>By Ties Petersen</div>
            <Link href='https://github.com/TiesPetersen'><i className="fa-brands fa-square-github text-2xl p-0 m-0"></i></Link>
        </div>
        <div className='mb-4 px-4 text-zinc-600'>
          This is a personal project, not affiliated with or endorsed by TopLogger. All rights to data and content remain with <u><Link href='https://toplogger.nu/'>TopLogger</Link></u>.
        </div>
    </div>
  )
}
