import React, { useState, useRef } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native"
import { Paragraph, Title, Caption, Text, Button, withTheme, TextInput, Appbar, Menu } from "react-native-paper"
import { from_iso_to_string, to_string_date } from "../../utils/dates";
import { Feather } from "@expo/vector-icons"
import styles from "./styles";
import WastingRepository from "../../Repository/WastingRepository";



const Edit = ({ navigation, route, back, options, theme, onGoBack}) => {
    const [wasting, setWasting] = useState(route.params.wasting)
    const [visible, setVisible] = useState(false)

    const handleSubmit = () => {

    }
    const deleteRegister = async ( id ) =>{
        await WastingRepository.delete(id)
        route.params.onGoBack("Deletado com sucesso");
        navigation.goBack()
    }
    const showMenu = () => setVisible(true)
    const hideMenu = () => setVisible(false)



    return (
        <>
            <Appbar.Header theme={theme}>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={"editar"} />
                <Menu
                    visible={visible}
                    onDismiss={hideMenu}
                    anchor={<Feather name="more-vertical" size={28} onPress={showMenu} color={theme.colors.surface} />}  >
                    <Menu.Item onPress={() => { hideMenu(); deleteRegister( wasting.id )}} title={"Excluir"} />
                </Menu>
            </Appbar.Header>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.title_value_view}>
                        <TextInput mode={"outlined"} defaultValue={wasting.title} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default withTheme(Edit);

