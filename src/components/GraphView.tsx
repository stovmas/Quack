import { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useStore } from '../store';

export function GraphView() {
  const { getGraphData, selectNote } = useStore();
  const graphRef = useRef<any>();

  const graphData = getGraphData();

  useEffect(() => {
    // Auto-zoom to fit all nodes
    if (graphRef.current && graphData.nodes.length > 0) {
      setTimeout(() => {
        graphRef.current?.zoomToFit(400, 50);
      }, 100);
    }
  }, [graphData.nodes.length]);

  const handleNodeClick = (node: any) => {
    if (node.type === 'note') {
      const noteId = node.id.replace('note-', '');
      selectNote(noteId);
    }
  };

  if (graphData.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-400">
          <Mic className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-semibold mb-2">No notes yet</h2>
          <p className="text-lg">Click the microphone button to record your first voice note</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeLabel="label"
        nodeColor="color"
        nodeVal="val"
        nodeCanvasObject={(node: any, ctx) => {
          const label = node.label;
          const fontSize = node.type === 'theme' ? 14 : 10;
          ctx.font = `${fontSize}px Sans-Serif`;

          // Draw node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI);
          ctx.fillStyle = node.color;
          ctx.fill();

          // Draw label
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(label, node.x, node.y);

          // Draw border for theme nodes
          if (node.type === 'theme') {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }}
        nodeCanvasObjectMode={() => 'replace'}
        onNodeClick={handleNodeClick}
        linkColor={() => '#64748b'}
        linkWidth={2}
        d3VelocityDecay={0.3}
        cooldownTime={3000}
        backgroundColor="#0f172a"
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />
    </div>
  );
}

function Mic({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
