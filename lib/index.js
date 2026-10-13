import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';

export const { name, inject, apply } = createPlugin({
  name: 'mcp-audit',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/mcp-audit.md',
  binFile: 'bin/cli.mjs',
  description: '审计 MCP 配置：未锁定的远端包、明文端点、可执行本地服务 —— MCP 是 agent 的新攻击面',
  whenToUse: 'TODO：写清什么时候该用（用户会说的话也列上）',
});
