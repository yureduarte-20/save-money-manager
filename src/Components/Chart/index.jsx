import React, { useEffect, useMemo, useState } from "react"
import { Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { withTheme, Card } from "react-native-paper"

function to_month_year_format(date) {
    return `${date.getMonth() + 1}/${date.getFullYear()}`
}
function sub(d) {
    let [_month, _year] = d.split('/')
    let month = new Number(_month)
    let year = new Number(_year)
    if (month <= 1) {
        month = 12
        year = year - 1
    } else {
        month = month - 1
    }
    return `${month < 10 ? '0' + month : month}/${year}`
}
function sortData(data) {
    let d = data.map(item => item)
    return d.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
}

const screenWidth = Dimensions.get('window').width
const Chart = ({ wastings, theme, scale }) => {
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
        const boot = () => {
            let a = [];
            let _w = []
            let copy_wasting = sortData(wastings)
            copy_wasting.forEach(item => {
                let d = new Date(item.date)
                if (!a.includes(to_month_year_format(d))) {
                    a.push(to_month_year_format(d));
                }
                _w.push({
                    ...item,
                    _month: to_month_year_format(d)
                })
            })
            a.sort((b, a) => a.localeCompare(b))
            if (a.length < 4) {
                let diff = 4 - a.length;
                var prev = a[a.length - 1]
                for (let i = diff; i > 0; i--) {
                    a.push(sub(prev))
                    prev = a[a.length - 1]
                }

            } else if (a.length > 4) {
                a = a.slice(a.length - 5, a.length - 1)
            }
            a.sort((a, b) => a.localeCompare(b))
            var temp = []
            a.forEach(month => {
                var value = 0;
                _w.forEach(wasting => {
                    if (month === wasting._month) {
                        value += new Number(wasting.value)
                    }
                })
                temp.push(value)
                value = 0
            })
            setData({
                labels: a,
                datasets: [
                    { data: temp }
                ]
            })
            return 
        }
        boot()
    }, [])

    return (
        <Card style={{ width: '95%' }}>
            <Card.Content style={{ width: '100%', alignItems: 'flex-start' }}>
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
                />
            </Card.Content>
        </Card>
    )
}

export default withTheme(Chart)
