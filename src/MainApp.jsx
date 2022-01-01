import React from 'react'
import Routes from './routes'
import Providers from './providers'
import AppLoading from 'expo-app-loading'
import { getDefinedThemeOrDefaultTheme } from './providers/PaperProvider'
export default function MainApp({ children }) {
    const [isReady, setIsReady] = React.useState(false)
    const [definedTheme, setDefinedTheme] = React.useState('default')
    if (!isReady)
        return (
            <AppLoading
                startAsync={async () => {
                    let option = await getDefinedThemeOrDefaultTheme()
                    setDefinedTheme(option)
                    return Promise.resolve()
                }}
                onError={console.warn}
                onFinish={() => setIsReady(true)} />
        )
    return (
        <Providers paperTheme={definedTheme}>
            <Routes />
        </Providers>
    )
}