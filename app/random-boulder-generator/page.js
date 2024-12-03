'use client'

import RandomBoulderGenerator from '@/components/RandomBoulderGenerator'
import ToolTemplate from '@/components/ToolTemplate'
import { useLocal } from '@/context/localContext'
import { useToplogger } from '@/context/toploggerContext'
import React, { Suspense, useState } from 'react'

export default function RandomBoulderGeneratorPage() {    
    return (
        <ToolTemplate title='Random Boulder Generator'>
            <RandomBoulderGenerator/>
        </ToolTemplate>
    )
}
