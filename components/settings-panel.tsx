'use client';

import { Separator } from "@radix-ui/react-separator";
import { MoveLeft } from "lucide-react";

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
    <div className="w-80 bg-white border-l flex flex-col transition">
      <div className="flex justify-center w-full relative p-4 border-1 border-[#E1E1E1]">
        <button
          onClick={onClose}
          className="mb-4 underline text-left text-sm absolute left-0"
        >
          <MoveLeft  className="w-4 ml-5 cursor-pointer"/>
        </button>
        <div className="font-bold text-left">
          Message
        </div>
      </div>

      <div className="px-2 py-8 border-1 border-[#E1E1E1]">
        <p className="font-light te mb-4">Text</p>
        <textarea
          className="w-full p-2 border rounded"
          value={label}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter message text"
        />
      </div>
    </div>
  );
}
