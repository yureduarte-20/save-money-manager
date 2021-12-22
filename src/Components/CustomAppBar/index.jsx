import React from "react"
import { Appbar, withTheme } from "react-native-paper"
import { FontAwesome } from '@expo/vector-icons'
import { Alert } from 'react-native';

function CustomAppBar({ navigation, back, options, theme, route }) {
  return (
    <Appbar.Header theme={theme}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.headerTitle} />
      {route.name !== "Settings" &&
        <Appbar.Action icon={({ color, size, allowFontScaling }) => <FontAwesome
          allowFontScaling={allowFontScaling}
          name="gear"
          size={size}
          color={color} />}
          onPress={() => navigation.navigate('Settings')} />
      }
    </Appbar.Header>
  );
}
export default withTheme(CustomAppBar)