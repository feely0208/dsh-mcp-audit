# @deepwhale-cn/dsh-mcp-audit

[![Listed on dsh-plugin.org](https://dsh-plugin.org/badges/listed.svg)](https://dsh-plugin.org/plugins/feely0208/dsh-mcp-audit)


**关键词**：MCP 安全 · MCP 审计 · 模型上下文协议 · MCP 配置 · 未锁版本 · MCP 投毒 · MCP 服务
**Keywords**: MCP security · MCP audit · model context protocol · server security · MCP supply chain
**MCP 服务安全** —— 审计 MCP 配置里的未锁定远端包、明文端点、可执行本地服务。

## 不装它会怎样

你的 MCP 配置写的是：

```json
"filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem"] }
```

看起来很正常。但 `npx -y` 意味着**每次启动都拉最新版** ——
上游某个版本被投毒，你开着 agent 用文件工具的那一刻就在执行它。
而且你**没有任何版本记录可以回滚**。

锁成 `@2024.11.0` 就能防住这一类。

## 它查什么

| 级别 | 内容 |
|---|---|
| 🔴 高 | `npx -y` 未锁版本 · 明文 http:// 端点 |
| 🟡 中 | 指向本地可执行文件/脚本 |
| 🟢 低 | 仓库里找不到 MCP 配置 |

## 为什么 MCP 特别值得查

**MCP 服务拿到的权限通常比一般插件大得多** —— 能读写文件、执行工具、访问账号。
而它的配置常常散落在个人机器上、不在版本控制里、没人审查过。

**给 agent 装 MCP 服务，等于给它开门。**

## 安装

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-mcp-audit
# 或纯 CLI
npx @deepwhale-cn/dsh-mcp-audit
```

## 用法

```bash
dsh-mcp-audit --demo          # 看检出效果
dsh-mcp-audit --list-rules    # 列出规则和依据
dsh-mcp-audit --html r.html
```

![dsh-mcp-audit 的检查报告示例](https://www.deepwhale.org.cn/plugin-assets/dsh-mcp-audit/report.png)

## 边界

- **只审配置，不审服务本身** —— 服务代码里有什么、会不会外发数据，看不到。
- **锁定版本 ≠ 安全** —— 只防「上游悄悄改」，防不了「这个包本来就恶意」。
- 与 [dsh-dep-audit](https://github.com/feely0208/dsh-dep-audit) 分工：那个查 npm 依赖，这个查 MCP 配置。

本插件是一个工具。使用者必须遵守所在地区法律法规，**对使用本项目造成的任何后果自行承担责任。**

## License

MIT © 深鲸 DeepWhale
