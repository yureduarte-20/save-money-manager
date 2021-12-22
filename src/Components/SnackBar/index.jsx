import React from "react"
import { Snackbar as Bar } from "react-native-paper"
import { withSnackBarConsumer } from '../../providers/SnackBarContext'

const SnackBar = ({ show, handleClose, displayText }) => {

    return (
        <Bar
            visible={show}
            action={{
                label: 'OK',
                onPress: () => handleClose()

            }}
            onDismiss={() => { }}>
            {displayText ?? ''}
        </Bar>
    )
}

export default withSnackBarConsumer(SnackBar)