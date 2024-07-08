"use client";
import { config } from "@/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io(config.server);
export default function Page() {
  const router = useRouter();
  socket.on("gameCreated", ({ gameID }) => {
    router.push(`/${gameID}`);
  });
  const createGame = () => {
    socket.emit("newGame");
  };
  return (
    <main className="flex h-screen gap-8 flex-col items-center justify-center">
      <button
        className="bg-neutral-400 p-1 px-2 rounded-xl"
        onClick={() => createGame()}
      >
        Create Game
      </button>
      <hr className="w-96 border-neutral-700 border-dashed" />
      <div className="flex gap-1">
        <input
          className=" bg-neutral-200 p-1 px-2 rounded-xl text-center"
          placeholder="Game ID"
        />
        <button className="bg-neutral-400 p-1 px-2 rounded-xl">
          Join Game
        </button>
      </div>
    </main>
  );
}
