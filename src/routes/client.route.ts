
import express from 'express';
import path from 'path';
import { Request, Response } from 'express';

import cookieParser from 'cookie-parser';

const router = express.Router();

router.use(cookieParser());
router.use(express.static(path.join(__dirname, '../../client/dist')));


router.get(['', '/despesas', '/ativos', '/perfil'], (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html') );
})

export default router;
