export interface PokemonType {
  id: number;
  url: string;
  attack: string;
  name: string;
  moves: Array<MoveType>;
}

export interface MoveType {
  name: string;
  damage: number;
  type: "fire" | "dragon" | "grass" | "water";
}
