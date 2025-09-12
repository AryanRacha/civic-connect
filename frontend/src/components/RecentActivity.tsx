import { Clock, CheckCircle, AlertTriangle, User } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "resolved" | "reported" | "assigned";
  title: string;
  user: string;
  time: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "resolved",
    title: "Streetlight repair completed on MG Road",
    user: "John Smith",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "reported",
    title: "New pothole reported near City Hospital",
    user: "Sarah Johnson",
    time: "4 hours ago",
  },
  {
    id: "3",
    type: "assigned",
    title: "Garbage collection issue assigned to Public Works",
    user: "Admin",
    time: "6 hours ago",
  },
  {
    id: "4",
    type: "resolved",
    title: "Water supply issue fixed in Sector 15",
    user: "Mike Wilson",
    time: "1 day ago",
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "resolved":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "reported":
      return <AlertTriangle className="w-4 h-4 text-blue-600" />;
    case "assigned":
      return <Clock className="w-4 h-4 text-amber-600" />;
    default:
      return <Clock className="w-4 h-4 text-gray-600" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case "resolved":
      return "bg-green-50 border-green-200";
    case "reported":
      return "bg-blue-50 border-blue-200";
    case "assigned":
      return "bg-amber-50 border-amber-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      {mockActivities.map((activity) => (
        <div
          key={activity.id}
          className={`p-4 rounded-lg border ${getActivityColor(
            activity.type
          )} hover:shadow-sm transition-shadow`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {activity.title}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <User className="w-3 h-3" />
                <span>{activity.user}</span>
                <span>•</span>
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
