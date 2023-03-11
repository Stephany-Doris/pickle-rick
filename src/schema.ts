// src/schema.ts
import { makeSchema, objectType, queryType } from "nexus";
import { join } from "path";

const Query = queryType({
  definition(t: {
    list: {
      field: (
        arg0: string,
        arg1: {
          type: string;
          args: { first: string };
          resolve(_root: any, args: any, ctx: any): any;
        }
      ) => void;
    };
  }) {
    t.list.field("cats", {
      type: "Cat",
      args: {
        first: "Int",
      },
      resolve(
        _root: any,
        args: { first: any },
        ctx: { prisma: { cat: { findMany: (arg0: { take: any }) => any } } }
      ) {
        return ctx.prisma.cat.findMany({ take: args.first });
      },
    });
  },
});

const Owner = objectType({
  name: "Owner",
  definition(t: {
    int: (arg0: string) => void;
    string: (arg0: string) => void;
  }) {
    t.int("id");
    t.string("name");
    t.string("url");
  },
});

const Cat = objectType({
  name: "Cat",
  definition(t: {
    int: (arg0: string) => void;
    string: (arg0: string) => void;
    field: (
      arg0: string,
      arg1: {
        type: string;
        resolve(cat: any, _args: any, ctx: any): Promise<any>;
      }
    ) => void;
  }) {
    t.int("id");
    t.string("name");
    t.string("birthDate");
    t.string("breed");
    t.string("imageUrl");
    t.field("owner", {
      type: "Owner",
      async resolve(
        cat: { ownerId: any },
        _args: any,
        ctx: {
          prisma: {
            owner: { findFirst: (arg0: { where: { id: any } }) => any };
          };
        }
      ) {
        const owner = await ctx.prisma.owner.findFirst({
          where: { id: cat.ownerId },
        });
        // The ! tells TypeScript to trust us, it won't be null
        return owner!;
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Cat, Owner],
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  outputs: {
    schema: join(process.cwd(), "schema.graphql"),
    typegen: join(process.cwd(), "nexus.ts"),
  },
  sourceTypes: {
    modules: [{ module: ".prisma/client", alias: "prisma" }],
    debug: process.env.NODE_ENV === "development",
  },
  contextType: {
    module: join(process.cwd(), "src", "context.ts"),
    export: "Context",
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
});
