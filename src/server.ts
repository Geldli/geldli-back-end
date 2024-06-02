
import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express';

import dotenv from 'dotenv'

import ClientRouter from './routes/client.route'

dotenv.config();



const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
  app.use('/', ClientRouter);

  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


