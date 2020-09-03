const redisClient = require('../utils/redis');

module.exports = {
    validateToken: function(req, res, next){
        let token = req.headers.session
            if(!token){
                res.status(401).json();
            }
            else{
                try{
                    redisClient.get(token, function(err, obj){
                        if(obj === null){
                            res.status(401).json("either invalid credentials or session expaired");
                        }
                        else{
                            req.user = JSON.parse(obj).id;
                            redisClient.expire(token, 300);
                            next();
                        }
                    })
                }
                catch(e){
                    console.log(e);    
                };
            }
        }
    }

