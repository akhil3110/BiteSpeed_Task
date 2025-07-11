"use client"

import FlowBuilder from '@/components/flow-builder';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return <>
    <Toaster />
    <FlowBuilder />
  </>;
}

// import { Button } from '@/components/ui/button';
// import { ReactFlow, Background, Controls, applyNodeChanges, NodeChange } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import { useState } from 'react';

// export default function App() {
//   const initialNodes = [
//   {
//     id: 'n1',
//     position: { x: 0, y: 0 },
//     data: { label: 'Node 1' },
//     type: 'input',
//   },
//   {
//     id: 'n2',
//     position: { x: 100, y: 100 },
//     data: { label: 'Node 2' },
//   },
// ];

//   const [nodes,setNodes] = useState(initialNodes)

//   const addNode = () => {

//      const newNode = {
//       id: `n${nodes.length + 1}`,
//       position: { x: Math.random() * 250, y: Math.random() * 250 },
//       data: { label: `Node ${nodes.length + 1}` },
//     };
//     setNodes([...nodes, newNode]);
//   }

//   const onNodesChange = (changes: NodeChange[]) => {
//     //@ts-expect-error some typscript error
//     setNodes((nds) => applyNodeChanges(changes, nds));
//   };

//   return (
//     <div style={{ height: '100vh', width: '100%' }}>
//       <div className=' absolute right-5 top-5 z-10'>
//         <Button onClick={addNode}> ADD Node</Button>
//       </div>
//       <ReactFlow  
//         nodes={nodes}
//         edges={[]}
//         onNodesChange={onNodesChange}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// }