"use client";
import { usePokiStore } from "@/components/state";
import { config } from "@/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(config.server);

export default function Page() {
  const { setClientID } = usePokiStore();
  const [_gameID, _setGameID] = useState("");
  const router = useRouter();

  useEffect(() => {
    socket.on("allowJoinGame", ({ gameID, clientID }) => {
      setClientID(clientID);
      router.push(`/${gameID}`);
    });

    // Cleanup on unmount
    return () => {
      socket.off("allowJoinGame");
    };
  }, [router, setClientID]);

  const joinGame = () => {
    socket.emit("askToJoin", { gameID: _gameID });
  };

  const createGame = () => {
    socket.emit("newGame");
  };

  return (
    <main className="flex h-screen gap-8 flex-col items-center justify-center">
      <button
        className="bg-neutral-400 p-1 px-2 rounded-xl"
        onClick={createGame}
      >
        Create Game
      </button>
      <hr className="w-96 border-neutral-700 border-dashed" />
      <div className="flex gap-1">
        <input
          value={_gameID}
          onChange={(e) => _setGameID(e.target.value)}
          className="bg-neutral-200 p-1 px-2 rounded-xl text-center"
          placeholder="Game ID"
        />
        <button
          onClick={joinGame}
          className="bg-neutral-400 p-1 px-2 rounded-xl"
        >
          Join Game
        </button>
      </div>
    </main>
  );
}
