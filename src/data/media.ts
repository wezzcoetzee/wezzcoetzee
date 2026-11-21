import { newestFirst, type ShipDate } from './ship-date';

export type MediaItem = {
  title: string;
  source: string;
  date: ShipDate;
  url: string;
};

export const MEDIA = newestFirst<MediaItem>([
  {
    title: 'The BETH Stack',
    source: 'Medium',
    date: '2024-01',
    url: 'https://medium.com/@wezzcoetzee/the-beth-stack-c5887a606ed3',
  },
  {
    title: 'ERC20 Exploit with WETH',
    source: 'CoinsBench',
    date: '2024-01',
    url: 'https://coinsbench.com/erc20-exploit-with-weth-1c4ea02a52d8',
  },
  {
    title: 'Solidity Tips and Tricks',
    source: 'CoinsBench',
    date: '2024-04',
    url: 'https://coinsbench.com/solidity-tips-and-trick-5201d08ce49f',
  },
  {
    title: "Spark Your Imagination: Eneco's Virtual Power Plant",
    source: 'GOTO 2024',
    date: '2024-06',
    url: 'https://www.youtube.com/watch?v=_8VDvfFzHAk',
  },
]);
