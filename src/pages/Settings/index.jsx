import React from "react"
import { SafeAreaView,View } from "react-native"
import { Button,List, Modal, Paragraph, Portal, withTheme } from "react-native-paper"
import { withSnackBarConsumer } from "../../providers/SnackBarContext"
import WastingRepository from "../../Repository/WastingRepository"
import { styles } from "./styles"

const Settings = ({ handleOpen, theme, navigation }) => {
    const [visible, setVisible] = React.useState(false)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const handleSubmitClearAll = async () => {
        hideModal();
        await WastingRepository.clearAll();
        handleOpen('Registros Apagados')
        navigation.reset({
            routes: [
                {
                    name: 'HomePage', params: {
                        tab_index: 0
                    }
                }]
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <List.Section >
                <List.Item
                    title="Restaurar para padrão"
                    onPress={showModal}
                    description="Excluir todos os registros, inclusive seus registros de compras" />
            </List.Section>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerModalStyle}>
                    <Paragraph>Tem certeza que deseja apagar todos os registros?</Paragraph>
                    <View style={{width:'100%', flexDirection:'row-reverse', marginTop:8}}>
                        <Button mode="contained" style={{paddingHorizontal:20}} onPress={handleSubmitClearAll}>SIM</Button>
                        <Button mode="text" style={{paddingHorizontal:20}} onPress={hideModal}>NÂO</Button>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaView>
    )
}

export default withSnackBarConsumer(withTheme(Settings))