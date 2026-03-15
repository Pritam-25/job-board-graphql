import 'dotenv/config';
import express, { Request, Response } from 'express';
import type { Application } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';

import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { expressMiddleware } from '@as-integrations/express5';
import { statusCode } from '@utils/statusCodes.js';
import { prisma } from './lib/prisma.js';

const app: Application = express();

app.use(cors());
app.use(express.json());

/* ---------- Apollo Server ---------- */

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use('/graphql', expressMiddleware(apolloServer));

/* ---------- REST Routes ---------- */

app.get('/', (_req: Request, res: Response) => {
  res.send('👋 Hello from HireSense');
});

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(statusCode.success).json({
      status: 'ok',
      db: 'connected',
      uptime: process.uptime(),
    });
  } catch {
    res.status(statusCode.serviceUnavailable).json({
      status: 'degraded',
      db: 'disconnected',
    });
  }
});

export default app;
