// src/schema.ts
import { makeSchema, objectType, queryType } from "nexus";
import { join } from "path";

const Query = queryType({
  definition(t) {
    t.list.field("cats", {
      type: "Cat",
      args: {
        first: "Int",
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.cat.findMany({ take: args.first });
      },
    });
  },
});

const Owner = objectType({
  name: "Owner",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("url");
  },
});

const Cat = objectType({
  name: "Cat",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("birthDate");
    t.string("breed");
    t.string("imageUrl");
    t.field("owner", {
      type: "Owner",
      async resolve(cat, _args, ctx) {
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
