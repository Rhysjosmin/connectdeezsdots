"use client";
import { noto_sans, poppins, spaceGrotesk } from "@/components/fonts";
import { usePokiStore } from "@/components/state";
import { config } from "@/config";
import { TypeAttributes } from "@/utils/def";
import { MoveType, PokemonType } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(config.server);

export default function Home({ params }: { params: { gameID: string } }) {
  const router = useRouter();
  const [pokemonData, setPokemonData] = useState([]);
  const { selectPokemon, clientID } = usePokiStore();

  useEffect(() => {
    socket.emit("connectToGame", { gameID: params.gameID, clientID });

    socket.on("pokemonData", (data) => {
      console.log("Received Pokemon Data");
      setPokemonData(data.data);
      selectPokemon(data.data[0].id);
    });

    socket.on("endGame", () => {
      router.push("/");
    });

    return () => {
      socket.off("pokemonData");
      socket.off("endGame");
    };
  }, [params.gameID, clientID, router, selectPokemon]);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <h1
        className={`absolute top-5 right-5 ${poppins.className} font-black text-2xl`}
      >
        Game : {params.gameID}
      </h1>
      <Image
        className="p-8 ml-12 drop-shadow-xl"
        alt=""
        src={"/idle.gif"}
        height={200}
        width={200}
      />
      <div className="absolute bottom-12 right-12">
        <Moves pokemonData={pokemonData} gameID={params.gameID} />
        <Stack pokemonData={pokemonData} />
      </div>
    </main>
  );
}

function Moves({
  pokemonData,
  gameID,
}: {
  pokemonData: Array<PokemonType>;
  gameID: string;
}) {
  const { selectedPokemon, clientID } = usePokiStore();
  const selectedPokemonData = pokemonData.find((x) => x.id === selectedPokemon);

  const moveSelection = (moveData: MoveType) => {
    socket.emit("moveSelection", { ...moveData, clientID, gameID });
  };

  if (!selectedPokemonData || !selectedPokemonData.moves) {
    return <>none</>;
  }

  return (
    <div className="flex flex-col p-2 gap-1 items-end">
      <AnimatePresence mode="popLayout">
        {selectedPokemonData.moves.map((move) => (
          <motion.button
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: 50 }}
            key={move.name}
            onClick={() =>
              moveSelection({
                name: move.name,
                damage: move.damage,
                type: move.type,
              })
            }
            className="bg-neutral-950 text-white p-1 px-2 rounded border border-neutral-800 hover:bg-neutral-900"
          >
            {move.name}
            {TypeAttributes[move.type].emoji}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Stack({ pokemonData }: { pokemonData: Array<PokemonType> }) {
  const { selectPokemon, selectedPokemon } = usePokiStore();
  const numCards = pokemonData.length;

  return (
    <div
      // style={{ rotate: `${numCards * 9}deg` }}
      className="relative w-96 h-96"
    >
      {pokemonData.map((pokemon, i) => (
        <div
          onClick={() => selectPokemon(pokemon.id)}
          key={pokemon.name}
          style={{
            // zIndex: pokemon.id === selectedPokemon ? 10 : 0,
            scale: pokemon.id === selectedPokemon ? 1.1 : 1,
            translate: `-${i * 130}px`,
            // transform: `
            //   scale(${pokemon.id === selectedPokemon ? 1.1 : 1})
            // `,
          }}
          className={`${pokemon.id === selectedPokemon ? "z-10 scale-[1.1]" : "z-0 hover:z-20 "}  absolute transition-all duration-300 origin-bottom right-0 bottom-0`}
        >
          <Card {...pokemon} />
        </div>
      ))}
    </div>
  );
}

function Card({ id, url, attack, name, moves, type }: PokemonType) {
  return (
    <div className="w-52 aspect-[9/12] group z-0 hover:z-10">
      <div
        style={{ transformStyle: "preserve-3d" }}
        className="border overflow-hidden  flex flex-col items-center  shadow-xl justify-center rounded-xl w-52 aspect-[9/12] ease-in-out duration-200 relative bg-neutral-900 text-white text-xs border-neutral-800 transition-all group-hover:-translate-y-12"
      >
        <div
          style={{ backgroundColor: TypeAttributes[type].color }}
          className="p-4
           w-full items-center justify-center flex"
        >
          <Image
            className="drop-shadow-xl"
            src={url}
            alt="pokemon"
            height={80}
            width={80}
          />
        </div>{" "}
        <div className="flex-grow p-3  gap-1 text-xs font-thin flex flex-col text-white/50">
          <h1 className="text-sm font-bold text-white">{name}</h1>
          {moves.map((x) => (
            <div
              className={`grid grid-cols-5 place-items-center  ${spaceGrotesk.className}`}
              key={x.name}
            >
              <div className="place-self-start col-span-3">{x.name} </div>{" "}
              <div
                style={{ color: TypeAttributes[x.type].color }}
                className="capitalize place-self-end"
              >
                {" "}
                {x.type}
              </div>{" "}
              <div className="place-self-end">{x.damage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
