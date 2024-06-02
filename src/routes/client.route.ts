
import express from 'express';
import path from 'path';
import { Request, Response } from 'express';


const router = express.Router();

router.use(express.static(path.join(__dirname, '../../client/dist')));


router.get(['', '/despesas', '/ativos', '/perfil'], (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html') );
})

export default router;
