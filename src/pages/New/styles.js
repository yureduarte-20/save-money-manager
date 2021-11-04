import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal:20
    },
    title:{
        width:'100%',
        paddingTop:'10%'
    },
    inputView: {
        width:'50%',
        flexDirection:'column'
    },
    input:{
        width:'100%',
        flexDirection:'column',
    },
    buttonMenu:{
        width:'100%',
        minWidth:100,
        marginTop: '10%',
        height: '100%',
    },
    viewMenu:{
        width:'50%',
        alignItems:'center',
       justifyContent:'flex-start',
    },

})
export default styles