
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

  app.use(express.json()) // faz com que as requests tenham formato JSON

  /* para fins de teste */
  class Usuario{
    private nome: string;
    private email: string;
    private senha: string;

    public constructor(nome: string, email: string, senha: string){
      this.nome = nome;
      this.email = email;
      this.senha = senha;
    }
  }

  let usuarios: Array<Usuario> = [];


  /* Termino  */


  /* Post Methods */
  app.post("/usuario/cadastrar", async (req, res)=>{
    const data = req.body;
    const post = await prisma.usuario.create({
      data:{
        nome: data.nome,
        email: data.email,
        senha: data.senha
      }
    });

    res.json(post);
  })

  app.post("/categoriaDespesa", async(req, res)=>{
    const data = req.body;
    const post = await prisma.categoriaDespesa.create({
      data: {
        id:  data.nome.toLowerCase(),
        cores: data.cores.toLowerCase(),
        idUsuario: data.idUsuario,
      }
    })

    res.json(post);
  })

  app.post("/categoriaAtivo", async(req, res)=>{
    const data = req.body;

    const post = await prisma.categoriaAtivo.create({
      data: {
        id: data.nome.toLowerCase(),
        cores: data.cores.toLowerCase(),
        idUsuario: parseInt(data.idUsuario),
      }
    })

    res.json(post);
  })

  app.post("/ativo", async (req, res)=>{
    const data = req.body;
    const post = await prisma.ativo.create({
      data:{
        data: new Date(),
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        idCategoria: data.idCategoria,
        idUsuario: data.idUsuario
      }
    })

    res.json(post);
  })

  app.post("/despesa", async (req, res)=>{
    const data = req.body;
    const post = await prisma.despesa.create({
      data:{
        data: new Date(),
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        idCategoria: data.idCategoria,
        idUsuario: data.idUsuario
      }
    })

    res.json(post);
  })

  app.post("/ativoContinuo", async (req, res)=>{
    const data = req.body;
    const post = await prisma.ativoContinuo.create({
      data:{
        data: new Date(),
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        mesComeco: data.mesComeco,
        diaPagamento: data.diaPagamento,
        anualmente: data.anualmente,
        idCategoria: data.idCategoria,
        idUsuario: data.idUsuario,
      }
    })

    res.json(post);
  })

  app.post("/despesaContinua", async (req, res)=>{
    const data = req.body;
    const post = await prisma.despesaContinua.create({
      data:{
        data: new Date(),
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        mesComeco: data.mesComeco,
        diaPagamento: data.diaPagamento,
        anualmente: data.anualmente,
        idCategoria: data.idCategoria,
        idUsuario: data.idUsuario,
      }
    })

    res.json(post);
  })

  /* Get Methods */

  // Métodos Gerais
  app.get("/usuarios", async (req, res) =>{
    const get = await prisma.usuario.findMany();
    res.json(get);
  })

  app.get("/despesas", async (req, res)=>{
    const get = await prisma.despesa.findMany();
    res.json(get);
  })

  app.get("/despesasContinuas", async (req, res) =>{
    const get = await prisma.despesaContinua.findMany();
    res.json(get);
  })

  app.get("/ativos", async (req, res)=>{
    const get = await prisma.ativo.findMany();
    res.json(get);
  })

  app.get("/ativosContinuos", async (req, res) =>{
    const get = await prisma.ativoContinuo.findMany();
    res.json(get);
  })

  app.get("/categoriasDespesas", async (req, res) =>{
    const get = await prisma.categoriaDespesa.findMany();
    res.json(get);
  })

  app.get("/categoriasAtivos", async (req, res) =>{
    const get = await prisma.categoriaAtivo.findMany();
    res.json(get);
  })

  // Métodos específicos

  // encontra a despesa por ID da despesa
  app.get("/despesas/:id", async (req, res)=>{
    const get = await prisma.despesa.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })

    res.json(get);
  })

  // encontra todas as despesas do usuario X
  app.get("/despesas/usuario/:id", async (req, res) =>{
    const get = await prisma.despesa.findMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    res.json(get);
  })

  // encontra todas as despesas do usuario X e com categoria Y
  app.get("/despesas/usuario/:idUsuario/:categoria", async (req, res)=>{
    const get = await prisma.despesa.findMany({
      where: {
        idUsuario: parseInt(req.params.idUsuario),
        idCategoria: req.params.categoria
      }
    })
    res.json(get);
  })

  // econtra o ativo com id X
  app.get("/ativos/:id", async(req, res)=>{
    const get  = await prisma.ativo.findUnique({
      where:{
        id: parseInt(req.params.id)
      }
    })

    res.json(get);
  })

  //encontra os ativos do usuario X
  app.get("/ativos/usuario/:id", async (req, res) =>{
    const get = await prisma.ativo.findMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    res.json(get);
  })

  // encontra os ativos do usuario X com categoria Y
  app.get("/ativos/usuario/:idUsuario/:categoria", async (req, res)=>{
    const get = await prisma.ativo.findMany({
      where: {
        idUsuario: parseInt(req.params.idUsuario),
        idCategoria: req.params.categoria
      }
    })
    res.json(get);
  })

  // encontra todas as categorias de despesa do usuario X
  app.get("/categoriasDespesas/usuario/:id", async (req, res)=>{
    const get = await prisma.categoriaDespesa.findMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    res.json(get);
  })

  // encontra todas as categorias de ativos do usuario X
  app.get("/categoriasAtivos/usuario/:id", async (req, res)=>{
    const get = await prisma.categoriaAtivo.findMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    res.json(get);
  })

  // encontra a despesa  contínua  com id X
  app.get("/despesasContinuas/:id", async(req, res)=>{
    const get = await prisma.despesaContinua.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })

    res.json();
  })

  // encontra todas as despesas contínuas do usuário  X
  app.get("/despesasContinuas/usuario/:id", async (req, res)=>{
    const get = await prisma.despesaContinua.findMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    res.json(get);
  })

  // encontra todas as despesas contínuas do usuário X com a categoria Y

  app.get("/despesasContinuas/usuario/:id/:categoria", async (req, res)=>{
    const get = await prisma.despesaContinua.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
        idCategoria: req.params.categoria
      }
    })

    res.json(get);
  })

  // encontra os ativos contínuos  com id X
  app.get("/ativosContinuos/:id", async(req, res)=>{
    const get = await prisma.ativoContinuo.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })

    res.json();
  })

  // encontra todos os ativos contínuos do usuário  X
  app.get("/ativosContinuos/usuario/:id", async (req, res)=>{
    const get = await prisma.ativoContinuo.findMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    res.json(get);
  })

  // encontra todas os ativos contínuos do usuário X com a categoria Y

  app.get("/ativosContinuos/usuario/:id/:categoria", async (req, res)=>{
    const get = await prisma.ativoContinuo.findMany({
      where: {
        idUsuario: parseInt(req.params.id),
        idCategoria: req.params.categoria
      }
    })
    console.log(req.params.categoria)
    res.json(get);
  })

  /* Update Methods */

  app.put("/usuario/update/", async(req, res)=>{
    const data = req.body;
    const put = await prisma.usuario.update({
      where:{
        id: data.id,
      },
      data: {
        senha: data.senha
      }
    })
  })

  app.put("/despesa/update", async (req, res)=>{
    const data = req.body;
    const put = await prisma.despesa.update({
      where:{
        id: data.id
      },
      data:{
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        idCategoria: data.idCategoria,
      }
    })
    res.json(put);
  })

  app.put("/ativo/update", async (req, res)=>{
    const data = req.body;
    const put = await prisma.ativo.update({
      where:{
        id: data.id
      },
      data:{
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        idCategoria: data.idCategoria,
      }
    })
    res.json(put);
  })


  app.put("/despesaContinua/update", async (req, res)=>{
    const data = req.body;
    const put = await prisma.despesaContinua.update({
      where:{
        id: data.id
      },
      data:{
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        mesComeco: data.mesComeco,
        diaPagamento: data.diaPagamento,
        anualmente: data.anualmente,
      }
    })
    res.json(put);
  })

  app.put("/ativoContinuo/update", async (req, res)=>{
    const data = req.body;
    const put = await prisma.ativoContinuo.update({
      where:{
        id: data.id
      },
      data:{
        valor: data.valor,
        nome: data.nome,
        descricao: data.descricao,
        mesComeco: data.mesComeco,
        diaPagamento: data.diaPagamento,
        anualmente: data.anualmente,
      }
    })
    res.json(put);
  })

  /* Delete Methods */

  // Apaga um usuário e tudo o que contém dele no sistema (não altere a ordem das funções - perceba que as primeira não dependem das outras para serem apagadas)
  app.delete("/usuario/excluir/:id", async (req, res)=>{
    await prisma.ativo.deleteMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    await prisma.despesa.deleteMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    await prisma.despesaContinua.deleteMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    await prisma.ativoContinuo.deleteMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    await prisma.categoriaAtivo.deleteMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    await prisma.categoriaDespesa.deleteMany({
      where:{
        idUsuario: parseInt(req.params.id)
      }
    })

    const del = await prisma.usuario.delete({
      where:{
        id: parseInt(req.params.id)
      }
    })

    res.json(del);
  })

  app.delete("/despesa/excluir/:id", async (req, res)=>{
    const del = await prisma.despesa.delete({
      where:{
        id: parseInt(req.params.id)
      }
    })

    res.json(del);
  })

  app.delete("/ativo/excluir/:id", async (req, res)=>{
    const del = await prisma.ativo.delete({
      where:{
        id: parseInt(req.params.id)
      }
    })

    res.json(del);
  })

  app.delete("/ativoContinuo/excluir/:id", async (req, res)=>{
    const del = await prisma.ativoContinuo.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.json(del);
  })

  app.delete("/despesaContinua/excluir/:id", async (req, res)=>{
    const del = await prisma.despesaContinua.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })

    res.json(del);
  })

  app.delete("/categoriaDespesa/excluir/:id", async (req, res)=>{
    const del = await prisma.categoriaDespesa.delete({
      where:{
        id: req.params.id
      }
    })

    res.json(del);
  })

  app.delete("/categoriaAtivo/excluir/:id", async (req, res)=>{
    const del = await prisma.categoriaAtivo.delete({
      where:{
        id: req.params.id
      }
    })

    res.json(del);
  })

  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });


  app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


