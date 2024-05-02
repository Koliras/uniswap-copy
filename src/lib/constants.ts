export enum ChainId {
    mainnet = 1,
    polygon = 137,
    optimism = 10,
}

export type Token = {
    address: string
    name: string
    symbol: string
    decimals: number
    logoURI: string
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

export const CHAIN_INFO: Record<ChainId, ChainInfo> = {
    [ChainId.mainnet]: {
        explorer: 'https://etherscan.io/',
        label: 'Ethereum',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpcUrl: 'https://api.mycryptoapi.com/eth',
    },
    [ChainId.polygon]: {
        explorer: 'https://polygonscan.com/',
        label: 'Polygon',
        nativeCurrency: {
            name: 'Polygon Matic',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrl: 'https://polygon-rpc.com/',
    },
    [ChainId.optimism]: {
        explorer: 'https://explorer.optimism.io',
        label: 'Optimism',
        nativeCurrency: { name: 'Optimism', symbol: 'OP', decimals: 18 },
        rpcUrl: 'https://mainnet.optimism.io/',
    },
}

export const METAMASK_URL = 'https://metamask.io/'
