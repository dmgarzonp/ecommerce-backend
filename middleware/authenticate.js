'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
const secret = 'davidgarzonangular';

exports.auth = function(req, res, next){  
    if (!req.headers. authorization) {
        return res.status(400).json({
            ok: false,
            msg: 'NoHeadersErrors'            
        })
    }


    var token = req.headers.authorization.replace(/['"]+/g,'')
    var segment = token.split('.');    

    if (segment.length != 3) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid Token'            
        })
    } else {
        try {
            var payload = jwt.decode(token,secret);
                if (payload.exp <= moment().unix()) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Token expidado'            
                    })
                }
        } catch (error) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Token'            
            })
        }
    }

    req.user = payload;

    next();


}

