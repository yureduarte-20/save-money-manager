import { StyleSheet, Dimensions } from "react-native"
 const windowWidth = Dimensions.get('window').width * 0.5
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    searchContainer: {
        width: '100%',
        flexDirection:'column'
    },
    searchButton:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:'3%',
        minHeight:50,
        borderBottomWidth: 0.5,
    },
    listSection:{
        width:'100%',
        marginTop:30,
        flex:1
    }
})
export default styles