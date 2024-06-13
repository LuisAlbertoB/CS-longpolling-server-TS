import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(express.json());

interface Notificacion {
  id: number;
  cuerpo: string;
}

let respuestasPendientes: Response[] = [];

let notificaciones: Notificacion[] = [
  {id: 1, cuerpo: "tienes una nueva notificacion"},
  {id: 2, cuerpo: "Migue comento tu notificacion"}
];

app.get('/notificaciones', (req: Request, res: Response) => {
  res.status(200).json({
    sucess: true,
    notificaciones
  });
});

app.get('/notificaciones-nuevas', (req: Request, res: Response) => {
  respuestasPendientes.push(res);
});

app.post('/notificaciones', (req: Request, res: Response) => {
  const idNotificacion = notificaciones.length > 0 ?
  notificaciones[notificaciones.length -1].id + 1 : 1;

  const notificacion: Notificacion = {
    id: idNotificacion,
    cuerpo: req.body.cuerpo
  };

  notificaciones.push(notificacion);
  responderCliente(notificacion);

  res.status(201).json({
    suces:true,
    message: "Notificacion creada."
  });
});

function responderCliente(notificacion: Notificacion) {
  for (let res of respuestasPendientes) {
      res.status(200).json({
          sucess: true,
          notificacion
      });
  }

  respuestasPendientes = [];
}

app.listen(3000, () => console.log('server starter on port 3000'));

