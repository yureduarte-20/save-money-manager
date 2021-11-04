import React, { useState } from "react"
import { View, SafeAreaView, ScrollView } from "react-native"
import { TextInput, Text, Paragraph, Caption, Menu, HelperText, Checkbox, Button } from "react-native-paper"
import styles from "./styles"
import { TextInputMask } from 'react-native-masked-text'
import categories from '../../Repository/CategoriesRepository'
import { isValid } from "date-fns"
const to_string_date = (date) => `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
const New = ({ navigation, theme }) => {
    const [date, setDate] = useState(to_string_date(new Date()))
    const [active, setActive] = useState(false)
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState(categories[categories.length - 1])
    const [error, setError] = useState(false)
    const [todayCheck, setTodayCheck] = useState("checked")
    const handleChangeDate = (e) => {
        setDate(e)
    }
    const showMenu = () => setActive(true)
    const hideMenu = () => setActive(false)

    return (
        <SafeAreaView
            style={styles.container}>
            
            <ScrollView  style={styles.input}>
            <Paragraph style={styles.title}>Aqui, voce pode cadastrar um novo gasto que fez recentemente. Primeiramente, diga-nos a Categoria e quando você gastou.</Paragraph>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={styles.viewMenu}>

                        <Caption>Categoria</Caption>
                        <Menu
                            visible={active}
                            onDismiss={hideMenu}
                            anchor={
                                <Button style={styles.buttonMenu} onPress={showMenu}>
                                    <Text>{currentSelectedCategory.name}</Text>
                                </Button>}>
                            {
                                categories.map(item => {
                                    return <Menu.Item key={item.id} onPress={() => { setCurrentSelectedCategory(item); hideMenu() }} title={item.name} />
                                })
                            }
                        </Menu>
                    </View>
                    <View style={styles.inputView}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>

                            <Checkbox
                                theme={theme}
                                status={todayCheck}
                                onPress={() => {setTodayCheck(state => state === "checked" ? "unchecked" : "checked"); setDate(to_string_date(new Date()))}} />
                            <Paragraph>Hoje</Paragraph>
                        </View>
                        <TextInput
                            keyboardType="decimal-pad"
                            onChangeText={handleChangeDate}
                            disabled={todayCheck === "checked"}
                            onSubmitEditing={() => {
                                let [day, month, year] = date.split('/')
                                let _d = [year, month, day].join('-')
                                
                                console.log(_d )
                                if (!isValid(new Date(_d)))
                                    setError(true)
                                else
                                    setError(false)
                            }}
                            value={date}
                            error={error}
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
                        <HelperText type={"error"} visible={error}>A Data precisa ser válida!</HelperText>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

export default New;
