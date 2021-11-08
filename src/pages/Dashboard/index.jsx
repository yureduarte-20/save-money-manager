import React, { useEffect, useState } from "react"
import { View, Text, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { Paragraph, FAB, withTheme, ActivityIndicator } from 'react-native-paper'
import styles from "./styles";
import WastingRepository from "../../Repository/WastingRepository";
import 'faker/locale/pt_BR'
import { useNavigation } from "@react-navigation/native";
import LatestWasting from '../../Components/LatestWastings'
import LastMonthWasting from "../../Components/LastMonthWasting"
import Chart from "../../Components/Chart";
const Dashboard = ({ theme }) => {
    const navigation = useNavigation()
    const [wastings, setWasting] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        WastingRepository.getAllRegiters().then(value => {
            setWasting(value)
            setRefreshing(false)
        })
    }, [wastings]);
    useEffect(() => {
        const starting = async () => {
            setLoading(true)
            var w = await WastingRepository.getAllRegiters()
            setWasting(w)
            setLoading(false);
        }
        starting()
    }, [])
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator />
            </SafeAreaView>)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[theme.colors.primary_700]}
                    />
                }
            >
                <View style={{width:'100%', flexDirection:'row'}}>
                    <LatestWasting wastings={wastings} />
                    <LastMonthWasting wastings={wastings} />
                </View>
                <Chart wastings={wastings} scale={0.9} />
            </ScrollView>
            <FAB style={styles.FAB}
                icon={'plus'}
                animated={true}
                onPress={() => navigation.navigate('New')} />

        </SafeAreaView>
    )
}
export default withTheme(Dashboard);