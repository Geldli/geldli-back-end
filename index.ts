import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const express = require('express');
const app = express();
const port = 3000;


async function main() {
    await prisma.usuario.create({
        data:{
            nome: "Matheus",
            email: "matheusguilhergambaro@gmail.com",
            senha: "naoteinteressa",
            ativos: {
                create: {
                    nome: "Assalto",
                    data: new Date(), //Ano-Mês-Dia
                    valor: 19002.90,
                    idCategoria: ""
                }
            }
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

/*
Create
  Rotas:    
  "/usuario"
  "/despesas"
  "/despesasContinuas"
  "/ativos"
  "/ativosContinuos"


*/