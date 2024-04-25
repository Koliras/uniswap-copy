import { CurrentConfig } from '../config'

export enum CHAIN_IDS {
  mainnet = 1,
  polygon = 137,
  optimism = 10,
}

type ChainInfo = {
  explorer: string
  label: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: 18
  }
  rpcUrl: string
}

export const CHAIN_INFO: { [key: string]: ChainInfo } = {
  [CHAIN_IDS.mainnet]: {
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: CurrentConfig.rpc.mainnet,
  },
  [CHAIN_IDS.polygon]: {
    explorer: 'https://polygonscan.com/',
    label: 'Polygon',
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
    rpcUrl: CurrentConfig.rpc.polygon,
  },
  [CHAIN_IDS.optimism]: {
    explorer: 'https://explorer.optimism.io',
    label: 'Optimism',
    nativeCurrency: { name: 'Optimism', symbol: 'OP', decimals: 18 },
    rpcUrl: CurrentConfig.rpc.optimism,
  },
}

export const METAMASK_URL = 'https://metamask.io/'
