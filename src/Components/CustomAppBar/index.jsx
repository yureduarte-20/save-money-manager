import React from "react"
import { Appbar, withTheme } from"react-native-paper"

function CustomAppBar({ navigation, back, options, theme }) {
    return (
      <Appbar.Header theme={theme}>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={options.headerTitle} />
      </Appbar.Header>
    );
  }
  export default withTheme (CustomAppBar)