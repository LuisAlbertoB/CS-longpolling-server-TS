"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
var respuestasPendientes = [];
var notificaciones = [
    { id: 1, cuerpo: "tienes una nueva notificacion" },
    { id: 2, cuerpo: "Migue comento tu notificacion" }
];
app.get('/notificaciones', function (req, res) {
    res.status(200).json({
        sucess: true,
        notificaciones: notificaciones
    });
});
app.get('/notificaciones-nuevas', function (req, res) {
    respuestasPendientes.push(res);
});
app.post('/notificaciones', function (req, res) {
    var idNotificacion = notificaciones.length > 0 ?
        notificaciones[notificaciones.length - 1].id + 1 : 1;
    var notificacion = {
        id: idNotificacion,
        cuerpo: req.body.cuerpo
    };
    notificaciones.push(notificacion);
    responderCliente(notificacion);
    res.status(201).json({
        suces: true,
        message: "Notificacion creada."
    });
});
function responderCliente(notificacion) {
    for (var _i = 0, respuestasPendientes_1 = respuestasPendientes; _i < respuestasPendientes_1.length; _i++) {
        var res = respuestasPendientes_1[_i];
        res.status(200).json({
            sucess: true,
            notificacion: notificacion
        });
    }
    respuestasPendientes = [];
}
app.listen(3000, function () { return console.log('server starter on port 3000'); });
