import React from 'react';
import { LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from 'reactstrap';
import dateFormat from 'dateformat'

const WeatherGraph = (props) => {
    const cardStyle = {
        boxShadow: '3px 5px black',
        background: 'transparent',
        display: 'inline-flex',
        width: '100%',
        minWidth: '700px'
        
    }

    let data = []; 
    let date;
    let time;
    let temperature;
    
    for (let i =0; i < 9; i++) {
        date = new Date(props.dataList[i].dt_txt + ' UTC')
        time = dateFormat(date, "H:MM")
        temperature = Math.round(props.dataList[i].main.temp - 273.15);
        data.push({
            time,
            temperature
        })
    };
    return (
        
        <Card body className="text-center" style={cardStyle}>        
            <ResponsiveContainer height={200}>
                <LineChart data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="time" stroke="black">
                    <Label value="Time" position="bottom" />
                </XAxis>
                <YAxis stroke="black" label={{ value: 'Temperature (C)', angle: -90, position: 'left' }} />
                <CartesianGrid stroke="white" strokeDasharray="3 3"/>
                <Tooltip/>
                <Line type="monotone" dataKey="temperature" stroke="purple" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>    
        </Card>
    )

}

export default WeatherGraph;