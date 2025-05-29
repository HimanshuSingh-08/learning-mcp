import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { placeOrder } from "./trade";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("factorial-number",
  { a: z.number()},
  async ({ a }) => {
    let ans = 1;
    for(let i = 2; i <= a ;i++){
      ans *=i;
    }
    return {
    content: [{ type: "text", text: String(ans) }]
    }
  }
);


// Add Buy Tool

server.tool("buy-stock",
  { stock: z.string(), qty : z.number()},
  async ({ stock , qty }) => {
    placeOrder(stock , qty , "BUY");
    return {
    content: [{ type: "text", text: "Stock has been bought" }]
    }
  }
);

// Add Sell Tool
server.tool("Sell-stock",
  { stock: z.string(), qty : z.number()},
  async ({ stock , qty }) => {
    placeOrder(stock , qty , "SELL");
    return {
    content: [{ type: "text", text: "Stock has been Sold" }]
    }
  }
);


// Add an additional tool for check if its prime

// server.tool("check if prime",
//   {a : z.number()},
//    async ({ a }) => (
//     {
//     content: [{ type: "text", text: String(a ) }]
//   })
// )


// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);