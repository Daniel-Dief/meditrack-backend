import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ prisma }),
    cors: {
        origin: "*",
        credentials: false
    }
});

server.listen({ port: PORT })
.then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})