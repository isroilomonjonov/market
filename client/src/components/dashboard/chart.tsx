import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StasticsType } from './../../../interfaces/statistics-interface';

// Sample data

// Colors for the pie slices
const COLORS = ['#0088FE', '#ff0000', '#00C49F'];

const CustomPieChart = ({ statistics }: { statistics: StasticsType }) => {
    const data = [
        { name: 'Barcha buyurtmalar', value: statistics.allOrders },
        { name: 'Bekor qilingan buyurtmalar', value: statistics.allOrdersStatusCanceled },
        { name: 'Tugatilgan buyurtmalar', value: statistics.allOrdersStatusCompleted },
    ];
    if (statistics.allOrders === 0) {
        return (
            <div className="no-data-message">
                <h2>Hech qanday buyurtmalar yo`q</h2>
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
