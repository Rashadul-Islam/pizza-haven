import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import styles from "../styles/DashboardCard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const DashboardChart = ({ report, text, depends }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: text,
      },
    },
  };

  const labels = report?.map((date) => date._id);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: depends ? "Income" : "Sell",
        data: report?.map((date) => (depends ? date.sum : date.quantity)),
        borderColor: depends ? "rgb(53, 162, 235)" : "rgb(53, 162, 235)",
        backgroundColor: depends
          ? "rgba(53, 162, 235, 0.5)"
          : "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className={styles.chartContainer}>
      {depends ? (
        <Line className={styles.chart} options={options} data={data} />
      ) : (
        <Bar className={styles.chart} options={options} data={data} />
      )}
    </div>
  );
};

export default DashboardChart;
