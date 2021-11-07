import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"
import New from "../pages/New";
import { withTheme } from "react-native-paper"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from "./TabRoutes";
import CustomAppBar from "../Components/CustomAppBar";
import CustomTabBar from "../Components/CustomTabBar";
import Edit from "../pages/Edit";

const Stack = createNativeStackNavigator();

const Routes = ({ theme }) => {
    console.log(theme.colors)
    StatusBar.setBackgroundColor(theme.colors.primary_700)
    StatusBar.setBarStyle('light-content')
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                header: props => <CustomAppBar theme={theme} {...props}/>
            }} 
            initialRouteName={"HomePage"} >

                <Stack.Screen options={{
                    headerTitle: "Gerenciador de Gastos",    
                }} 
                name="HomePage" 
                component={ CustomTabBar } />
                <Stack.Screen
                    options={{
                        headerTitle: "Novo",
                        animation:"slide_from_bottom"
                    }}
                    name={"New"}
                    
                    component={New} />
                    <Stack.Screen 
                    name={"Edit"}
                    options={{
                        headerTitle:"Editar",
                        animation:"slide_from_bottom"
                    }}
                    component={Edit}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default withTheme(Routes);
