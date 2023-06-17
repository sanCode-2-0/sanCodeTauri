import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
    {
        name: "1",
        fever: 2,
        tb: 0,
        diarrhoea: 5,
    },
    {
        name: "2",
        fever: 0,
        tb: 0,
        diarrhoea: 0,
    },
    {
        name: "3",
        fever: 0,
        tb: 0,
        diarrhoea: 0,
    },
    {
        name: "4",
        fever: 3,
        tb: 7,
        diarrhoea: 8,
    },
    {
        name: "5",
        fever: 50,
        tb: 20,
        diarrhoea: 1,
    },
    {
        name: "6",
        fever: 3,
        tb: 7,
        diarrhoea: 10,
    },
    {
        name: "7",
        fever: 3,
        tb: 6,
        diarrhoea: 8,
    },
    {
        name: "8",
        fever: 6,
        tb: 7,
        diarrhoea: 8,
    },
    {
        name: "9",
        fever: 10,
        tb: 19,
        diarrhoea: 3,
    },
    // Add more data objects for each month
];

export default function RenderLineChart() {
    return (
        <>
            <h4>Graphical Analysis of The Report</h4>
            <ResponsiveContainer width={window.innerWidth} height={window.innerHeight - 100}>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="fever" stroke="#8884d8" />
                    <Line type="monotone" dataKey="tb" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="diarrhoea" stroke="#ff0000" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}




