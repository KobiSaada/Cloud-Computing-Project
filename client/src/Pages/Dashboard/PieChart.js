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
    ResponsiveContainer
} from 'recharts';
import Title from './Title';
import { Box } from '@mui/material';

// Generate Data
function createData(time, amount) {
    return { time, amount };
}


const data01 = [
    {
        "name": "Group A",
        "value": 400
    },
    {
        "name": "Group B",
        "value": 300
    },
    {
        "name": "Group C",
        "value": 300
    },
    {
        "name": "Group D",
        "value": 200
    },
    {
        "name": "Group E",
        "value": 278
    },
    {
        "name": "Group F",
        "value": 189
    }
];
const data02 = [
    {
        "name": "Group A",
        "value": 2400
    },
    {
        "name": "Group B",
        "value": 4567
    },
    {
        "name": "Group C",
        "value": 1398
    },
    {
        "name": "Group D",
        "value": 9800
    },
    {
        "name": "Group E",
        "value": 3908
    },
    {
        "name": "Group F",
        "value": 4800
    }
];


export default function Chart() {
    // const theme = useTheme();
    return (
        <Box>
            <PieChart width={250} height={220}>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            </PieChart>
        </Box>
    );
}