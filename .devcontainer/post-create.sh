# .devcontainer/post-create.sh
#!/bin/bash
set -e

npm install -g @anthropic-ai/claude-code
sudo chown -R node:node /home/node/.claude
ln -sf /home/node/.claude/.claude.json /home/node/.claude.json