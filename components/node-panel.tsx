'use client';
export function NodePanel() {

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="p-4 w-52 bg-gray-200 border-r">
      <p className="font-extrabold text-xl mb-2">Nodes Panel</p>
      <div
        onDragStart={(e) => onDragStart(e, 'textNode')}
        draggable
        className="cursor-move border px-2 py-1 bg-white shadow-md text-lg rounded-lg "
      >
        Message Node
      </div>
      <p className="text-xs mt-5 font-light">Drag To add in grid</p>
    </aside>
  );
}
