// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { context } from "src/context";
import { schema } from "src/schema";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  context,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
