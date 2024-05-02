import { create } from "zustand";
import { Token } from "../constants";

interface TokensState {
  tokenIn: Token | null;
  setTokenIn: (newToken: Token | null) => void;
  tokenOut: Token | null;
  setTokenOut: (newToken: Token | null) => void;
  flipTokens: () => void;
}

export const useTokensStore = create<TokensState>()((set) => ({
  tokenIn: null,
  setTokenIn: (newToken: Token | null) => set({ tokenIn: newToken }),
  tokenOut: null,
  setTokenOut: (newToken: Token | null) => set({ tokenOut: newToken }),
  flipTokens: () =>
    set((prev) => ({ tokenIn: prev.tokenOut, tokenOut: prev.tokenIn })),
}));
