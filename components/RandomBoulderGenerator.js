'use client'

import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'
import Card from './Card'

export default function RandomBoulderGenerator() {
    const searchParams = useSearchParams()

    // redirect to homepage if no gym specified
    if (!searchParams.get('gym')) {
        redirect('/')
    }

    return (
        <Card>{searchParams.get('gym')}</Card>
    )
}
