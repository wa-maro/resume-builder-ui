import { Layers } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MessageStats {
  total: number;
  replied: number;
  pending: number;
}

interface DashboardStats {
  messages: MessageStats;
  trends: {
    day: string;
    replied: number;
    pending: number;
  }[];
}

interface Props {
  stats: DashboardStats;
}

const MessageStatsChart: React.FC<Props> = ({ stats }) => {
  const lineData = stats.trends; // Array of { day, replied, pending }

  return (
    <div className="flex flex-col justify-between gap-4 bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
      {/* Header: summary stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-amber-100">
            <Layers className="text-amber-600" size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Messages</span>
            <span className="text-xl font-bold text-gray-800">
              {stats.messages.total}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 flex gap-2">
            <span>Replied:</span>
            <span className="font-medium text-green-700">
              {stats.messages.replied}
            </span>
          </p>
          <p className="text-sm text-gray-500 flex gap-2">
            <span>Pending:</span>
            <span className="font-medium text-red-700">
              {stats.messages.pending}
            </span>
          </p>
        </div>
      </div>

      {/* Line chart: trends */}
      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <LineChart
            data={lineData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="replied"
              stroke="#22c55e"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MessageStatsChart;
