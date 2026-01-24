export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  role: string;
  links: { label: string; url: string }[];
  highlights: string[];
  dateCreated?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'grvt-sdk',
    title: 'GRVT TypeScript SDK',
    tagline: 'Deno-first TypeScript SDK for GRVT Exchange',
    description:
      'A Deno-first, NPM-compatible TypeScript SDK for interacting with the GRVT Exchange. Provides both a high-level CCXT-style client for familiar trading patterns and a raw API client for advanced control. Features full type safety, cross-platform compatibility (Deno, Node.js, Bun, browsers), and supports real-time WebSocket subscriptions for market data.',
    technologies: ['TypeScript', 'Deno', 'Node.js', 'WebSocket', 'EIP-712'],
    role: 'Creator',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/wezzcoetzee/grvt',
      },
      {
        label: 'View Documentation',
        url: 'https://wezzcoetzee.gitbook.io/grvt-docs',
      },
      {
        label: 'View on NPM',
        url: 'https://www.npmjs.com/package/@wezzcoetzee/grvt',
      },
      {
        label: 'View on JSR',
        url: 'https://jsr.io/@wezzcoetzee/grvt',
      }
    ],
    highlights: [
      'Full TypeScript support with typed requests, responses, and enums',
      'Cross-platform: works in Deno, Node.js, Bun, and browsers',
      'CCXT-compatible interface for familiar trading patterns',
      'Real-time orderbook, ticker, and trade subscriptions via WebSocket',
    ],
    dateCreated: '2026-01-24',
  },
  {
    slug: 'email-verification',
    title: 'Email Verification Service',
    tagline: 'High-performance email validation at scale',
    description:
      'A robust email verification service built in Go that validates email addresses at scale. The service performs comprehensive checks including syntax validation, domain verification, MX record lookups, and SMTP verification to determine if an email address is deliverable. Designed for high throughput and reliability, making it ideal for cleaning mailing lists and preventing bounces.',
    technologies: ['Go', 'SMTP', 'DNS', 'MX Records'],
    role: 'Creator',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/wezzcoetzee/email-verification',
      },
    ],
    highlights: [
      'Built in Go for maximum performance and concurrency',
      'Comprehensive validation including syntax, domain, and SMTP checks',
      'Scales to handle large email lists efficiently',
      'Reduces bounce rates and improves deliverability',
    ],
    dateCreated: '2025-12-22',
  },
  {
    slug: 'risk-management',
    title: "What's Risk Management",
    tagline: 'Teaching traders to manage risk before entering trades',
    description:
      'An educational platform designed to help traders understand and implement proper risk management strategies. The site provides calculators, guides, and interactive tools that teach fundamental concepts like position sizing, stop-loss placement, and risk-to-reward ratios. Built to help both novice and experienced traders protect their capital while maximising their potential returns.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    role: 'Creator',
    links: [
      {
        label: 'Visit Site',
        url: 'https://whatsriskmanagement.com',
      },
      {
        label: 'View on GitHub',
        url: 'https://github.com/wezzcoetzee/whats-risk-management',
      },
    ],
    highlights: [
      'Interactive risk calculators for position sizing',
      'Educational content on trading risk management',
      'Responsive design for use on any device',
      'Helps traders develop disciplined trading habits',
    ],
    dateCreated: '2024-03-20',
  },
  {
    slug: 'solana-dca-bot',
    title: 'Solana DCA Bot',
    tagline: 'Automated dollar-cost averaging into Bitcoin on Solana',
    description:
      'An automated trading bot built on the Solana blockchain that implements dollar-cost averaging (DCA) strategy for Bitcoin purchases. The bot executes scheduled buys at regular intervals, helping users accumulate Bitcoin without trying to time the market. Leverages Solana for low transaction fees and fast execution times.',
    technologies: ['Solana', 'Rust', 'TypeScript', 'Web3'],
    role: 'Creator',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/wezzcoetzee/solana-dca-bot',
      },
    ],
    highlights: [
      'Automated DCA strategy execution',
      'Low fees using Solana blockchain',
      'Configurable purchase intervals and amounts',
      'Removes emotional decision-making from investing',
    ],
    dateCreated: '2024-01-10',
  },
  {
    slug: 'solidity-tips-and-tricks',
    title: 'Solidity Tips and Tricks',
    tagline: 'Practical tips for your Solidity learning journey',
    description:
      'An article sharing practical tips and tricks learned along the Solidity development journey. Covers debugging with console.log, pragma version locking, handling Stack Too Deep errors, public variable getters, and working with nested mappings.',
    technologies: ['Solidity', 'Hardhat', 'Smart Contracts', 'Web3'],
    role: 'Author',
    links: [
      {
        label: 'Read Article',
        url: 'https://coinsbench.com/solidity-tips-and-trick-5201d08ce49f',
      },
    ],
    highlights: [
      'Debugging smart contracts with console.log',
      'Why you should lock pragma versions',
      'Solving Stack Too Deep errors',
      'Working with nested mappings',
    ],
    dateCreated: '2023-08-15',
  },
  {
    slug: 'weth-permit-exploit',
    title: 'WETH Permit Exploit',
    tagline: 'Demonstrating ERC20 permit vulnerabilities in DeFi',
    description:
      "A security research project demonstrating a vulnerability in ERC20 token interactions. The exploit targets WETH's lack of a permit function, showing how an attacker can bypass authentication by submitting an empty signature to fraudulently transfer funds through a bank contract's accounting system.",
    technologies: ['Solidity', 'Foundry', 'Security Research', 'DeFi'],
    role: 'Author',
    links: [
      {
        label: 'Read Article',
        url: 'https://coinsbench.com/erc20-exploit-with-weth-1c4ea02a52d8',
      },
      {
        label: 'View on GitHub',
        url: 'https://github.com/wezzcoetzee/weth-permit-exploit',
      },
    ],
    highlights: [
      'Demonstrates real-world DeFi vulnerability',
      'Shows how missing permit validation can be exploited',
      'Built with Foundry testing framework',
      'Educational resource for smart contract security',
    ],
    dateCreated: '2024-11-01',
  },
  {
    slug: 'beth-stack',
    title: 'BETH Stack',
    tagline: 'Hypermedia-driven web apps with great DX',
    description:
      'An opinionated hypermedia-driven web framework that prioritises developer experience while maintaining amazing performance. The BETH stack combines Bun as the runtime, Elysia as the web framework, Turso for serverless SQLite, and HTMX for interactive UIs without heavy JavaScript. Built to demonstrate how modern web apps can be fast, type-safe, and simple.',
    technologies: ['Bun', 'Elysia', 'Turso', 'HTMX', 'TypeScript', 'Drizzle'],
    role: 'Creator',
    links: [
      {
        label: 'Read Article',
        url: 'https://medium.com/@wezzcoetzee/the-beth-stack-c5887a606ed3',
      },
      {
        label: 'View on GitHub',
        url: 'https://github.com/wezzcoetzee/beth-stack',
      },
    ],
    highlights: [
      'Hypermedia-driven architecture using HTMX',
      'End-to-end type safety with Elysia and TypeScript',
      'Serverless edge database with Turso',
      'Blazing fast runtime with Bun',
    ],
    dateCreated: '2024-10-15',
  },
  {
    slug: 'printable-cv',
    title: 'Printable CV',
    tagline: 'A hostable CV that prints beautifully',
    description:
      'A web-based CV solution that can be hosted online and prints to a clean, professional PDF. Built with the idea that your CV should be accessible online while still producing high-quality print output. Features responsive design for web viewing and optimised print styles for when you need a physical copy.',
    technologies: ['Next.js', 'React', 'TypeScript', 'CSS Print Styles'],
    role: 'Creator',
    links: [
      {
        label: 'View CV',
        url: 'https://cv.wezzcoetzee.com',
      },
      {
        label: 'View on GitHub',
        url: 'https://github.com/wezzcoetzee/printable-cv',
      },
    ],
    highlights: [
      'Dual-purpose: web and print optimised',
      'Always up-to-date online version',
      'Professional print output with proper formatting',
      'Open source - fork and customise for your own use',
    ],
    dateCreated: '2023-05-01',
  },
];
