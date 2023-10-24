import React, { useEffect, useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Cluster, hierarchy } from "@visx/hierarchy";
import {
  HierarchyPointNode,
  HierarchyPointLink,
} from "@visx/hierarchy/lib/types";
import { LinkVertical } from "@visx/shape";
import { LinearGradient } from "@visx/gradient";
import { TreeNodeInterface } from "../implementation/redBlackTree";
import { BilingualDictionary } from "@/implementation/bilingualDictionary";
import toast from "react-hot-toast";

const citrus = "#ddf163";
const white = "#ffffff";
export const green = "#79d259";
const aqua = "#37ac8c";
const merlinsbeard = "#f7f7f3";
export const background = "#306c90";

function RootNode({ node }: { node: HierarchyPointNode<TreeNodeInterface> }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.y} left={node.x}>
      <rect
        width={width}
        height={height}
        y={centerY}
        x={centerX}
        fill="url('#top')"
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={background}
      >
        {node.data.key.word}
      </text>
    </Group>
  );
}

function Node({ node }: { node: HierarchyPointNode<TreeNodeInterface> }) {
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;

  return (
    <Group top={node.y} left={node.x}>
      {node.depth !== 0 && (
        <circle
          r={12}
          fill={background}
          stroke={isParent ? white : citrus}
          onClick={() => {
            alert(`clicked: ${JSON.stringify(node.data.key)}`);
          }}
        />
      )}
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={isParent ? white : citrus}
      >
        {node.data.key.word}
      </text>
    </Group>
  );
}

const defaultMargin = { top: 40, left: 0, right: 0, bottom: 40 };

export type DendrogramProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  dictionary: BilingualDictionary;
};

export default function TreeGraph({
  width,
  height,
  margin = defaultMargin,
  dictionary,
}: DendrogramProps) {
  const [showGraph, setShowGraph] = useState(false);
  const [root, setRoot] = useState(dictionary.enToCnTree.root);

  const refreshGraph = () => {
    setRoot(dictionary.cnToEnTree.root);
    toast.loading("Graph Refreshed", { duration: 750 });
    dictionary.enToCnTree.printTree();
  };

  const toggleGraph = () => {
    setShowGraph(!showGraph);
    toast.success("Toggled Graph");
  }

  const togglePrintTree = () => {
    dictionary.enToCnTree.printTree();
    toast.success("Tree has been printed in console log");
  }

  const data = useMemo(() => hierarchy<TreeNodeInterface>(root), [root]);
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  return width < 10 ? null : (
    <>
      <div className="flex-row w-fit mb-4 border border-gray-200 rounded-lg overflow-hidden divide-x">
        <button
          onClick={refreshGraph}
          className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4"
        >
          Refresh Graph
        </button>
        <button
          onClick={toggleGraph}
          className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4"
        >
          Toggle Graph
        </button>
        <button
          className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4"
        >
          Print Preorder
        </button>
        <button
          onClick={togglePrintTree}
          className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4"
        >
          Print Tree
        </button>
      </div>
      {showGraph === true ? (
        <svg width={width} height={height}>
          <LinearGradient id="top" from={green} to={aqua} />
          <rect width={width} height={height} rx={14} fill={background} />
          <Cluster<TreeNodeInterface> root={data} size={[xMax, yMax]}>
            {(cluster) => (
              <Group top={margin.top} left={margin.left}>
                {cluster.links().map((link, i) => (
                  <LinkVertical<
                    HierarchyPointLink<TreeNodeInterface>,
                    HierarchyPointNode<TreeNodeInterface>
                  >
                    key={`cluster-link-${i}`}
                    data={link}
                    stroke={merlinsbeard}
                    strokeWidth="1"
                    strokeOpacity={0.2}
                    fill="none"
                  />
                ))}
                {cluster.descendants().map((node, i) => (
                  <Node key={`cluster-node-${i}`} node={node} />
                ))}
              </Group>
            )}
          </Cluster>
        </svg>
      ) : (
        <h1>Graph hidden</h1>
      )}
      
    </>
  );
}
