import React, { useState, useRef, useEffect } from "react"
import { View, KeyboardAvoidingView, TouchableOpacity } from "react-native"
import { TextInput, Text, Headline, Paragraph, Caption, Menu} from "react-native-paper"
import styles from "./styles"
import categories from '../../Repository/CategoriesRepository'
const to_string_date = (date) => `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
const New = ({ navigation }) => {
    const [date, setDate] = useState()
    const [active, setActive] = useState(false)
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState(categories[ categories.length - 1 ])
    const handleChangeDate = (e) => {
        let tmp = ""
        console.log(e.length)
        if (e.length == 2) {
            tmp += e + '/'
        } else if (e.length == 5) {
            tmp += e + '/'
        } else if (e.length >= 8) {
            tmp = e.substring(0, 10)
        } else {
            tmp = e
        }
        setDate(tmp)
    }
    const showMenu = () => setActive(true)
    const hideMenu = () => setActive(false)
    useEffect(() => {
        setDate(to_string_date(new Date()))
        
    }, [])
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={'padding'}>
            <View style={styles.title}>
                <Headline>Novo Gasto</Headline>
            </View>

            <View style={styles.input}>
                <Paragraph>Aqui, voce pode cadastrar um novo gasto que fez recentemente</Paragraph>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal:20 }}>
                    <Menu
                        visible={active}
                        onDismiss={hideMenu}
                        anchor={ 
                                <TouchableOpacity style={styles.buttonMenu} onPress={showMenu}>
                                    <Text>{currentSelectedCategory.name}</Text>
                                    
                                </TouchableOpacity>}>
                        {
                            categories.map(item => {
                                return <Menu.Item key={item.id} onPress={() => { setCurrentSelectedCategory(item); hideMenu() }} title={item.name} />
                            })
                        }
                    </Menu>

                    <TextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChangeDate}
                        value={date}
                    />
                </View>
                <Caption>Digite a data de quando ocorreu

                </Caption>
            </View>
        </KeyboardAvoidingView>


    )
}

export default New;
