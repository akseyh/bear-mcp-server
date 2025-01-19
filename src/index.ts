import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { getNotes, getNotesLike, getTags } from "./utils.js";

const server = new Server(
  {
    name: "mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_notes",
        description: "get all notes",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_tags",
        description:
          "get all note tags. You can search notes by tags with get_note_like",
        inputSchema: {
          type: "object",
          properties: {
            like: {
              type: "string",
              description: "find notes has this string",
            },
          },
        },
      },
      {
        name: "get_notes_like",
        description: "get notes that includes a string like",
        inputSchema: {
          type: "object",
          properties: {
            like: {
              type: "string",
              description: "find notes has this text",
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_notes") {
    const notes = await getNotes();
    return { toolResult: { notes } };
  }

  if (request.params.name === "get_notes_like") {
    const { like } = request.params.arguments as { like: string };
    const notes = await getNotesLike(like);
    return { toolResult: { notes } };
  }

  if (request.params.name === "get_tags") {
    const tags = await getTags();
    return { toolResult: { tags } };
  }

  throw new McpError(ErrorCode.MethodNotFound, "Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
