//   function extractText(data: ServicesData): string {
//     let allText = "";

//     function extractContent(node: ContentNode) {
//       if (node.type === "text" && node.text) {
//         allText += node.text;
//       } else if (node.children) {
//         node.children.forEach((childNode) => extractContent(childNode));
//       }
//     }

//     data.attributes.content.forEach((block) => {
//       if (block.type === "paragraph") {
//         if (block.children) {
//           block.children.forEach((node) => extractContent(node));
//           allText += "\n\n"; // Add newline between paragraphs
//         }
//       } else if (block.type === "list") {
//         if (block.children) {
//           block.children.forEach((listItem) => {
//             if (listItem.type === "list-item" && listItem.children) {
//               listItem.children.forEach((node) => extractContent(node));
//               allText += "\n"; // Add newline between list items
//             }
//           });
//         }
//       }
//     });

//     return allText;
//   }

//   const extractedText = extractText(data);
