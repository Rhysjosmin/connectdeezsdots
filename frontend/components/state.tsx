import { create } from "zustand";

interface storeType {
  clientID: number;
  setClientID: (id: number) => void;
  selectedPokemon: number;
  selectPokemon: (pokemonID: number) => void;
}
export const usePokiStore = create<storeType>((set) => ({
  selectedPokemon: 0,
  selectPokemon: (pokemonID) => set({ selectedPokemon: pokemonID }),
  clientID: 0,
  setClientID: (id) => set({ clientID: id }),
}));
