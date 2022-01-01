import React from "react"
const DEFAULT_STATE = {
    displayText: '',
    show: false,
    timedOut: 5000
}
export const SnackBarContext = React.createContext(DEFAULT_STATE)

export const SnackProvider = props => {
    const [state, setState] = React.useState(Object.assign({}, DEFAULT_STATE))
    const handleOpen = displayText => {
        setState({
            ...state,
            displayText: displayText,
            show: true,
        })
        setTimeout(
            () => setState({ ...state, show: false }),
            state.timedOut)
    }
    const handleClose = () => {
        setState({
            ...state,
            show: false,
            displayText: "",
        })
    }
    return (
        <SnackBarContext.Provider value={{
            ...state,
            handleClose,
            handleOpen
        }}>
            {props.children}
        </SnackBarContext.Provider>
    )
}
export const withSnackBarConsumer = WrappedComponent => {
    const WrapSnackBarConsumer = props => (
        <SnackBarContext.Consumer>
            {({ show, displayText, handleOpen, handleClose }) => {
                const snackBarProps = {
                    show,
                    displayText,
                    handleOpen,
                    handleClose,
                }
                return <WrappedComponent {...snackBarProps} {...props} />
            }}
        </SnackBarContext.Consumer>
    )
    return WrapSnackBarConsumer
}