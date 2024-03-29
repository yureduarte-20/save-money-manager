import React, { useMemo, useState } from "react"
import { View } from 'react-native'
import Card from "../Card"
import { subMonths } from "date-fns"
import { withTheme, Text, Paragraph, TextInput } from "react-native-paper"
import { useWastings } from "../../providers/Wastings"

const LastMonthWasting = ({  theme }) => {
    const { wastings  } = useWastings()
    const [w, setW] = useState(wastings.filter(item => {
        let lastMonth =subMonths( new Date(), 1 )
        let _item = new Date(item.date)
        if (lastMonth.getMonth() == _item.getMonth()  && lastMonth.getFullYear( ) == _item.getFullYear()) return item;
    }))
    const amount = useMemo(() => {
        let _a = 0
        w.forEach(ele => {
            _a += Number(ele.value)
        })
        return _a
    }, [wastings])

    return (
        <Card style={{ minHeight: 100, }} cardTitle={'Mês passado'}>
            <View style={{ width: '100%', alignItems: 'flex-start' }}>
                <Text style={{ color: theme.colors.primary, fontSize: 18 }}>{w.length} compras </Text>
                <Paragraph>Total de <Text style={{ color: theme.colors.error }}>{'R$' + String(amount.toFixed(2).replace('.', ','))}</Text></Paragraph>
            </View>
        </Card>
    )
}

export default withTheme(LastMonthWasting)