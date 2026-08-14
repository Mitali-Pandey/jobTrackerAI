function StatsCard({ label, value }) {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

export default StatsCard;