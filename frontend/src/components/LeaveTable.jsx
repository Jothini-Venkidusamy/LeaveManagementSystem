import StatusBadge from './StatusBadge';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

function countDays(from, to) {
  const diff = new Date(to) - new Date(from);
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
}

export default function LeaveTable({ leaves, showStudent = false }) {
  if (!leaves || leaves.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="font-medium text-lg">No leave records found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-base">
        <thead>
          <tr className="border-b-2 border-slate-700/60">
            {showStudent && <th className="text-left text-slate-400 font-semibold py-4 px-6">Student</th>}
            <th className="text-left text-slate-400 font-semibold py-4 px-6">Type</th>
            <th className="text-left text-slate-400 font-semibold py-4 px-6">Duration</th>
            <th className="text-left text-slate-400 font-semibold py-4 px-6">Days</th>
            <th className="text-left text-slate-400 font-semibold py-4 px-6">Reason</th>
            <th className="text-left text-slate-400 font-semibold py-4 px-6">Status</th>
            <th className="text-left text-slate-400 font-semibold py-4 px-6">Applied</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/30">
          {leaves.map((leave) => (
            <tr key={leave._id} className="hover:bg-slate-700/20 transition-colors group">
              {showStudent && (
                <td className="py-4 px-6">
                  <div>
                    <p className="text-white font-medium text-base">{leave.userId?.name || 'N/A'}</p>
                    <p className="text-slate-500 text-sm">{leave.userId?.email}</p>
                  </div>
                </td>
              )}
              <td className="py-4 px-6">
                <span className="capitalize bg-slate-700/50 text-slate-300 px-3 py-1 rounded-lg text-base font-medium">
                  {leave.leaveType}
                </span>
              </td>
              <td className="py-4 px-6 text-slate-300 whitespace-nowrap text-base">
                <span>{formatDate(leave.fromDate)}</span>
                <span className="text-slate-600 mx-2">→</span>
                <span>{formatDate(leave.toDate)}</span>
              </td>
              <td className="py-4 px-6">
                <span className="text-slate-300 font-medium text-base">
                  {countDays(leave.fromDate, leave.toDate)}d
                </span>
              </td>
              <td className="py-4 px-6 text-slate-400 max-w-[180px] truncate text-base">
                {leave.reason}
              </td>
              <td className="py-4 px-6">
                <StatusBadge status={leave.status} />
              </td>
              <td className="py-4 px-6 text-slate-500 whitespace-nowrap text-base">
                {formatDate(leave.appliedDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
