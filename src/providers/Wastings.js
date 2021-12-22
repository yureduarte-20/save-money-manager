import React from "react"
import WastingRepository from "../Repository/WastingRepository"

export const WastingContext = React.createContext({})

export const WastingsProvider = props => {
    const [refresh, setRefresh] = React.useState(false)
    const [wastings, setWastings] = React.useState([])
    const onRefresh = React.useCallback( async () => {
        setRefresh(true)
        let w = await WastingRepository.getAllRegiters()
        setWastings(w)
        setRefresh(false)
    })
    return (
        <WastingContext.Provider value={{
            wastings,
            refresh,
            setRefresh,
            setWastings,
            onRefresh
        }}>
            {props.children}
        </WastingContext.Provider>
    )
}

export const useWastings = () => {
    const context = React.useContext(WastingContext)
    const { 
        wastings,
        refresh,
        setRefresh,
        setWastings, 
        onRefresh } = context
    return {
        wastings,
        refresh,
        setRefresh,
        setWastings,
        onRefresh
    }
}