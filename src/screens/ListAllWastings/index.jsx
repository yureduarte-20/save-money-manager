import React, { useCallback, useEffect, useMemo, useState } from "react"
import { FlatList, SafeAreaView, View, TouchableOpacity, Button } from "react-native"
import { Caption, List, ActivityIndicator, Divider, Menu, IconButton, Text, Snackbar, DataTable } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation} from "@react-navigation/native"
import styles from "./styles"
import categories from "../../Repository/CategoriesRepository"
import { from_iso_to_string} from "../../utils/dates"
import { useWastings } from "../../providers/Wastings"
const filters = ["Data", "Categoria", "Valor", "Todos"]
const filters_asc_desc = [{ id: 1, name: "Crescente" }, { id: 2, name: "Decrescente" }]

const sortData = (_data, filter, filter_2) => {
    var copy_data = _data.map(item => item);
    switch (filter) {
        case filters[0]:
            if (filter_2.id === filters_asc_desc[0].id)

                return copy_data.sort((a, b) => { return (new Date(a.date).getTime() - new Date(b.date).getTime()) })
            else
                return copy_data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            break;
        case filters[1]:
            return copy_data.filter(item => {
                if (item.category === filter_2.name)
                    return item
            })
            break;
        case filters[2]:
            if (filter_2.id === filters_asc_desc[0].id)
                return copy_data.sort((a, b) => new Number(a.value) - new Number(b.value))
            else
                return copy_data.sort((a, b) => new Number(b.value) - new Number(a.value))
            break;
        default:
            return copy_data;
            break;
    }
}
const ListAllWastings = ({ route }) => {
    const [loading, setLoadding] = useState(false)
    const [wasting_sorted, setSortedWastings] = useState([])
    const [filter, setFilter] = useState("Todos")
    const [visible, setVisible] = useState(false);
    const [visible_2, setVisible_2] = useState(false);

    const { wastings, refresh, setRefresh, setWastings, onRefresh } = useWastings()
    const [selectedSecondOption, setSelectedSecondOption] = useState({ id: 2, name: "Decrescente" })

    const navigation = useNavigation()
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const openMenu_2 = () => setVisible_2(true);
    const closeMenu_2 = () => setVisible_2(false);


    const handleChangeFilter = (item) => {
        if (item === "Categoria") {
            setSelectedSecondOption(categories[categories.length - 1])
            setFilter(item)
        } else {
            setSelectedSecondOption(filters_asc_desc[0])
            setFilter(item)
        }
    }
    useEffect(() => {
        const getAll = () => {
            let _wasting = wastings
            _wasting = sortData(_wasting, filter, selectedSecondOption)
            setSortedWastings(_wasting)
            console.log("List all Use effect called")
        }
        getAll()
    }, [filter, selectedSecondOption])

    const renderSelectedScene = (filter) => {
        switch (filter) {
            case filters[0]:
                return (
                    filters_asc_desc.map(item => <Menu.Item key={item.id} title={item.name} onPress={() => { setSelectedSecondOption(item); closeMenu_2() }} />))
                break;
            case filters[1]:
                return (
                    categories.map(item => <Menu.Item title={<Text>{item.name}</Text>} key={item.id} onPress={() => { setSelectedSecondOption(item); closeMenu_2() }} />)
                )
                break;
            case filters[2]:
                return (
                    filters_asc_desc.map(item => <Menu.Item key={item.id} title={item.name} onPress={() => { setSelectedSecondOption(item); closeMenu_2() }} />)
                )
                break;
            case filters[3]:
                return null;
                break;
            default: return null;
        }
    }
    const handleOnRefresh = useCallback(async () => {
        await onRefresh()
        let _wasting = wastings
        _wasting = sortData(_wasting, filter, selectedSecondOption)
        setSortedWastings(_wasting)
    })
    const renderItems = ({ item }) => {
        return (
            <DataTable.Row key={item.id} onPress={() =>{ navigation.navigate('Edit', { wasting:item }) }}>
                <DataTable.Cell>{item.title}</DataTable.Cell>
                <DataTable.Cell>{ "R$ " + item.value.toFixed(2).replace('.', ',')}</DataTable.Cell>
                <DataTable.Cell>{from_iso_to_string (item.date)}</DataTable.Cell>
            </DataTable.Row>
        )
    }
    if (loading)
        return (
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        )
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<>
                        <TouchableOpacity style={[styles.searchButton]}
                            onPress={openMenu}>
                            <Caption style={{ fontSize: 14 }}>Classificar por: {filter}</Caption>
                            <IconButton icon={({ size, color }) => <MaterialIcons size={size} color={color} name={'sort-by-alpha'} />} />
                        </TouchableOpacity>
                    </>
                    }>
                    {
                        filters.map(item => <Menu.Item key={item} onPress={() => { handleChangeFilter(item); closeMenu() }} title={item} />)
                    }
                </Menu>
                <Menu
                    visible={visible_2}
                    onDismiss={closeMenu_2}
                    anchor={
                        filter !== "Todos" ?
                            <TouchableOpacity onPress={openMenu_2} style={styles.searchButton}>
                                <Caption style={{ fontSize: 14 }}>Ordernar : {selectedSecondOption.name}</Caption>
                                <IconButton icon={({ size, color }) => <MaterialIcons size={size} color={color} name={'sort-by-alpha'} />} />
                            </TouchableOpacity>
                            : null
                    }>
                    {
                        renderSelectedScene(filter)
                    }
                </Menu>
                <Divider />
            </View>
           {/*  <List.Section style={styles.listSection}>
                <List.Subheader > Gastos </List.Subheader>
                <FlatList
                    refreshing={refresh}
                    data={wasting_sorted}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ width: '100%' }}
                    onRefresh={handleOnRefresh} />
                </List.Section> */}

            <DataTable style={{ marginTop:20 }}>
                <DataTable.Header>
                    <DataTable.Title>Título</DataTable.Title>
                    <DataTable.Title>Valor</DataTable.Title>
                    <DataTable.Title>Data</DataTable.Title>
                </DataTable.Header>
                <FlatList
                    refreshing={refresh}
                    data={wasting_sorted}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ width: '100%' }}
                    onRefresh={handleOnRefresh} />
            </DataTable>
        </SafeAreaView>
    )
}

export default ListAllWastings;