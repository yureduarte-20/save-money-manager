import { StyleSheet,Dimensions } from "react-native";
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container:{
        width:'48%',
        minWidth: width * 0.30,
        margin:2,   
        flexDirection:'row',
        flex:1
    }
})
export default styles