import React, { useMemo, useState } from "react"
import { View } from 'react-native'
import Card from "../Card"
import { withTheme, Text, Paragraph, TextInput } from "react-native-paper"
import { AntDesign } from "@expo/vector-icons"
import { subMonths } from "date-fns"

const LatestWastings = ({ wastings, theme }) => {
    const [w, setW] = useState(wastings.filter(item => {
        let today = new Date()
        let _item = new Date(item.date)
        if ( today.getMonth() == _item.getMonth()  && today.getFullYear() == _item.getFullYear() ) return item;
    }))
    const [ l_w, setL_w ] = useState(wastings.filter(item => {
        let today = new Date()
        let _item = new Date(item.date)
        if ( subMonths(today, 1).getMonth() == _item.getMonth()  &&  subMonths (today, 1).getFullYear() == _item.getFullYear() ) return item;
    }))
    const amount = useMemo(() => {
        let _a = 0
        w.forEach(ele => {
            _a += Number(ele.value)
        })
        return _a
    }, [wastings])
    const l_amount = useMemo( ()=>{
        let _a = 0
        l_w.forEach(ele => {
            _a += Number(ele.value)
        })
        return _a
    },[wastings])
    const porcent = useMemo(()=>{
        let diff = amount - l_amount;
        return (diff/ l_amount) * 100
    }, [l_amount, amount])
    return (
        <Card style={{ minHeight: 100, flexDirection: 'row' }} cardTitle={'Neste mês'}>
            <View style={{ width: '100%', alignItems: 'flex-start', flexDirection:'row', flexWrap:'wrap' }}>
                <Text style={{ color: theme.colors.primary_700, fontSize: 18 }}>{w.length} compras </Text>
                <Paragraph>Total de <Text style={{ color: theme.colors.success }}>{'R$' + String(amount.toFixed(2).replace('.', ','))}</Text>
                </Paragraph>
                <Text style={{ marginLeft:'40%',color:porcent >= 0 ? theme.colors.success : theme.colors.error}}>
                    <AntDesign color={ porcent >= 0 ? theme.colors.success : theme.colors.error} name={ porcent >= 0 ? "arrowup" : "arrowdown"} />
                    {`${ Math.abs( porcent).toFixed(1).replace('.', ',')}%`}
                </Text>
            </View>
        </Card>
    )
}

export default withTheme(LatestWastings)