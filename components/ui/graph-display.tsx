// "use client";

// import { CosmographProvider, Cosmograph } from "@cosmograph/react";
// import { SearchResult } from "@/app/types/search";

// interface GraphDisplayProps {
//   nodes: SearchResult[];
// }

// export default function GraphDisplay({ nodes }: GraphDisplayProps) {
//   // Map nodes to include required id field
//   const nodesWithId = nodes.map((item) => ({
//     ...item,
//     id: item.doi,
//   }));

//   return (
//     <div className="w-full h-[600px]">
//       <CosmographProvider nodes={nodesWithId} links={[]}>
//         <Cosmograph />
//       </CosmographProvider>
//     </div>
//   );
// }
