'use strict'

const Admin = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');



const registroAdmin = async(req, res = response) => {
    const data = req.body;
    var admin_arr = [];
    

    admin_arr = await Admin.find({email:data.email});
    if (admin_arr.length == 0) {
        
        //registro
        //const reg = await Cliente.create(data);

        if (data.password) {
            
            bcrypt.hash(data.password, null, null, async function( err,hash){
                if (hash) {
                    data.password = hash
                    const reg = await Admin.create(data);
                    res.status(200).json({
                        ok: true,
                        msg: reg
                    })
                }
            })
        }else {
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

const loginAdmin = async(req, res = response) => {
    const data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({ email: data.email});

    if (admin_arr.length == 0) {
        res.status(200).json({
            ok: false,
            msg: 'No se encontro el correo',
            data: undefined
        })
    } else {
        
        //login
        let user = admin_arr[0];

        bcrypt.compare( data.password, user.password, async (err, check) => {

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


module.exports = {
    registroAdmin,
    loginAdmin
}