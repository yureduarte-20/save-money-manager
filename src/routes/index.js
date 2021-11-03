import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AntDesign, Entypo, EvilIcons } from "@expo/vector-icons"
import Dashboard from "../pages/Dashboard";
import New from "../pages/New";
import colors from "../assets/colors"
import { withTheme } from "react-native-paper"
import { StatusBar } from "react-native"
const Tab = createBottomTabNavigator();
const Routes = ({theme}) => {
    StatusBar.setBackgroundColor(theme.colors.backgroundBarColor)
    StatusBar.setBarStyle('light-content')
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        switch(route.name){
                            case 'Home':
                                iconName = 'home'
                                return focused ? <Entypo name={iconName} size={24} color={colors.colors.blue_secundary}/> : 
                                                <AntDesign name={iconName} size={24} color={'black'}/>
                            break;
                            case 'New':
                                iconName = 'plus'
                               return focused ? <EvilIcons name={iconName} size={24} color={colors.colors.blue_secundary}/> :
                                                <EvilIcons name={iconName} size={24} color="black"/>
                            break;
                        }
                        // You can return any component that you like here!
                        
                    },
                    tabBarActiveTintColor: colors.colors.violet_1,
                    tabBarInactiveTintColor: 'gray',
                    
                })}>
                <Tab.Screen
                    name="Home"
                    component={Dashboard}
                    options={{ 
                        headerTitle:"Página Inicial",
                        headerStyle:{ backgroundColor:theme.colors.primary },
                        headerTitleStyle:{
                            color: "#fff",
                        }
                     }}
                />
                <Tab.Screen 
                name="New"
                component={New}
                options={{
                    headerTitle:"Novo Gasto",
                    title:'Novo',
                    headerStyle:{ backgroundColor:theme.colors.primary },
                        headerTitleStyle:{
                            color: "#fff",
                        }
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default withTheme (Routes);
