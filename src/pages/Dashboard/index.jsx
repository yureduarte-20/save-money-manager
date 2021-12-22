import React, { useEffect, useState } from "react"
import { View, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { FAB, withTheme, ActivityIndicator, Title } from 'react-native-paper'
import styles from "./styles";
import WastingRepository from "../../Repository/WastingRepository";
import 'faker/locale/pt_BR'
import { useNavigation } from "@react-navigation/native";
import { useWastings } from "../../providers/Wastings"
import LatestWasting from '../../Components/LatestWastings'
import LastMonthWasting from "../../Components/LastMonthWasting"
import Chart from "../../Components/Chart";
const Dashboard = ({ theme }) => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const  { wastings, setRefresh, refresh, setWastings, onRefresh } = useWastings()

    useEffect(() => {
        const starting = async () => {
            setLoading(true)
            var w = await WastingRepository.getAllRegiters()
            setWastings(w)
            setLoading(false);
            console.log("List all Use effect")
        }
        starting()
    }, [])
    if (loading || refresh) {
        return (
            <SafeAreaView style={{...styles.container, justifyContent:'center'}}>
                <ActivityIndicator />
            </SafeAreaView>)
    }
    if (wastings.length <= 0)
        return (
            <SafeAreaView style={styles.container}>
                <Title>Nada</Title>
                <FAB style={styles.FAB}
                    icon={'plus'}
                    animated={true}
                    onPress={() => navigation.navigate('New')} />
            </SafeAreaView>
        )
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refresh={refresh}
                        onRefresh={onRefresh}
                        colors={[theme.colors.primary_700]}
                    />
                }
            >
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <LatestWasting wastings={wastings} />
                    <LastMonthWasting wastings={wastings} />
                </View>
                <Chart wastings={wastings} scale={1.0} />
            </ScrollView>
            <FAB style={styles.FAB}
                icon={'plus'}
                animated={true}
                onPress={() => navigation.navigate('New')} />

        </SafeAreaView>
    )
}
export default withTheme(Dashboard);