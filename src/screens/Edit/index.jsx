import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native"
import { withTheme, TextInput, Appbar, Menu, Text, Paragraph, Caption, HelperText, Subheading, Button, ActivityIndicator, Divider } from "react-native-paper"
import { to_iso_string, to_string_date } from "../../utils/dates";
import { isValid, isAfter } from "date-fns"
import { Feather } from "@expo/vector-icons"
import { TextInputMask } from "react-native-masked-text"
import styles from "./styles";
import WastingRepository from "../../Repository/WastingRepository";
import { useWastings } from "../../providers/Wastings";
import { useNavigation } from "@react-navigation/native";
import { withSnackBarConsumer } from "../../providers/SnackBarContext";
import categories from '../../Repository/CategoriesRepository'
import wastingFactory  from '../../factories/wasting'

const Edit = ({ route, theme, handleOpen }) => {
    const [wasting, setWasting] = useState(route.params.wasting)
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(to_string_date(new Date(wasting.date)))
    const navigation = useNavigation()
    const [active, setActive] = useState(false);
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState(categories.filter(item => wasting.category === item.name)[0])
    const [value, setValue] = useState( wasting.value )
    const [error, setError] = useState({
        date: {
            message: "",
            error: false,
        },
        title: false,
        value: false
    })
    const [description, setDescription] = useState(wasting.description)
    const [title, setTitle] = useState(wasting.title)
    const [loading, setLoading] = useState(false)
    const handleChangeDate = (e) => {
        setDate(e)
    }

    
    const checkAllFields = () => {
        console.log(title, value, date)
        if (title === '') setError(state => ({ ...state, title: true }))
        if (value === '' || value === "R$0,00" || value === 0) setError(state => ({ ...state, value: true }))
        if (new Date(to_iso_string(date)).getTime() > new Date().getTime()) setError(state => ({ ...state, date: { message: "A data não pode ser maior que hoje", error: true } }))
        return error.date.error || error.title || error.value
    }
    const showMenu = () => setActive(true)
    const hideMenu = () => setActive(false)
    const { onRefresh } = useWastings()
    const handleSubmit = async () => {
        if (!checkAllFields()) {
            try {
                setLoading(true)
                let updated_wasting = wastingFactory() 
                updated_wasting.id = wasting.id
                updated_wasting.category = currentSelectedCategory.name
                updated_wasting.description = description.trim()
                updated_wasting.title = title.trim()
                updated_wasting.date = new Date(to_iso_string(date))
                const [rs, r_value] =  (typeof value === 'string') ? value.split('$') : ['$', value.toFixed(2)]
                let in_us = (typeof value === 'string') ? r_value.trim().replace(/\./g, '').replace(',', '.') : r_value
                updated_wasting.value = Number(in_us)
                console.log(updated_wasting)
                await WastingRepository.update(updated_wasting)
                handleOpen('Salvo com sucesso!')
            } catch (e) {
                handleOpen('Desculpe, algo deu errado.')
                console.log(e)
            } finally {
                await onRefresh();
                setLoading(false)
                navigation.reset({
                    routes: [
                        {
                            name: 'HomePage', params: {
                                tab_index: 1
                            }
                        }]
                })
                return; 
            }
        }
        setLoading(false)
    }
    const deleteRegister = async (id) => {
        setLoading(true)
        await WastingRepository.delete(id)
        await onRefresh();
        handleOpen('Deletado com sucesso!')
        setLoading(false)
        navigation.reset({
            routes: [
                {
                    name: 'HomePage', params: {
                        tab_index: 1
                    }
                }]
        })
    }
    const showOptionsMenu = () => setVisible(true)
    const hideOptionsMenu = () => setVisible(false)



    return (
        <>
            <Appbar.Header theme={theme}>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={"editar"} />
                <Menu
                    visible={visible}
                    onDismiss={hideOptionsMenu}
                    anchor={<Feather name="more-vertical" size={28} onPress={showOptionsMenu} color={theme.colors.surface} />}  >
                    <Menu.Item onPress={() => { hideOptionsMenu(); deleteRegister(wasting.id) }} title={"Excluir"} />
                </Menu>
            </Appbar.Header>
            <SafeAreaView
                style={Object.assign({backgroundColor:theme.colors.background},styles.container)}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={Object.assign({backgroundColor:theme.colors.background},styles.input)}>
                    <Paragraph style={styles.title}>Edite os dados e pressione em salvar, se não em cancelar.</Paragraph>
                    {/* <Caption>ex: Shopping, Mercadão, Feira</Caption> */}
                    <View style={styles.section}>
                        <View style={{ width: '100%' }}>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '65%', marginRight: '3%' }}>
                                    {error.title ? <HelperText type={"error"} visible={error.title}>*Título obrigatório</HelperText>
                                        : <Caption>Título</Caption>}
                                    <TextInput
                                        value={title}
                                        mode={"outlined"}
                                        onChangeText={setTitle}
                                        label={error.title ? "*Obrigatório" : null}
                                        onEndEditing={() => {
                                            if (title === '') {
                                                setError(state => ({ ...state, title: true }))
                                            } else {

                                                setError(state => ({ ...state, title: false }))
                                            }
                                        }}
                                        style={{ width: '100%' }}
                                        numberOfLines={1}
                                        error={error.title} />
                                </View>
                                <View style={{ width: '30%' }}>
                                    <HelperText type={error.value ? "error" : "info"} visible={true}>{error.value ? "Valor inválido" : "Valor"}</HelperText>
                                    <TextInput
                                        mode={"outlined"}
                                        value={value}
                                        onChangeText={setValue}

                                        onEndEditing={() => {
                                            if (value === 0 || value === "R$0,00") {
                                                setError(state => ({ ...state, value: true }))
                                            } else {

                                                setError(state => ({ ...state, value: false }))
                                            }
                                        }}
                                        style={{ width: '100%' }}
                                        numberOfLines={1}
                                        render={props => (
                                            <TextInputMask
                                                {...props}
                                                type={"money"}
                                                options={{
                                                    maskType: "BRL",
                                                    precision: 2,
                                                    delimiter: false
                                                }} />
                                        )}
                                        error={error.value} />
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* <Subheading style={styles.title}>Certo, agora dê um título para este gasto e quando você fez.</Subheading> */}
                    <View style={styles.section}>
                        <View style={styles.viewMenu}>
                            
                            <Menu
                                visible={active}
                                onDismiss={hideMenu}
                                anchor={
                                    <TouchableOpacity
                                        style={[styles.buttonMenu, { backgroundColor: theme.colors.surface }]} onPress={showMenu}>
                                        <Text style={{
                                            textTransform: 'uppercase',
                                            letterSpacing: 2.0,
                                        }}>{currentSelectedCategory.name}</Text>
                                    </TouchableOpacity>}>

                                        <Menu.Item disabled={true} title="Selecione uma categoria abaixo"/>
                                        <Divider />
                                {

                                    categories.map(item => {
                                        return <Menu.Item key={item.id}
                                            onPress={() => { setCurrentSelectedCategory(item); hideMenu() }} title={item.name} />
                                    })
                                }
                            </Menu>
                           {/*  <Caption style={{ marginTop: '10%' }}>Categoria</Caption> */}
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                keyboardType="decimal-pad"
                                onChangeText={handleChangeDate}
                                label={"*Data Obrigatória"}
                                style={styles.input}
                                onSubmitEditing={() => {
                                    let _d = to_iso_string(date)
                                    //console.log(_d)
                                    if (!isValid(new Date(_d)) || isAfter(new Date(_d), new Date()))
                                        setError(state => ({ ...state, date: { message: "Data inválida", error: true } }))
                                    else
                                        setError(state => ({ ...state, date: { error: false, message: "" } }))


                                }}
                                value={date}
                                error={error.date.error}
                                render={props => (
                                    <TextInputMask
                                        {...props}
                                        type={'datetime'}
                                        options={{
                                            format: 'DD/MM/YYYY'
                                        }}
                                    />
                                )}
                            />
                            <HelperText type={"error"} visible={error.date.error}>{error.date.message}</HelperText>
                        </View>
                    </View>
                    <View styles={styles.section}>
                        <TextInput
                            label={"Descrição"}
                            style={{ height: 100 }}
                            value={description}
                            autoCorrect={true}
                            onChangeText={setDescription}
                            keyboardType={"ascii-capable"}
                            mode={"outlined"}
                            numberOfLines={4}
                            textBreakStrategy={"balanced"} />

                    </View>
                    <View style={styles.submitContainer}>
                        {loading ? <ActivityIndicator /> :
                            <>
                                <Button
                                    style={styles.submitButton}
                                    mode={"contained"}
                                    onPress={handleSubmit}>
                                    OK
                                </Button>
                                <Button
                                    style={styles.submitButton}
                                    onPress={() => navigation.goBack()}
                                    mode={"outlined"}>Cancelar</Button>
                            </>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>

        </>
    )
}

export default withSnackBarConsumer(withTheme(Edit));

