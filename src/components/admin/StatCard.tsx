import MiniChart from "./MiniChart";

const StatCard = ({
  title,
  icon: Icon,
  color = "blue",
  stats,
  chartColor,
}: any) => {
  return (
    <div className="flex flex-col justify-between gap-2 bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-full bg-${color}-100`}>
            <Icon className={`text-${color}-600`} size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{title}</span>
            <span className="text-xl font-bold text-gray-800">
              {stats.total}
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-500">Active: {stats.active}</span>
      </div>

      <div className="h-20">
        <MiniChart
          data={stats.trend || [25, 13, 38, 22, 27, 34, 29]}
          labels={
            stats.labels || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          }
          color={chartColor}
        />
      </div>
    </div>
  );
};

export default StatCard;
