"use client";
import { usePokiStore } from "@/components/state";
import { config } from "@/config";
import { MoveType, PokemonType } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(config.server);

export default function Home({ params }: { params: { gameID: string } }) {
  const router = useRouter();

  const [pokemonData, setPokemonData] = useState([]);
  const { setClientID, selectPokemon, clientID } = usePokiStore();
  useEffect(() => {
    socket.emit("connectToGame", { gameID: params.gameID, clientID });
  }, []);
  socket.on("pokemonData", (data) => {
    setPokemonData(data.data);
    selectPokemon(data.data[0].id);
    setClientID(data.clientID);
  });
  socket.on("endGame", () => {
    router.push("/");
  });
  return (
    <main className="h-screen w-screen overflow-hidden">
      <h1>Game : {params.gameID}</h1>
      <div className="absolute  bottom-12 right-12">
        <Moves pokemonData={pokemonData} />
        <Stack pokemonData={pokemonData} />
      </div>
    </main>
  );
}

function Moves({ pokemonData }: { pokemonData: Array<PokemonType> }) {
  const { selectedPokemon, clientID } = usePokiStore();
  const selectedPokemonData = pokemonData.filter(
    (x) => x.id == selectedPokemon,
  )[0];
  const moveSelection = (moveData: MoveType) => {
    socket.emit("moveSelection", { ...moveData, clientID });
  };
  if (selectedPokemonData == null || selectedPokemonData.moves == null) {
    return <>none</>;
  }
  return (
    <div className="flex flex-col p-2 gap-1  items-end ">
      {selectedPokemonData.moves.map((move) => (
        <button
          key={move.name}
          onClick={() =>
            moveSelection({
              name: move.name,
              damage: move.damage,
              type: move.type,
            })
          }
          className="bg-neutral-300 p-1 px-2 rounded-xl hover:bg-neutral-200"
        >
          {move.name}
        </button>
      ))}
    </div>
  );
}
function Stack({ pokemonData }: { pokemonData: Array<PokemonType> }) {
  const { selectPokemon } = usePokiStore();
  const numCards = pokemonData.length;
  return (
    <div
      style={{ rotate: `${numCards * 9}deg` }}
      className="relative w-96 h-96  "
    >
      {pokemonData.map((pokemon, i) => (
        <div
          onClick={() => selectPokemon(pokemon.id)}
          key={pokemon.name}
          style={{
            translate: `-${i * 50}px ${i * 20}px`,
            rotate: `-${(i * 100) / numCards}deg`,
          }}
          className="absolute origin-bottom right-0 bottom-0"
        >
          <Card {...pokemon} />
        </div>
      ))}
    </div>
  );
}

function Card({ id, url, attack, name, moves }: PokemonType) {
  return (
    <div className="w-52 aspect-[9/12] group z-0 hover:z-10">
      <div className="border w-52 aspect-[9/12]  ease-in-out duration-200 relative bg-neutral-500 transition-all group-hover:-translate-y-12 ">
        <Image src={url} alt="pokemon" height={300} width={300} />
      </div>
    </div>
  );
}
