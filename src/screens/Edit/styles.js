import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    scrollView:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        },
    title_value_view:{
        width:'100%',
        flexDirection:'row',
    },
    container: {
        flex: 1,
    },
    section: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems:'center'
        marginVertical:10
    },
    submitContainer: {
        marginTop: 20,
        width:'100%',
        /* paddingHorizontal:10 */
    },
    submitButton:{
        width: '100%',
        marginBottom: 10
    },
    title: {
        width: '100%',
        paddingTop:20
    },
    inputView: {
        width: '50%',
        flexDirection: 'column',
        
    },
    input: {
        width: '100%',
        paddingHorizontal:10
    },
    buttonMenu: {
        width: '100%',
        minWidth: 150,
       // marginTop: '10%',
        minHeight: 65,
        alignItems:'center',
        justifyContent:'center',
        
     },
    viewMenu: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})

export default styles