import React from "react"
import { Card as PaperCard, Title, withTheme } from "react-native-paper"
import styles from "../../Components/Card/styles"
const Card = (props) => {
    const { children, theme, style, cardTitle  } = props
    return (
        <PaperCard theme={theme} style={{...style, ...styles.container}}>
            <PaperCard.Title
            title={cardTitle} />
            <PaperCard.Content>
                {children}
            </PaperCard.Content>
        </PaperCard>
    )
}
export default withTheme (Card)
