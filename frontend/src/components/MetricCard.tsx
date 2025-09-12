import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "blue" | "green" | "amber" | "purple" | "red";
}

const colorClasses = {
  blue: "from-blue-100 to-blue-200 text-blue-600",
  green: "from-green-100 to-green-200 text-green-600",
  amber: "from-amber-100 to-amber-200 text-amber-600",
  purple: "from-purple-100 to-purple-200 text-purple-600",
  red: "from-red-100 to-red-200 text-red-600",
};

export default function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-0 p-6">
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-gray-600 text-sm">{title}</p>
          <div className="flex items-center mt-1">
            <span
              className={`text-xs font-medium ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
