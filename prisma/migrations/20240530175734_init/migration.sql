/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" BYTEA NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "identificador" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DespesaContinua" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "mesComeco" INTEGER NOT NULL,
    "diaPagament" INTEGER NOT NULL,
    "anualmente" BOOLEAN NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "DespesaContinua_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ativo" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "identificador" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Ativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtivoContinuo" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "mesComeco" INTEGER NOT NULL,
    "diaPagament" INTEGER NOT NULL,
    "anualmente" BOOLEAN NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "AtivoContinuo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DespesaContinua" ADD CONSTRAINT "DespesaContinua_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ativo" ADD CONSTRAINT "Ativo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtivoContinuo" ADD CONSTRAINT "AtivoContinuo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
