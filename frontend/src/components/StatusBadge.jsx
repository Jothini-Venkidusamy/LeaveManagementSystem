const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
    dot: 'bg-yellow-400',
  },
  teacher_approved: {
    label: 'Teacher Approved',
    className: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    dot: 'bg-blue-400',
  },
  hod_approved: {
    label: 'HOD Approved',
    className: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    dot: 'bg-purple-400',
  },
  approved: {
    label: 'Approved',
    className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-500/15 text-red-300 border-red-500/30',
    dot: 'bg-red-400',
  },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span className={`inline-flex items-center gap-2 text-base font-semibold px-4 py-2 rounded-full border ${config.className}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      {config.label}
    </span>
  );
}
