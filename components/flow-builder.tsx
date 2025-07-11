'use client';
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  Controls,
  Background,
  MiniMap
} from '@xyflow/react';
import { useCallback, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { NodePanel } from './node-panel';
import { SettingsPanel } from './settings-panel';
import { TextNode } from './textNode'
import toast from 'react-hot-toast';



// customized node: setting textNode to a component
const nodeTypes = { textNode: TextNode };


let id = 0;
const getId = () => `node-${id++}`;

export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // to drag and change postion of node
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // when position of edges are cahnged
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // to connect two nodes with edges
  const onConnect = useCallback((params: Connection) => {
    const hasEdgeFromSource = edges.some(e => e.source === params.source);
    if (hasEdgeFromSource) return;

    setEdges((eds) => addEdge(params, eds));
  }, [edges]);

  // whed from node panel a message node is droped on reactflow grid
  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    //to get which node type is doped 
    const type = event.dataTransfer.getData('application/reactflow');

    // to get the center of the reactflow grid so we can add a new node
    const bounds = event.currentTarget.getBoundingClientRect();
    const centerScreen = {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    };

    // setting the positon cordnates of of the new node
    const position = {
      x: centerScreen.x - bounds.left,
      y: centerScreen.y - bounds.top,
    };

    // declareing the new node
    const newNode: Node = {
      id: getId(),
      type,
      position,
      data: { label: `node-${id}` },
    };

    //adding new node to the json
    setNodes((n) => n.concat(newNode));
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // on node click trigerred when we edit text in node and setting panel comes
  const onNodeClick = (event:React.MouseEvent , node: Node) => {
    setSelectedNode(node);
  };

  const updateNodeLabel = (label: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === selectedNode?.id ? { ...n, data: { ...n.data, label } } : n))
    );
    setSelectedNode((prev) => (prev ? { ...prev, data: { ...prev.data, label } } : prev));
  };


  //when save is clicked
  const handleSave = () => {
    // checking is any nodes has no incoming nodes or not but first node will not have incoming edge
    const nodesWithNoIncoming = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });

    // checking all the condition that either no nodes are peresent or nodes with no incoming edge present or not 
    if (nodes.length===0 ||nodes.length > 1 && nodesWithNoIncoming.length > 1) {
      toast.error("Cannnot save Flow")
      return;
    }

    // succes toast displaced it all the nodes have incoming edge
    toast.success('Flow Saved!');

    // right now we only console.log all the node and edges as there is no dastabase connected to store data
    console.log('Saved Flow:', { nodes, edges });
  };

  return (
    <div className="flex h-screen w-screen">
      <NodePanel />
      <div className="flex-1 relative">
        <button onClick={handleSave} className="absolute z-10 right-4 top-4 bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background />
          <MiniMap zoomable  nodeColor={"red"} nodeStrokeWidth={5} className='border shadow-xl border-gray-900'/>
        </ReactFlow>
      </div>
      {selectedNode && (
        <SettingsPanel
          //@ts-expect-error: no check
          label={selectedNode.data.label}
          onChange={updateNodeLabel}
          onClose={() => setSelectedNode(null)} // ✅ Close panel
        />
      )}
    </div>
  );
}
