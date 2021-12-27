import React, { useState } from "react"
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { TextInput, Text, Paragraph, Caption, Menu, ActivityIndicator, HelperText, Checkbox, Subheading, withTheme, Button } from "react-native-paper"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { TextInputMask } from 'react-native-masked-text'
import categories from '../../Repository/CategoriesRepository'
import { isAfter, isValid } from "date-fns"
import WastingRepository from "../../Repository/WastingRepository"
import wastingFactory from "../../factories/wasting"
import { to_iso_string, to_string_date } from "../../utils/dates"
import { withSnackBarConsumer } from "../../providers/SnackBarContext"

const New = ({ theme, handleOpen }) => {
    const [date, setDate] = useState(to_string_date(new Date()))
    const navigation = useNavigation()
    const [active, setActive] = useState(false)
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState(categories[categories.length - 1])
    const [value, setValue] = useState("")
    const [error, setError] = useState({
        date: {
            message: "",
            error: false,
        },
        title: false,
        value: false
    })
    const [description, setDescription] = useState('')
    const [todayCheck, setTodayCheck] = useState("checked")
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const handleChangeDate = (e) => {
        setDate(e)
    }


    const checkAllFields = () => {
        console.log(title, value, date)
        if (title === '') setError(state => ({ ...state, title: true }))
        if (value === '' || value === "R$0,00") setError(state => ({ ...state, value: true }))
        if (new Date(to_iso_string(date)).getTime() > new Date().getTime()) setError(state => ({ ...state, date: { message: "A data não pode ser maior que hoje", error: true } }))
        return error.date.error || error.title || error.value
    }
    const showMenu = () => setActive(true)
    const hideMenu = () => setActive(false)
    const handleSubmit = async () => {
        console.log(checkAllFields())
        if (!checkAllFields()) {
            try{
                setLoading(true)
                let wasting = wastingFactory()
                wasting.category = currentSelectedCategory.name
                wasting.description = description.trim()
                wasting.title = title.trim()
                wasting.date = new Date(to_iso_string(date))
                const [rs, r_value] = value.split('$')
                let in_us = r_value.trim().replace(/\./g, '').replace(',', '.')
                wasting.value = Number(in_us)
                await WastingRepository.addRegister(wasting)
                setLoading(false)
                handleOpen('Salvo com sucesso!')
            } catch (e){
                handleOpen('Desculpe, algo deu errado.')
            } finally {
                navigation.reset({
                    routes: [{ name: "HomePage" }]
                })
                return;
            }
        }
        setLoading(false)
        
    }
    return (
        <SafeAreaView
            style={styles.container}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={Object.assign({ backgroundColor:theme.colors.background }, styles.input)}>
                <Paragraph style={styles.title}>Aqui, voce pode cadastrar um novo gasto que fez recentemente. Primeiramente, diga-nos o título, como o nome do lugar que você gastou.</Paragraph>
                <Caption>ex: Shopping, Mercadão, Feira</Caption>
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
                <Subheading style={styles.title}>Certo, agora dê um título para este gasto e quando você fez.</Subheading>
                <View style={styles.section}>
                    <View style={styles.viewMenu}>
                        <Caption style={{ marginTop: '10%' }}>Categoria</Caption>
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
                            {
                                categories.map(item => {
                                    return <Menu.Item key={item.id}
                                        onPress={() => { setCurrentSelectedCategory(item); hideMenu() }} title={item.name} />
                                })
                            }
                        </Menu>
                    </View>
                    <View style={styles.inputView}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <Checkbox.Item
                                theme={theme}
                                status={todayCheck}
                                label="Hoje"
                                position={"leading"}
                                onPress={() => { setTodayCheck(state => state === "checked" ? "unchecked" : "checked"); 
                                        setDate(to_string_date(new Date())); 
                                        setError(state => ({...state, date:{ message: "", error:false }})) }} />
                        </View>
                        <TextInput
                            keyboardType="decimal-pad"
                            onChangeText={handleChangeDate}
                            disabled={todayCheck === "checked"}
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

    )
}

export default withSnackBarConsumer( withTheme(New));
