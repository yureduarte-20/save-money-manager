import React from "react"
import { StyleProp } from "react-native"
import { Card as PaperCard, Title, withTheme } from "react-native-paper"
import _styles from "../../Components/Card/styles"
const Card = (props) => {
    const { children, theme, style , cardTitle  } = props
    return (
        <PaperCard theme={theme} style={Object.assign(style, _styles.container)}>
            <PaperCard.Title
            title={cardTitle} />
            <PaperCard.Content>
                {children}
            </PaperCard.Content>
        </PaperCard>
    )
}

export default withTheme (Card)
