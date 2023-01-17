import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Router from "next/router";

type Player = {
  gameId: number;
  playerId: number;
} 

export const playerAtom = atomWithStorage<Player| null>("player", null);

export const usePlayer = () => {
  const [player] = useAtom(playerAtom);

  if (typeof window !== "undefined" && !player) {
    Router.replace("/empires");
    throw Error("No player");
  }

  return player as Player;
};
