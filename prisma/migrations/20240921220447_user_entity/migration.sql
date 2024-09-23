-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" BYTEA,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DespesaContinua" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "mesComeco" INTEGER NOT NULL,
    "diaPagamento" INTEGER NOT NULL,
    "anualmente" BOOLEAN NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "DespesaContinua_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaDespesa" (
    "id" TEXT NOT NULL,
    "cores" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "CategoriaDespesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ativo" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Ativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtivoContinuo" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "mesComeco" INTEGER NOT NULL,
    "diaPagamento" INTEGER NOT NULL,
    "anualmente" BOOLEAN NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "AtivoContinuo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaAtivo" (
    "id" TEXT NOT NULL,
    "cores" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "CategoriaAtivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaDespesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DespesaContinua" ADD CONSTRAINT "DespesaContinua_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaDespesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DespesaContinua" ADD CONSTRAINT "DespesaContinua_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaDespesa" ADD CONSTRAINT "CategoriaDespesa_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ativo" ADD CONSTRAINT "Ativo_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaAtivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ativo" ADD CONSTRAINT "Ativo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtivoContinuo" ADD CONSTRAINT "AtivoContinuo_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaAtivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtivoContinuo" ADD CONSTRAINT "AtivoContinuo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaAtivo" ADD CONSTRAINT "CategoriaAtivo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
