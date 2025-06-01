import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";
import { PrismaClient } from "@prisma/client";
import { validateToken } from "./middlewares/validateToken";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const operation = req.body.operationName;
        const authHeader = req.headers.authorization;
        const auth = await validateToken({ operation, authHeader });

        if (auth.status) {
            return { prisma };
        }
        throw new Error(auth.message);
    },
    cors: {
        origin: "*",
        credentials: false
    }
});

server.listen({ port: PORT })
.then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})