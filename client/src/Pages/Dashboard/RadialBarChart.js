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
    PieChart,
    Pie,
    Label,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
} from 'recharts';
import Title from './Title';
import { Box } from '@mui/material';

// Generate Data
function createData(time, amount) {
    return { time, amount };
}


const data = [
    {
        "name": "18-24",
        "uv": 31.47,
        "pv": 2400,
        "fill": "#8884d8"
    },
    {
        "name": "25-29",
        "uv": 26.69,
        "pv": 4567,
        "fill": "#83a6ed"
    },
    {
        "name": "30-34",
        "uv": -15.69,
        "pv": 1398,
        "fill": "#8dd1e1"
    },
    {
        "name": "35-39",
        "uv": 8.22,
        "pv": 9800,
        "fill": "#82ca9d"
    },
    {
        "name": "40-49",
        "uv": -8.63,
        "pv": 3908,
        "fill": "#a4de6c"
    },
    {
        "name": "50+",
        "uv": -2.63,
        "pv": 4800,
        "fill": "#d0ed57"
    },
    {
        "name": "unknow",
        "uv": 6.67,
        "pv": 4800,
        "fill": "#ffc658"
    }
]





export default function Chart() {
    // const theme = useTheme();
    return (
        <Box>
            <RadialBarChart
                width={400}
                height={250}
                innerRadius="10%"
                outerRadius="80%"
                data={data}
                startAngle={290}
                endAngle={20}
            >
                <RadialBar

                    minAngle={20} label={{ fill: '#666' }} background clockWise={true} dataKey='uv' />
                <Legend iconSize={15} width={100} height={200} layout='vertical' verticalAlign='right' align="right" />
                <Tooltip />
            </RadialBarChart>
        </Box>
    );
}