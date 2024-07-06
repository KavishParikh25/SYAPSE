import React, { useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  MiniMap,
  Handle,
  ReactFlowProvider,
  updateEdge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

const SchemaMapping = ({ mappings, override, sourceColumns, targetColumns }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const sourceNodes = sourceColumns.map((col, index) => ({
      id: `source-${index}`,
      data: { label: col.columnName },
      position: { x: 100, y: index * 50 },
    }));

    const targetNodes = targetColumns.map((col, index) => ({
      id: `target-${index}`,
      data: { label: col.columnName },
      position: { x: 400, y: index * 50 },
    }));

    const savedMappings = JSON.parse(localStorage.getItem('Mappings')) || [];
    const newEdges = savedMappings.map((map, index) => ({
      id: `edge-${index}`,
      source: map.source,
      target: map.target,
      animated: true,
      style: { stroke: override ? 'red' : 'green' },
      label: `Mapping ${index + 1}`,
    }));

    setNodes([...sourceNodes, ...targetNodes]);
    setEdges(newEdges);
  }, [mappings, override, sourceColumns, targetColumns]);

  useEffect(() => {
    localStorage.setItem('Mappings', JSON.stringify(edges));
  }, [edges]);

  const onConnect = (params) => {
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
  };

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setEdges((eds) => updateEdge(oldEdge, newConnection, eds));

  return (
    <div style={{ height: '100%' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          deleteKeyCode={46} /* 'delete'-key */
          snapToGrid={true}
          snapGrid={[15, 15]}
          nodeTypes={{ special: CustomNode }}
          edgeTypes={{ special: CustomEdge }}
          style={{ height: '100%' }}
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#fff' }}>
      <Handle type="target" position="left" />
      <strong>{data.label}</strong>
      <Handle type="source" position="right" />
    </div>
  );
};

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, style }) => {
  return (
    <g>
      <path
        id={id}
        className="react-flow__edge-path"
        d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
        style={style}
      />
      <text>
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {style.stroke === 'red' ? 'Overridden' : 'Active'}
        </textPath>
      </text>
    </g>
  );
};

export default SchemaMapping;
