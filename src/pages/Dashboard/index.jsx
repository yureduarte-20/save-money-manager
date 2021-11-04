import React, { useEffect, useState } from "react"
import { View, Text, FlatList } from "react-native";
import { Paragraph, FAB } from 'react-native-paper'
import styles from "./styles";
import WastingRepository from "../../Repository/WastingRepository";
import { AntDesign } from "@expo/vector-icons"
import 'faker/locale/pt_BR'
const Dashboard = ({ navigation }) => {
    const [wastings, setWasting] = useState([])
    useEffect(() => {
        const starting = async () => {
            var w = await WastingRepository.getAllRegiters()
            setWasting(w)
        }
        starting()
    }, [])
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
                icon={'plus'}
                animated={true}
                onPress={() => navigation.navigate('New')} />
        </View>
    )
}
export default Dashboard;