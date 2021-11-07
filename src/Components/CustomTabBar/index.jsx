import React, { useState } from "react"
import { BottomNavigation, withTheme } from "react-native-paper"
import Dashboard from "../../pages/Dashboard";
import ListAllWastings from "../../pages/ListAllWastings";
import { Entypo } from "@expo/vector-icons"
const CustomTabBar = ({theme, navigation }) =>{
    const [index, setIndex] = useState(0);
    
    const [routes] = useState([
      { key: 'home', title: 'Página Inicial', icon: 'home' },
      { key: 'list', title: 'Listar', icon: props => <Entypo {...props}  name={'list'}/>},
    ]);
    
    const renderScene = BottomNavigation.SceneMap({
      home:Dashboard,
      list: ListAllWastings
    });
  
    return (
      <BottomNavigation
        theme={theme}
        sceneAnimationEnabled={true}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />)
}
export default withTheme (CustomTabBar)