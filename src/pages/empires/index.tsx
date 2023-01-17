import { Status } from "@prisma/client";
import { useAtom } from "jotai";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { playerAtom } from "@/utils/atoms";
import { trpc } from "@/utils/trpc";

const Empires: NextPage = () => {
  const [player, setPlayer] = useAtom(playerAtom);
  const router = useRouter();
  const game = trpc.game.current.useQuery(undefined, {
    onSuccess(data) {
      if (!player) return;
      if (data.id !== player.gameId) {
        setPlayer(null);
        return;
      }
      switch (data.status) {
        case Status.WAITING:
        case Status.PLAYING:
          router.push(`/empires/${data.id}`);
          break;
        case Status.FINISHED:
          setPlayer(null);
          break;
      }
    },
  });
  const join = trpc.game.join.useMutation({
    onSuccess(data) {
      setPlayer({
        gameId: data.gameId,
        playerId: data.id,
      });
      router.push(`/empires/${data.gameId}`);
    },
  });
  const [name, setName] = useState("");
  const [character, setCharacter] = useState("");

  if (!game.data)
    return (
      <main className="grid min-h-screen w-full place-items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <p className="text-center text-white">Loading...</p>
      </main>
    );

  let content = null;

  const onJoin = () => {
    if (!game.data) return;
    join.mutate({ name, gameId: game.data.id, character });
  };

  switch (game.data.status) {
    case Status.FINISHED:
      content = <p className="mt-4 text-center text-white">Game is finished</p>;
      break;
    case Status.PLAYING:
      content = <p className="mt-4 text-center">Game is in progress</p>;
      break;
    case Status.WAITING:
      content = (
        <>
          <p className="mt-4 text-center text-white">Game has not started</p>
          <div className="mx-auto mt-4 max-w-lg rounded bg-white/20 p-4">
            <p className="text-white">Players:</p>
            {game.data.players.length > 0 ? (
              game.data.players.map((player) => (
                <p key={player.id} className="text-white">
                  {player.name}
                </p>
              ))
            ) : (
              <p className="my-4 text-center text-white">No players yet</p>
            )}
          </div>
          <div className="mx-auto mt-4 max-w-lg space-y-4">
            <Input
              value={name}
              onChange={(evt) => setName(evt.target.value)}
              label="Your name"
              labelClassName="text-white"
              className="text-black"
            />
            <Input
              value={character}
              onChange={(evt) => setCharacter(evt.target.value)}
              label="Your character's name"
              labelClassName="text-white"
              className="text-black"
            />
            <Button onClick={onJoin} className="float-right">Join now</Button>
          </div>
        </>
      );
      break;
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-center text-4xl font-bold text-white">Empires</h1>
      {content}
    </main>
  );
};

export default Empires;
