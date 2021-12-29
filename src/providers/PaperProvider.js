import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext } from 'react'
import { Provider, DefaultTheme, DarkTheme } from "react-native-paper"
import { StatusBar } from "react-native"
const getDefinedThemeOrDefaultTheme = async () => {
    let option = await AsyncStorage.getItem('theme_option') || 'default'
    return option
}
const theme = {
    name:'default',
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary_700: '#3700b3',
        success: '#04b60c'
    },
}
const darkTheme = {
    name:'dark',
    ...DarkTheme,
    roundness: 2,
    colors: {
        ...DarkTheme.colors,
        primary_700: DarkTheme.colors.surface,
        success: '#04b60c'
    }

}
const PaperContext = createContext()

const PaperProvider = ({ children }) => {
    const [_theme, setTheme] = React.useState(theme)
    React.useEffect(() => {
        const setup = async () => {
            let option = await getDefinedThemeOrDefaultTheme()
            setTheme(option == "dark" ? darkTheme : theme)
        }
        setup()
    }, [])
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