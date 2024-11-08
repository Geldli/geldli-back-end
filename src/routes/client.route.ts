
import path from 'path';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import continueIfLogged from '../middlewares/continueIfLogged.middleware';

const router = express.Router();

router.use(cookieParser());
router.use(express.static(path.join(__dirname, '../../client/dist')));


router.get(['', '/dashboard', '/despesas', '/ativos', '/perfil'], (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html') );
})

export default router;
