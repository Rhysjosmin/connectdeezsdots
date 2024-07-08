export type PokemonTypeEnum = "fire" | "dragon" | "grass" | "water";

export interface MoveType {
  name: string;
  damage: number;
  type: PokemonTypeEnum;
}

export interface PokemonType {
  id: number;
  url: string;
  attack: string;
  name: string;
  moves: Array<MoveType>;
  type: PokemonTypeEnum;
}
