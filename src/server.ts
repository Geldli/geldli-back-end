import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import UserRouter from "./routes/user.route";
import ExpenseRouter from "./routes/expense.route";
import ActiveRouter from "./routes/active.route";
import ExpenseCategoryRouter from "./routes/expenseCategory.route";
import ActiveCategoryRouter from "./routes/activeCategory.route";
import ContinuousActiveRouter from "./routes/continuousActive.route";
import ContinuousExpenseRouter from "./routes/continuousExpense.route";
import dotenv from "dotenv";

import ClientRouter from "./routes/client.route";

dotenv.config();

export const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
  app.use("/", ClientRouter);

  app.use(express.json());

  app.use("/api/v1/user", UserRouter);
  app.use("/api/vq/expense", ExpenseRouter);
  app.use("/api/v1/active", ActiveRouter);
  app.use("/api/v1/expenseCategory", ExpenseCategoryRouter);
  app.use("/api/v1/activeCategory", ActiveCategoryRouter);
  app.use("/api/v1/continuousActive", ContinuousActiveRouter);
  app.use("/api/v1/continuousExpense", ContinuousExpenseRouter);

  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
