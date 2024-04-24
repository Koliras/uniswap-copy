export enum Chain {
  POLYGON = "polygon",
  MAINNET = "mainnet",
  OPTIMISM = "optimism",
}

interface Config {
  chain: Chain
  rpc: {
    polygon: string
    mainnet: string
    optimism: string
  }
}

export const CurrentConfig: Config = {
  chain: Chain.MAINNET,
  rpc: {
    polygon: 'https://polygon-rpc.com/',
    mainnet: 'https://api.mycryptoapi.com/eth',
    optimism: 'https://mainnet.optimism.io/',
  },
}
