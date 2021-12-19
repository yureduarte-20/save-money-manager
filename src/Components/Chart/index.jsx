import React, { useEffect, useMemo, useReducer, useState } from "react"
import { Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { withTheme, Card, ActivityIndicator, Text } from "react-native-paper"
import WastingRepository from "../../Repository/WastingRepository"
import { subMonths } from "date-fns"
import { date } from "faker/lib/locales/en"

function to_month_year_format(date) {
    return `${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`
}

const screenWidth = Dimensions.get('window').width
const Chart = ({ theme, scale }) => {
    const [loading, setLoading] = useState(true)
    const [wastings, setWastings] = useState([])
    const [data, setData] = useState({
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ]
            }
        ]
    })
    useEffect(() => {
        function sortData(data) {
            let d = data.map(item => item)
            return d.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
        }
        const boot = async () => {
            setLoading(true)
            var _wastings = await WastingRepository.getAllRegiters()  || []
            if (_wastings.length <= 0)
                return;
            var max = new Date(_wastings[0].date);


            if (_wastings.length > 1) {
                _wastings = sortData(_wastings)
                max = _wastings.reduce((a, b) => {
                    let a_date = new Date(a.date), b_date = new Date(b.date)
                    return a_date.getTime() >= b_date.getTime() ? a_date : b_date
                })
            }
            let dates = [max]
            for (let i = 0; i < 3; i++) {
                dates.push(subMonths(dates[dates.length - 1], 1))
            }
            dates.sort((a, b) => a.getTime() - b.getTime())
            const amount = dates.map(label_date => {
                let temp = 0;
                var _label_date = new Date(label_date)
                _wastings.forEach(item => {
                    var date = new Date(item.date)
                    if ( (date.getMonth() === _label_date.getMonth()) && (date.getFullYear() == _label_date.getFullYear()) ) {
                        temp += new Number(item.value)
                    }
                })
                return temp;
            })
            dates = dates.map(item => to_month_year_format(new Date(item)))
            //console.log(dates, amount)
            setWastings(_wastings)
            setData({
                labels: dates,
                datasets: [
                    {
                        data: amount
                    }]
            })
            setLoading(false)
        }
        boot()
    }, [])
    if (wastings.length <= 0)
        return (
            <Card style={{ width: '95%' }}>
                <Card.Content style={{ width: '100%', alignItems: 'flex-start' }}>
                    <Text>Dados Insuficientes para plotar em gráfico</Text>
                </Card.Content>
            </Card>
        )
    return (
        <Card style={{ width: '95%' }}>
            <Card.Content style={{ width: '100%', alignItems: 'flex-start' }}>
                {!loading ?
                    <LineChart
                        width={screenWidth * (scale || 0.8)}
                        data={data}
                        height={220}
                        withInnerLines={false}
                        chartConfig={{
                            backgroundColor: theme.colors.surface,
                            backgroundGradientFrom: theme.colors.surface,
                            backgroundGradientTo: theme.colors.surface,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            propsForBackgroundLines: {

                            },
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            color: (opacity = 1) => `rgba(55, 0, 179, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "2",
                                strokeWidth: "2",
                                stroke: theme.colors.primary
                            },
                        }}
                    /> : <ActivityIndicator />}
            </Card.Content>
        </Card>
    )
}

export default withTheme(Chart)
