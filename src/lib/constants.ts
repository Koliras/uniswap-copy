import { CurrentConfig } from '../config'

export const CHAIN_IDS = {
  'mainnet': 1,
  'polygon': 137,
  'optimism': 10,
}

export let INPUT_CHAIN_ID = CHAIN_IDS[CurrentConfig.chain]
export const INPUT_CHAIN_URL = CurrentConfig.rpc[CurrentConfig.chain]

export const CHAIN_TO_URL_MAP = {
  [CHAIN_IDS.polygon]: CurrentConfig.rpc.polygon,
  [CHAIN_IDS.mainnet]: CurrentConfig.rpc.mainnet,
  [CHAIN_IDS.optimism]: CurrentConfig.rpc.optimism,
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
