import React from "react"
import { withTheme } from "react-native-paper"
import { AntDesign, Entypo, EvilIcons } from "@expo/vector-icons"
import Dashboard from "../pages/Dashboard";
const Tab = createBottomTabNavigator();
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const TabRoutes = ({theme}) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = 'home'
                            return focused ? <Entypo name={iconName} size={24} color={color} /> :
                                <AntDesign name={iconName} size={24} color={'black'} />
                            break;
                        case 'New':
                            iconName = 'plus'
                            return focused ? <EvilIcons name={iconName} size={24} color={color} /> :
                                <EvilIcons name={iconName} size={24} color="black" />
                            break;
                    }
                    // You can return any component that you like here!
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen
                name="Home"
                component={Dashboard}
                options={{
                    headerTitle: "Página Inicial",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitleStyle: {
                        color: "#fff",
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default withTheme(TabRoutes)