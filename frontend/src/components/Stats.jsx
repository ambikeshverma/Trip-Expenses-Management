// CategoryDoughnut.jsx
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import "./Styles/Stats.css";

export default function Stats({token}) {
  const [data, setData] = useState([]);

  // Example: Fetch from backend API
//   useEffect(() => {
//     fetch("http://localhost:5000/api/categories") // Replace with your API
//       .then((res) => res.json())
//       .then((result) => {
//         const total = result.reduce((sum, item) => sum + item.value, 0);
//         const formatted = result.map((item) => ({
//           name: item.category,
//           value: item.value,
//           percentage: ((item.value / total) * 100).toFixed(1),
//         }));
//         setData(formatted);
//       });
//   }, []);

  const COLORS = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#8BC34A", "#E91E63",
  ];

  return (
    <div className="chart-container">
      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </motion.div>

      {/* Legend */}
      <div className="legend">
        {data.map((entry, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="legend-text">
              {entry.name}: {entry.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
