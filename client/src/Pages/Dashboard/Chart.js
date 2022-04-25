import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Bar,
    Legend,
    Tooltip,
    CartesianGrid,
    BarChart,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer
} from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}


const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page C', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page D', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page E', uv: 400, pv: 2400, amt: 2400 },
];

export default function Chart() {
    const theme = useTheme();
    return (
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
    );
}