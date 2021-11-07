import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native"
import { Paragraph, Title, Caption, Text, Button } from "react-native-paper"
import { from_iso_to_string, to_string_date } from "../../utils/dates"
import { useNavigation } from "@react-navigation/native"
import styles from "./styles";

const Edit = ({navigation, route}) =>{
    
    const [ wasting, setWasting ] = useState(route.params.wasting)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <Title>{wasting?.title}</Title>
                <Paragraph>{wasting?.description}</Paragraph>
                <Paragraph>{wasting?.category}</Paragraph>
                <Caption>{wasting?.value.replace('.', ',')}</Caption>
                <Caption>{from_iso_to_string(wasting.date) || "n"}</Caption>
                <Button onPress={()=>{ navigation.goBack()}}>Voltar</Button>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Edit;

