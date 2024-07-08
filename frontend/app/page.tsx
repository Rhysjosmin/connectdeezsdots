import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <div className="absolute  bottom-12 right-12">
        <div className="absolute left-0 bottom-0 ">attack 1</div>
        <Stack>
          {[
            {
              src: "/1.svg",
              attack: "slash",
              name: "bulbauausr",
            },
            {
              src: "/2.svg",
              attack: "slash",
              name: "iguanasaur",
            },
            {
              src: "/3.svg",
              attack: "slash",
              name: "35435asaur",
            },
          ].map((x) => (
            <Card key={x.name} {...x} />
          ))}
        </Stack>
      </div>
    </main>
  );
}

function Stack({ children }: { children: React.ReactElement[] }) {
  const numCards = children.length;
  return (
    <div
      style={{ rotate: `${numCards * 9}deg` }}
      className="relative w-96 h-96  "
    >
      {children.map((card, i) => (
        <div
          key={i}
          style={{
            translate: `-${i * 50}px ${i * 20}px`,
            rotate: `-${(i * 100) / numCards}deg`,
          }}
          className="absolute origin-bottom right-0 bottom-0"
        >
          {card}
        </div>
      ))}
    </div>
  );
}
function Card({
  src,
  attack,
  name,
}: {
  src: string;
  attack: string;
  name: string;
}) {
  return (
    <div className="w-52 aspect-[9/12] group z-0 hover:z-10">
      <div className="border w-52 aspect-[9/12]  ease-in-out duration-200 relative bg-neutral-500 transition-all group-hover:-translate-y-12 ">
        <Image src={src} alt="pokemon" height={300} width={300} />
      </div>
    </div>
  );
}
