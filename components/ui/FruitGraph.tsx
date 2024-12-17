// "use client";

// import React, { useCallback, useMemo } from "react";
// import {
//   CosmographProvider,
//   Cosmograph,
//   useCosmograph,
// } from "@cosmograph/react";
// import { Button } from "@/components/ui/button";

// // Define our node and link types
// type FruitNode = {
//   id: string;
//   label: string;
//   color: string;
// };

// type FruitLink = {
//   source: string;
//   target: string;
// };

// // Sample data
// const fruits: FruitNode[] = [
//   { id: "1", label: "Apple", color: "#bc2635" },
//   { id: "2", label: "Pear", color: "#8db600" },
//   { id: "3", label: "Orange", color: "#ffa500" },
//   { id: "4", label: "Lemon", color: "#fff700" },
//   { id: "5", label: "Lime", color: "#32cd32" },
// ];

// const fruitConnections: FruitLink[] = [
//   { source: "1", target: "2" },
//   { source: "1", target: "3" },
//   { source: "2", target: "4" },
//   { source: "3", target: "5" },
//   { source: "4", target: "5" },
// ];

// const FruitGraphInner: React.FC = () => {
//   const { cosmograph, nodes } = useCosmograph<FruitNode, FruitLink>();

//   const handleNodeClick = useCallback((node: FruitNode) => {
//     alert(`Clicked on ${node.label}`);
//   }, []);

//   const nodeStyle = useCallback((node: FruitNode) => {
//     return {
//       fill: node.color,
//       stroke: "#000000",
//       strokeWidth: 2,
//     };
//   }, []);

//   const labelStyle = useCallback((node: FruitNode) => {
//     return {
//       fill: "#000000",
//       fontSize: 12,
//       fontWeight: "bold",
//     };
//   }, []);

//   return (
//     <div className="w-full h-[400px] relative">
//       <Cosmograph
//         backgroundColor="#ffffff"
//         nodeSize={20}
//         linkWidth={2}
//         linkColor="#000000"
//         nodeLabel={(node) => node.label}
//         onNodeClick={handleNodeClick}
//         nodeStyle={nodeStyle}
//         labelStyle={labelStyle}
//       />
//       <div className="absolute top-2 right-2">
//         <Button
//           onClick={() => cosmograph?.zoomToFit()}
//           className="bg-[#bc2635] hover:bg-[#9e1f2b] text-white"
//         >
//           Zoom to Fit
//         </Button>
//       </div>
//     </div>
//   );
// };

// const FruitGraph: React.FC = () => {
//   return (
//     <CosmographProvider nodes={fruits} links={fruitConnections}>
//       <FruitGraphInner />
//     </CosmographProvider>
//   );
// };

// export default FruitGraph;
