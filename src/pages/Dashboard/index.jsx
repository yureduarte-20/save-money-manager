import React, { useEffect, useState } from "react"
import { View, Text, FlatList } from "react-native";
import { Paragraph, FAB } from 'react-native-paper'
import styles from "./styles";
import WastingRepository from "../../Repository/WastingRepository";
import 'faker/locale/pt_BR'
const Dashboard = ({ navigation }) => {
    const [wastings, setWasting] = useState([])
    const [iconName, setIconName] = useState('plus')
    useEffect(() => {
        const starting = async () => {
            var w = await WastingRepository.getAllRegiters()
            setWasting(w)
        }
        starting()
    }, [])
    console.log(wastings)
    const WastingRender = ({ item }) => {
        const data = new Date(item.date)
        return (
            <View key={item.id} style={styles.wastingItem}>
                <Paragraph>{item.name}</Paragraph>
                <Paragraph>{item?.description}</Paragraph>
                <Paragraph>{item.value}</Paragraph>
                <Paragraph>{item.category}</Paragraph>
                <Paragraph>{`${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`}</Paragraph>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {wastings.length > 0 ? (
                <FlatList
                    data={wastings}
                    renderItem={WastingRender}
                    keyExtractor={item => item.id} />) : (<Text >Nada</Text>)
            }
            <FAB style={styles.FAB}
                icon={iconName}
                label="pressione"
                animated={true}
                onPress={() => setIconName( state => state === "plus" ? "caretup" : "plus" )}>
                
            </FAB>
        </View>
    )
}
export default Dashboard;