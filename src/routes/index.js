import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import New from "../pages/New";
import { withTheme } from "react-native-paper"
import { StatusBar } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from "./TabRoutes";

const Stack = createNativeStackNavigator();

const Routes = ({ theme }) => {
    StatusBar.setBackgroundColor(theme.colors.primary)
    StatusBar.setBarStyle('light-content')
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"HomePage"} >
                <Stack.Screen options={{
                    headerShown: false
                }} name="HomePage" component={TabRoutes} />
                <Stack.Screen
                    options={{
                        headerTitle: "Novo",
                        animation:"slide_from_bottom"
                    }}
                    name={"New"}
                    component={New} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default withTheme(Routes);
