import { Status } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, procedure } from "../trpc";

export const gameRouter = router({
  current: procedure.query(async ({ ctx }) => {
    const global = await ctx.prisma.global.findUnique({
      where: { id: "global" },
      include: {
        game: {
          include: {
            players: true,
          },
        },
      },
    });
    if (!global) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No global game found",
      });
    }
    return global.game;
  }),
  get: procedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.prisma.game.findUnique({
      where: { id: input },
      include: {
        players: {
          include: {
            guesser: true,
            subjects: true,
          },
        },
      },
    });
  }),
  join: procedure
    .input(
      z.object({ gameId: z.number(), name: z.string(), character: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.player.create({
        data: {
          name: input.name,
          character: input.character,
          game: {
            connect: {
              id: input.gameId,
            },
          },
        },
      });
    }),
  start: procedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.game.update({
      where: { id: input },
      data: {
        status: Status.PLAYING,
      },
    });
  }),
  reveal: procedure
    .input(
      z.object({
        playerId: z.number(),
        guesserId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.player.update({
        where: { id: input.playerId },
        data: {
          guesser: {
            connect: {
              id: input.guesserId,
            },
          },
        },
      });
    }),
});
