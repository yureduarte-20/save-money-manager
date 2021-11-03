import { StyleSheet, StatusBar } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wastingItem: {
        width: '100%',
        //paddingHorizontal:'3%',
        flexDirection: 'column'
    },
    FAB: {
        position: 'absolute',
        margin: 16,
        right: 20,
        bottom: 10,
    }
})

export default styles;