import { useState } from 'react'
import ApplicationCard from './ApplicationCard'
import { dummyApplication } from '../../data/dummyApplication.js'

export default function HomePage() {
    return(
        <>
            <ApplicationCard  application={dummyApplication[0]}/>
        </>
    )
}