const models = require('../models');
const crypto = require('crypto');
const redisClient        = require('../utils/redis');


exports.signup = async function  (req, res) {
    try {
        const userOld = await models.users.findOne({
            where: {
                "userName": req.body.userName
            }
        })
        if(userOld){
            return { data:false, message:"someone has already used this usename please use anther" } 
        }
        const user = await models.users.build(req.body);
        user.save();
        return { data: true }
    } catch (e) {
        console.log(e);
        throw Error(JSON.stringify(req) + ': Error in login: ' + e);
    }
}



exports.login = async function  (req, res) {
    try {
        const user = await models.users.findOne({
            where: {
                "userName": req.body.userName,
                "password": req.body.password
            }
        })
        if(user){
            const cipherToken = crypto.createCipheriv(process.env.HASH_ALGO, Buffer.from(process.env.TOKEN_HASH), process.env.TOKEN_CYPHER);
            let token = cipherToken.update(crypto.randomBytes(8).toString('hex'), 'utf8', 'hex');
            token += cipherToken.final('hex');
            let saveToRedis = {};
            saveToRedis.id = user.dataValues.id;
            let redisObj = await redisClient.set(token, JSON.stringify(saveToRedis))
            if(redisObj === true){
                await redisClient.expire(token, 300);
                return {session: token};
            }
            else{
                return false;
            }
        }
        else{
            return false
        }
    } catch (e) {
        console.log(e);
        throw Error(JSON.stringify(req) + ': Error in login: ' + e);
    }
}


exports.logout = async  function (req, res) {
    try { 
        let redisOut = await redisClient.del(req.headers.session);
        if(redisOut === true){
            return true
        }
        else{
            return false
        }
    }
        catch (e) {
        console.log(e);
        throw Error(JSON.stringify(data) + ': Error in logging out ' + e);
    }
}


exports.showAll = async function  (req, res) {
    try {
        let allUsers = await models.users.findAll()
        return allUsers;
    } catch (e) {
        console.log(e);
        throw Error(JSON.stringify(req) + ': Error in login: ' + e);
    }
}


exports.showProfile = async function  (req, res) {
    try {
        console.log(req.user);
        let User = await models.users.findOne({
            where:{
                id: req.user
            }
        })
        return User.dataValues;
    } catch (e) {
        console.log(e);
        throw Error(JSON.stringify(req) + ': Error in login: ' + e);
    }
}
