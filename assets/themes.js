import { DefaultTheme, DarkTheme } from "react-native-paper"
export const theme = {
    name:'default',
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary_700: '#3700b3',
        success: '#04b60c'
    },
}
export const darkTheme = {
    name:'dark',
    ...DarkTheme,
    roundness: 2,
    colors: {
        ...DarkTheme.colors,
        primary_700: DarkTheme.colors.surface,
        success: '#04b60c'
    }

}