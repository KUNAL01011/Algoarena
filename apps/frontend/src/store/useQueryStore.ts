import { create } from "zustand";

interface QueryState {
  page: number;
  setPage: (page:number) => void;
}

export const useQueryStore = create<QueryState>((set, get) => ({
  page: 1,
  setPage: (page:number) => set({ page: page+1 }),
}));