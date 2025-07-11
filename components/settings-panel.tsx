'use client';

export function SettingsPanel({
  label,
  onChange,
  onClose,
}: {
  label: string;
  onChange: (value: string) => void;
  onClose: () => void;
}) {
  return (
    <aside className="p-4 w-64 bg-gray-100 border-l flex flex-col">
      <button
        onClick={onClose}
        className="mb-4 text-blue-600 underline text-left text-sm"
      >
        ← Back to Nodes Panel
      </button>

      <p className="font-bold mb-2">Settings</p>
      <textarea
        className="w-full p-2 border rounded"
        value={label}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter message text"
      />
    </aside>
  );
}
