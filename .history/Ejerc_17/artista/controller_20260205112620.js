const model = require('./model');
const view = require('./view');
const albumModel = require('../album/model');

exports.list = (req,res)=>{
  res.send("Lista artistas");
};

exports.detail = (req,res)=>{
  res.send("Detalle artista");
};

exports.form = (req,res)=>{
  res.send("Formulario artista");
};

exports.save = (req,res)=>{
  res.send("Guardar artista");
};

exports.delete = (req,res)=>{
  res.send("Eliminar artista");
};