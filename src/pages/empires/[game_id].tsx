import { Button } from "@/components/button";
import { Empire } from "@/components/empire";
import { usePlayer } from "@/utils/atoms";
import { trpc } from "@/utils/trpc";
import { Status } from "@prisma/client";
import { type NextPage } from "next";
import { useRouter } from "next/router";

const Game: NextPage = () => {
  const player = usePlayer();
  const router = useRouter();
  const gameId = router.query.game_id as string;
  const utils = trpc.useContext();
  const game = trpc.game.get.useQuery(Number(gameId), {
    onError(err) {
      console.error(err);
      router.push("/empires");
    },
  });
  const start = trpc.game.start.useMutation({
    onSuccess() {
      utils.game.invalidate();
    },
  });

  if (!game.data)
    return (
      <main className="grid min-h-screen w-full place-items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <p className="text-center text-white">Loading...</p>
      </main>
    );

  const you = game.data.players.find((p) => p.id === player.playerId);

  if (!you) throw Error("Could not find You");

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-center text-4xl font-bold text-white">Empires</h1>
      <div className="mx-auto mt-4 max-w-lg">
        {game.data.players.length > 0 ? (
          game.data.players
            .filter((x) => !x.guesser)
            .map((player) => (
              <Empire
                key={player.id}
                id={player.id}
                empires={game.data?.players ?? []}
              />
            ))
        ) : (
          <p className="my-4 text-center text-white">No players yet</p>
        )}
        {game.data.status === Status.WAITING && (
          <Button
            className="mt-6 w-full max-w-none"
            onClick={() => start.mutate(Number(gameId))}
          >
            Start game
          </Button>
        )}
      </div>
    </main>
  );
};

export default Game;
