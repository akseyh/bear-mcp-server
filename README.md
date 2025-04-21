# Bear MCP Server

This project is a Model Context Protocol (MCP) server that provides access to the [Bear Notes](https://bear.app).

Bear stores notes on SQLite database. This MCP server runs some SQL commands to access this notes.
https://bear.app/faq/where-are-bears-notes-located

![Kariyer notu arama örneği](./assets/career-note-search-example.png)

## Features

- Read notes
- Search notes by text
- List all tags

## Installation

```bash
# Clone the project
git clone https://github.com/akseyh/bear-mcp-server

# Change directory
cd bear-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

## Claude Desktop Config

Update your claude_desktop_config.json

```json
{
  "mcpServers": {
    "bear": {
      "command": "node",
      "args": [".../build/index.js"] // Change it with your path
    }
  }
}
```

When the server is started, the following MCP tools become available:

- `get_notes`: Retrieves all notes
- `get_tags`: Lists all tags
- `get_notes_like`: Searches for notes containing specific text

## Requirements

- Node.js
- Bear note application (macOS)
- Access to Bear database

## License

ISC
