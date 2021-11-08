import { StyleSheet, StatusBar } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        width:'100%' ,
        flexWrap: 'wrap', 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
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