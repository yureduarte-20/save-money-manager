import { SnackProvider } from "./SnackBarContext"
import { WastingsProvider } from "./Wastings"
import React from "react"
import SnackBar from "../Components/SnackBar"
import PaperProvider from './PaperProvider'

export default function Providers({ children }) {
    return (
        <PaperProvider>
            <WastingsProvider>
                <SnackProvider>
                    {children}
                    <SnackBar />
                </SnackProvider>
            </WastingsProvider>
        </PaperProvider>
    )
}