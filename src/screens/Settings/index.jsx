import React from "react"
import { SafeAreaView, View } from "react-native"
import { Button, List, Modal, Paragraph, Portal, withTheme, Switch } from "react-native-paper"
import { useThemeSelector } from "../../providers/PaperProvider"
import { withSnackBarConsumer } from "../../providers/SnackBarContext"
import WastingRepository from "../../Repository/WastingRepository"
import { styles } from "./styles"

const Settings = ({ handleOpen, theme, navigation }) => {
    const [visible, setVisible] = React.useState(false)
    const [isSwitchOn, setIsSwitchOn] = React.useState(theme.name === 'dark');
    const { changeTheme } = useThemeSelector()
    const onToggleSwitch = () => {
        changeTheme(theme.name === 'dark' ? 'default' : 'dark')
        setIsSwitchOn(!isSwitchOn)
    };
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
        <SafeAreaView style={Object.assign({ backgroundColor: theme.colors.background }, styles.container)}>
            <List.Section >
                <List.Item
                    title="Restaurar para padrão"
                    onPress={showModal}
                    description="Excluir todos os registros, inclusive seus registros de compras" />
                <List.Item
                    title="Tema Escuro"
                    onPress={onToggleSwitch}
                    description="Alterar para tema escuro"
                    right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />} />
            </List.Section>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerModalStyle}>
                    <Paragraph>Tem certeza que deseja apagar todos os registros?</Paragraph>
                    <View style={{ width: '100%', flexDirection: 'row-reverse', marginTop: 8 }}>
                        <Button mode="contained" style={{ paddingHorizontal: 20 }} onPress={handleSubmitClearAll}>SIM</Button>
                        <Button mode="text" style={{ paddingHorizontal: 20 }} onPress={hideModal}>NÂO</Button>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaView>
    )
}

export default withSnackBarConsumer(withTheme(Settings))