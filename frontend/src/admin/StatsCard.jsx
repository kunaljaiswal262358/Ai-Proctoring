// StatsCard.jsx
export const StatsCard = ({ title, value, description, color }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-medium text-gray-700 mb-2">{title}</h3>
      <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};
