import { Navigation } from "lucide-react";

interface IssueLocation {
  id: string;
  title: string;
  status: "open" | "in-progress" | "resolved";
  priority: "high" | "medium" | "low";
  coordinates: { x: number; y: number };
}

const mockIssues: IssueLocation[] = [
  {
    id: "1",
    title: "Streetlight repair",
    status: "in-progress",
    priority: "medium",
    coordinates: { x: 25, y: 30 },
  },
  {
    id: "2",
    title: "Pothole fix",
    status: "open",
    priority: "high",
    coordinates: { x: 60, y: 45 },
  },
  {
    id: "3",
    title: "Garbage collection",
    status: "resolved",
    priority: "low",
    coordinates: { x: 40, y: 70 },
  },
  {
    id: "4",
    title: "Water supply",
    status: "open",
    priority: "high",
    coordinates: { x: 75, y: 25 },
  },
  {
    id: "5",
    title: "Traffic signal",
    status: "in-progress",
    priority: "medium",
    coordinates: { x: 20, y: 60 },
  },
];

const getStatusColor = (status: string, priority: string) => {
  if (status === "resolved") return "bg-green-500";
  if (status === "in-progress") return "bg-amber-500";
  if (priority === "high") return "bg-red-500";
  return "bg-blue-500";
};

export default function IssueMap() {
  return (
    <div className="relative">
      {/* Map Container */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg h-80 relative border-2 border-dashed border-blue-200 overflow-hidden">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="text-blue-600">
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Issue Markers */}
        {mockIssues.map((issue) => (
          <div
            key={issue.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{
              left: `${issue.coordinates.x}%`,
              top: `${issue.coordinates.y}%`,
            }}
          >
            <div
              className={`w-4 h-4 rounded-full ${getStatusColor(
                issue.status,
                issue.priority
              )} border-2 border-white shadow-lg hover:scale-125 transition-transform`}
            ></div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">{issue.title}</div>
              <div className="text-gray-300 capitalize">
                {issue.status} • {issue.priority} priority
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        ))}

        {/* Map Center Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Navigation className="w-6 h-6 text-blue-600 opacity-50" />
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg border">
          <div className="text-xs font-medium text-gray-900 mb-2">
            Issue Status
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-gray-600">In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Resolved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Issues List */}
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-gray-900">Recent Issues</h4>
        {mockIssues.slice(0, 3).map((issue) => (
          <div
            key={issue.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor(
                  issue.status,
                  issue.priority
                )}`}
              ></div>
              <span className="text-sm text-gray-900">{issue.title}</span>
            </div>
            <span className="text-xs text-gray-500 capitalize">
              {issue.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
