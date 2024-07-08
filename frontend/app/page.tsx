"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://172.20.50.109:5969");

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    socket.on("pokemonData", (data) => {
      setPokemonData(data);
    });
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <div className="absolute  bottom-12 right-12">
        <div className="absolute left-0 bottom-0 ">attack 1</div>
        <Stack pokemonData={pokemonData} />
      </div>
    </main>
  );
}

function Stack({ pokemonData }: { pokemonData: any[] }) {
  const numCards = pokemonData.length;
  return (
    <div
      style={{ rotate: `${numCards * 9}deg` }}
      className="relative w-96 h-96  "
    >
      {pokemonData.map((pokemon, i) => (
        <div
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

function Card({
  url,
  attack,
  name,
  moves,
}: {
  url: string;
  attack: string;
  name: string;
  moves: Array<{
    name: string;
    damage: number;
    type: "fire" | "dragon" | "grass" | "water";
  }>;
}) {
  return (
    <div className="w-52 aspect-[9/12] group z-0 hover:z-10">
      <div className="border w-52 aspect-[9/12]  ease-in-out duration-200 relative bg-neutral-500 transition-all group-hover:-translate-y-12 ">
        {JSON.stringify(moves)}
        <Image src={url} alt="pokemon" height={300} width={300} />
      </div>
    </div>
  );
}
