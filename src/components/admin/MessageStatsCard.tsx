import { Layers } from "lucide-react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const MessageStatsCard = ({ messages }: any) => {
  const data = [
    {
      name: "Replied",
      value: Math.ceil((messages.replied / messages.total) * 100),
    },
    {
      name: "Pending",
      value: Math.ceil((messages.pending / messages.total) * 100),
    },
  ];
  const COLORS = ["#f59e0b", "#14b8a6"];

  return (
    <div className="flex flex-col justify-between gap-2 bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2.5 rounded-full bg-amber-100`}>
            <Layers className={`text-amber-600`} size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Messages</span>
            <span className="text-xl font-bold text-gray-800">
              {messages.total}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 flex gap-2">
            <span>Replied:</span>
            <span className="font-medium text-green-700">
              {messages.replied}
            </span>
          </p>
          <p className="text-sm text-gray-500 flex gap-2">
            <span> Pending:</span>
            <span className="font-medium text-red-700">{messages.pending}</span>
          </p>
        </div>
      </div>

      <PieChart width={80} height={80}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={40}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default MessageStatsCard;
