import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface MiniChartProps {
  data: number[];
  labels: string[];
  color: string;
}

const MiniChart = ({ data, labels, color }: MiniChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        fill: true,
        backgroundColor: `${color}33`, // transparent fill
        borderColor: color,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default MiniChart;
