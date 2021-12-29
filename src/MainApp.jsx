import React from 'react'
import Routes from './routes'
import Providers from './providers'
export default function MainApp({ children }) {

    return (
        <Providers>
            <Routes />
        </Providers>
    )
}