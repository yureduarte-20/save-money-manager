import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext } from 'react'
import { Provider } from "react-native-paper"
import { StatusBar } from "react-native"
import { darkTheme, theme } from '../../assets/themes'
export const getDefinedThemeOrDefaultTheme = async () => {
    let option = await AsyncStorage.getItem('theme_option') || 'default'
    return option
}
const PaperContext = createContext()

const PaperProvider = ({ children, definedTheme }) => {
    const [_theme, setTheme] = React.useState( definedTheme === 'dark' ? darkTheme : theme)
    StatusBar.setBackgroundColor(_theme.colors.primary_700)
    StatusBar.setBarStyle('light-content')
    const changeTheme = async (theme_name) => {
        await AsyncStorage.setItem('theme_option', theme_name)
        setTheme(theme_name == "dark" ? darkTheme : theme)
    }
    return (
        <PaperContext.Provider value={{
            changeTheme
        }}>
            <Provider theme={_theme}>
                {children}
            </Provider>
        </PaperContext.Provider>
    )
}
export const useThemeSelector = () => {
    const context = useContext(PaperContext)
    const { changeTheme } = context
    return { changeTheme }
}
export default PaperProvider