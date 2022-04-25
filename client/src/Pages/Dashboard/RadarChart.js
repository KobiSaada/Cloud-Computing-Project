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
    Radar,
    PolarRadiusAxis,
    PolarAngleAxis,
    PolarGrid,
    RadarChart,
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
        "subject": "Math",
        "A": 120,
        "B": 110,
        "fullMark": 150
    },
    {
        "subject": "Chinese",
        "A": 98,
        "B": 130,
        "fullMark": 150
    },
    {
        "subject": "English",
        "A": 86,
        "B": 130,
        "fullMark": 150
    },
    {
        "subject": "Geography",
        "A": 99,
        "B": 100,
        "fullMark": 150
    },
    {
        "subject": "Physics",
        "A": 85,
        "B": 90,
        "fullMark": 150
    },
    {
        "subject": "History",
        "A": 65,
        "B": 85,
        "fullMark": 150
    }
]
export default function Chart() {
    // const theme = useTheme();
    return (
        <Box>
            <RadarChart outerRadius={90} width={400} height={250} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
        </Box>
    );
}