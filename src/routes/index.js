import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import New from "../screens/New";
import { withTheme } from "react-native-paper"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomAppBar from "../Components/CustomAppBar";
import CustomTabBar from "../Components/CustomTabBar";
import Edit from "../screens/Edit";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

const Routes = ({ theme }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                header: props => <CustomAppBar theme={theme} {...props} />
            }}
                initialRouteName={"HomePage"} >

                <Stack.Screen options={{
                    headerTitle: "Gerenciador de Gastos",
                }}
                    name="HomePage"
                    component={CustomTabBar} />
                <Stack.Screen
                    options={{
                        headerTitle: "Novo",
                        animation: "slide_from_bottom"
                    }}
                    name={"New"}
                    component={New} />
                <Stack.Screen
                    name={"Edit"}
                    options={{
                        headerShown: false,
                        headerTitle: "Editar",
                        animation: "slide_from_bottom"
                    }}
                    component={Edit} />
                <Stack.Screen
                    component={Settings}
                    name="Settings"
                    options={{
                        headerShown: true,
                        headerTitle: "Configurações",
                        animation: "simple_push"
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default withTheme(Routes);
