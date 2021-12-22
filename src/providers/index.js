import { SnackProvider } from "./SnackBarContext"
import { WastingsProvider } from "./Wastings"
import React from "react"
import SnackBar from "../Components/SnackBar"

export default function Providers({ children }) {
    return (
        <WastingsProvider>
            <SnackProvider>
                {children}
                <SnackBar />
            </SnackProvider>
        </WastingsProvider>
    )
}