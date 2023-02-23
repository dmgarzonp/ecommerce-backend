'use strict'
const { response } = require('express');
const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');


const registroCliente = async (req, res = response) => {
    const data = req.body;
    var clientes_arr = [];


    clientes_arr = await Cliente.find({ email: data.email });
    if (clientes_arr.length == 0) {

        //registro
        //const reg = await Cliente.create(data);

        if (data.password) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) {
                    data.password = hash
                    const reg = await Cliente.create(data);
                    res.status(200).json({
                        ok: true,
                        msg: reg
                    })
                }
            })
        } else {
            res.status(200).json({
                ok: false,
                msg: 'No hay contraseña',
                data: undefined
            })
        }
        res.status(200).json({
            ok: true,
            msg: data
        })

    } else {
        res.status(200).json({
            ok: false,
            msg: 'El correo ya existe en la bd',
            data: undefined
        })
    }


}

const loginCliente = async (req, res = response) => {
    const data = req.body;
    var cliente_arr = [];
    cliente_arr = await Cliente.find({ email: data.email });

    if (cliente_arr.length == 0) {
        res.status(200).json({
            ok: false,
            msg: 'No se encontro el correo',
            data: undefined
        })
    } else {

        //login
        let user = cliente_arr[0];

        bcrypt.compare(data.password, user.password, async (err, check) => {

            if (check) {
                res.status(200).json({
                    ok: true,
                    data: user,
                    token: jwt.createToken(user)
                })

            } else {
                res.status(200).json({
                    ok: false,
                    msg: 'Contraseña no coincide',
                    data: undefined
                })
            }
        })



    }
}

const listarClientesFiltraAdmin = async (req, res = response) => {
    console.log(req.user);
    if (req.user) {
        if (req.user.role == 'admin') {

            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];;

            console.log(tipo);

            if (tipo == null || tipo == 'null') {
                let reg = await Cliente.find();
                res.status(200).json({
                    ok: true,
                    data: reg
                })
            } else {
                if (tipo == 'apellidos') {
                    let reg = await Cliente.find({ apellidos: new RegExp(filtro, 'i') });
                    res.status(200).json({
                        ok: true,
                        data: reg
                    })
                } else if (tipo == 'correo') {
                    let reg = await Cliente.find({ email: new RegExp(filtro, 'i') });
                    res.status(200).json({
                        ok: true,
                        data: reg
                    })
                }
            }
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'NoAccess'            
            })
        }
    } else {
        return res.status(500).json({
            ok: false,
            msg: 'NoAccess'            
        })
    }


}





module.exports = {
    registroCliente,
    loginCliente,
    listarClientesFiltraAdmin
}