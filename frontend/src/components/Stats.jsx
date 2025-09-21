// CategoryDoughnut.jsx
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import api from "../api"; // adjust path to your api instance
import "./Styles/Stats.css";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import { toast } from "react-toastify";

export default function Stats({token }) {
  const {tripId} = useParams()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        "/api/transactions/trip/" + tripId,
        { headers: { Authorization: "Bearer " + token } }
      );

      const txs = res.data.transactions;

      // ✅ Only take "use" transactions with a category
      const filtered = txs.filter(
        (item) => item.type === "use" && item.category
      );

      // ✅ Group by category and sum values
      const grouped = {};
      filtered.forEach((item) => {
        if (!grouped[item.category]) {
          grouped[item.category] = 0;
        }
        grouped[item.category] += item.amount; // change `amount` if your field name is different
      });

      const total = Object.values(grouped).reduce((a, b) => a + b, 0);

      // ✅ Format data for chart
      const formatted = Object.entries(grouped).map(([category, value]) => ({
        name: category,
        value,
        percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0,
      }));
      setLoading(false);
      setData(formatted);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg||"Something went wrong!")
    }finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (tripId) load();
  }, [tripId]);

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8BC34A",
    "#E91E63",
  ];

  return (
    <>
    <Nav title={"Stats"}></Nav>
    <div className="chart-container">
      {loading && <p className="loading">Loading chart...</p>}
      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <PieChart width={320} height={320}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
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
              {entry.name}: ₹{entry.value} ({entry.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}
