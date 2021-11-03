import AsyncStorage from "@react-native-async-storage/async-storage"
import getRandomString from "../utils/random_string"


const tableName = "wasting"
export default {
    addRegister: async ({ date, description, title, value, category }) => {
        let registers = await AsyncStorage.getItem(tableName)
        if(registers)
            registers = []
        registers.push({
            id: getRandomString(10),
            date: date,
            description: description,
            title: title,
            value: value,
            category: category
        })
        await AsyncStorage.setItem(tableName, JSON.stringify(registers))
        return true;
    },
    getAllRegiters: async () => {
        let registers = await AsyncStorage.getItem(tableName)
        if (registers)
            return JSON.parse(registers);
        return []
    },
    clearAll: async () => {
        await AsyncStorage.removeItem(tableName)
        return true;
    },
    getById: async (id) => {
        let registers = await AsyncStorage.getItem(tableName)
        if (result) {
            registers = JSON.parse(registers)
            let result = registers.filter(item => item.id === id)
            return result
        }
        return null
    },
    update: async ({ id, date, description, title, value, category }) => {
        if ((await getById(id)) === null)
            return null
        let registers = await AsyncStorage.getItem(tableName)
        registers = JSON.parse(registers)
        registers = registers.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    date: date,
                    description: description,
                    title: title,
                    value: value,
                    category: category
                }
            }
        })
        await AsyncStorage.setItem(tableName, JSON.stringify(registers))
        return true
    },
    delete: async (id) => {
        if ((await getById(id)) === null)
            return null
        let registers = await AsyncStorage.getItem(tableName) || []
        registers = JSON.parse(registers)
        registers = registers.filter(item => item.id !== id)
        await AsyncStorage.setItem(tableName, JSON.stringify(registers))
        return true
    }
}