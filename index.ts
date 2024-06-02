import { PrismaClient } from '@prisma/client'
import { create } from 'domain';
import { json, text } from 'stream/consumers';
import express, {Express, Request, Response} from "express";
import e from 'express';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

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
app.post("/cadastrar", async (req, res)=>{
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
      id: data.nome,
      cores: data.cores,
      idUsuario: data.idUsuario,
    }
  })

  res.json(post);
})

app.post("/categoriaAtivo", async(req, res)=>{
  const data = req.body;

  const post = await prisma.categoriaAtivo.create({
    data: {
      id: data.nome,
      cores: data.cores,
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

app.get("/despesaContinuas", async (req, res) =>{
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
app.get("/despesas/:id", async(req, res)=>{
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
  const get = prisma.despesaContinua.findMany({
    where: {
      idUsuario: parseInt(req.params.id),
      idCategoria: req.params.categoria
    }
  })

  res.json(get);
})


/* Inicia o servidor do Express */
const server = app.listen(port, ()=>{
  console.log(`listening in port ${port}`)
})
