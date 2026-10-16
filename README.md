# @deepwhale-cn/dsh-mcp-audit

[![Listed on dsh-plugin.org](https://dsh-plugin.org/badges/listed.svg)](https://dsh-plugin.org/plugins/feely0208/dsh-mcp-audit)


**MCP 安全**：未锁定的远端包、明文端点、可执行本地服务 —— MCP 是 agent 的新攻击面。

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

![dsh-mcp-audit 检查报告示例](https://www.deepwhale.org.cn/plugin-assets/dsh-mcp-audit/report.png)

![dsh-mcp-audit 演示模式输出](https://www.deepwhale.org.cn/plugin-assets/dsh-mcp-audit/demo.png)

![dsh-mcp-audit 规则与依据](https://www.deepwhale.org.cn/plugin-assets/dsh-mcp-audit/rules.png)

## 边界

- **只审配置，不审服务本身** —— 服务代码里有什么、会不会外发数据，看不到。
- **锁定版本 ≠ 安全** —— 只防「上游悄悄改」，防不了「这个包本来就恶意」。
- 与 [dsh-dep-audit](https://github.com/feely0208/dsh-dep-audit) 分工：那个查 npm 依赖，这个查 MCP 配置。

本插件是一个工具。使用者必须遵守所在地区法律法规，**对使用本项目造成的任何后果自行承担责任。**

---

## 深鲸网安守护系列（共 31 个）

> 一个插件做一件事。**安全问题是链式的** —— 配套用才完整。

**国内合规** ｜ [等保对照](https://github.com/feely0208/dsh-cn-mlps) · [日志留存](https://github.com/feely0208/dsh-cn-log-retention) · [备案公示](https://github.com/feely0208/dsh-cn-filing) · [用户同意](https://github.com/feely0208/dsh-consent-guard) · [个人信息权利](https://github.com/feely0208/dsh-data-rights) · [未成年人保护](https://github.com/feely0208/dsh-minor-guard) · [影响评估](https://github.com/feely0208/dsh-pipia) · [数据分类分级](https://github.com/feely0208/dsh-data-classify) · [算法备案](https://github.com/feely0208/dsh-algorithm-filing) · [数据出境](https://github.com/feely0208/dsh-cn-data-export) · [国密合规](https://github.com/feely0208/dsh-cn-crypto) · [AI 内容标识](https://github.com/feely0208/dsh-cn-ai-labeling)

**AI 与 Agent 治理** ｜ [AI 输出信任](https://github.com/feely0208/dsh-ai-output-trust) · [外部内容信任](https://github.com/feely0208/dsh-content-trust) · [**MCP 安全**](https://github.com/feely0208/dsh-mcp-audit) · [Agent 权限](https://github.com/feely0208/dsh-agent-scope) · [策略核对](https://github.com/feely0208/dsh-agent-policy) · [可疑指令](https://github.com/feely0208/dsh-phishing-guard)

**数据与凭据** ｜ [敏感数据](https://github.com/feely0208/dsh-data-scan) · [密钥轮换](https://github.com/feely0208/dsh-key-rotate) · [数据留存](https://github.com/feely0208/dsh-data-lifecycle) · [配置审计](https://github.com/feely0208/dsh-env-audit) · [密钥扫描](https://github.com/feely0208/dsh-secret-scan)

**供应链与构建** ｜ [开源许可](https://github.com/feely0208/dsh-license-guard) · [依赖投毒](https://github.com/feely0208/dsh-dep-audit) · [CI 安全](https://github.com/feely0208/dsh-ci-guard) · [工具审查](https://github.com/feely0208/dsh-tool-vet) · [物料清单](https://github.com/feely0208/dsh-sbom)

**权限与应急** ｜ [最小权限](https://github.com/feely0208/dsh-least-privilege) · [告警外发](https://github.com/feely0208/dsh-alert-relay) · [应急证据包](https://github.com/feely0208/dsh-incident-package)

都在 DSH 插件市场（dsh-plugin.org）、npm 和 deepwhale.org.cn/guard.html 上。
