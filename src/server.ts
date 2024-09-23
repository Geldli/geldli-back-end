import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import UserRouter from "./routes/user.route";
import ExpenseRouter from "./routes/expense.route";
import ActiveRouter from "./routes/asset.route";
import ExpenseCategoryRouter from "./routes/expenseCategory.route";
import ActiveCategoryRouter from "./routes/assetCategory.route";
import ContinuousActiveRouter from "./routes/continuousAsset.route";
import ContinuousExpenseRouter from "./routes/continuousExpense.route";
import dotenv from "dotenv";
import ClientRouter from "./routes/client.route";
const cors = require("cors");

dotenv.config();

export const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

/* CORS - https://expressjs.com/en/resources/middleware/cors.html#installation
  Saporra não deixa eu usar o back com o front ao mesmo tempo. Pra usar, temos que importar a biblioteca dele
  que está acima, e assim ele deixa eu usar de boa. Mas na hora que upar pro server oficial, temos de tirar ele.
*/
app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true
}));

async function main() {
  app.use("/", ClientRouter);
  app.use(express.json());

  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/expense", ExpenseRouter);
  app.use("/api/v1/asset", ActiveRouter);
  app.use("/api/v1/expenseCategory", ExpenseCategoryRouter);
  app.use("/api/v1/assetCategory", ActiveCategoryRouter);
  app.use("/api/v1/continuousAsset", ContinuousActiveRouter);
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
