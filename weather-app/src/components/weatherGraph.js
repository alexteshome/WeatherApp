import React from 'react';
import { LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from 'reactstrap';

const WeatherGraph = (props) => {
    const cardStyle = {
        boxShadow: '3px 5px black',
        background: 'transparent',
        display: 'inline-flex',
        width: '100%',
        minWidth: '700px'
        
    }

    return (
        
        <Card body className="text-center" style={cardStyle}>        
            <ResponsiveContainer height={200}>
                <LineChart data={props.data}
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