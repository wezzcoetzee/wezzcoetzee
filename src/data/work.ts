import { newestFirst, type ShipDate } from './ship-date';

export type WorkItem = {
  title: string;
  role: string;
  date: ShipDate;
  url: string;
};

export const WORK = newestFirst<WorkItem>([
  {
    title: 'Hermes Password Manager',
    role: 'Let Hermes log in with Apple Passwords',
    date: '2026-10',
    url: 'https://github.com/wezzcoetzee/hermes-password-manager',
  },
  {
    title: 'Little Helper',
    role: 'Chrome quality of life extension',
    date: '2026-10',
    url: 'https://github.com/wezzcoetzee/little-helper',
  },
  {
    title: 'Gardena Plugin',
    role: 'Homebridge plugin for Gardena irrigation',
    date: '2026-10',
    url: 'https://github.com/wezzcoetzee/gardena-plugin',
  },
  {
    title: 'Notchivity',
    role: 'Manage subscriptions and PRs from the notch',
    date: '2026-09',
    url: 'https://github.com/wezzcoetzee/notchivity',
  },
  {
    title: 'Eufy Vacuum Plugin',
    role: 'Homebridge plugin for the Eufy L60',
    date: '2026-09',
    url: 'https://github.com/wezzcoetzee/eufy-vacuum-plugin',
  },
  {
    title: 'Tokengochi',
    role: 'macOS menu-bar pet for Claude usage',
    date: '2026-06',
    url: 'https://github.com/wezzcoetzee/tokengochi',
  },
  {
    title: 'SnipSnapp',
    role: 'Copy any page as Markdown',
    date: '2026-02',
    url: 'https://github.com/wezzcoetzee/snipsnapp',
  },
  {
    title: 'TradingView MCP Bridge',
    role: 'AI-assisted chart analysis',
    date: '2026-05',
    url: 'https://github.com/wezzcoetzee/tradingview-mcp',
  },
  {
    title: 'Copy Trade Bot',
    role: 'Mirror wallets on Hyperliquid',
    date: '2026-07',
    url: 'https://github.com/wezzcoetzee/copy-trade-bot',
  },
  {
    title: 'Smart DCA Bot',
    role: 'Signal-weighted DCA into Bitcoin',
    date: '2026-07',
    url: 'https://github.com/wezzcoetzee/smart-dca-bot',
  },
  {
    title: 'Moving Average Bot',
    role: 'Moving-average trading on Hyperliquid',
    date: '2026-07',
    url: 'https://github.com/wezzcoetzee/moving-average-bot',
  },
  {
    title: 'Hyperliquid CLI',
    role: 'Terminal trading for perps',
    date: '2026-05',
    url: 'https://github.com/wezzcoetzee/hyperliquid-cli',
  },
  {
    title: 'GRVT TypeScript SDK',
    role: 'Deno-first exchange SDK',
    date: '2026-01',
    url: 'https://github.com/wezzcoetzee/grvt',
  },
  {
    title: 'Claude Code Config',
    role: 'Rules, hooks, agents, skills',
    date: '2026-01',
    url: 'https://github.com/wezzcoetzee/claude-code-config',
  },
  {
    title: 'Trading Lab',
    role: 'Data-driven trading signals',
    date: '2026',
    url: 'https://tradinglab.vip',
  },
  {
    title: 'Email Verification',
    role: 'Validation at scale, in Go',
    date: '2025-12',
    url: 'https://github.com/wezzcoetzee/email-verification',
  },
  {
    title: 'Solana DCA Bot',
    role: 'Automated DCA into Bitcoin',
    date: '2024',
    url: 'https://github.com/wezzcoetzee/solana-dca-bot',
  },
  {
    title: 'Printable CV',
    role: 'A CV that prints beautifully',
    date: '2023',
    url: 'https://cv.wezzcoetzee.com',
  },
]);
