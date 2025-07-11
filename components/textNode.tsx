'use client';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageSquareText } from 'lucide-react';
import Image from 'next/image';


export function TextNode({ data }: any) {
  return (
    <div className="border bg-white rounded shadow text-sm w-40">
      <Handle type="target" position={Position.Left} />
      <div className='bg-[#B3F0e4] text-xs px-1 font-semibold flex justify-between gap-1 items-center'>
        <div className='flex gap-1 items-center'>
          <MessageSquareText className='h-2.5 w-2.5' />
          Send Message
        </div>
        <Image src={"/WhatsApp.svg.webp"} width={12} height={5} alt='' />
      </div>
      <div className='p-1'>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
