const AuthService = require('../services/users')


exports.signup = async function (req, res, next) {
    try {
        let signupData = await AuthService.signup(req);        
        if(signupData.data == true){
            return res.status(200).json();
        }
        else{
            return res.status(400).json({ message: signupData.message });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

exports.login = async function (req, res, next) {
    try {
        let loginData = await AuthService.login(req, res);        
        if(loginData != false){
            return res.status(200).json(loginData);
        }
        else{
            return res.status(400).json("invalid cred");
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

exports.logout = async function (req, res, next) {
    try {
        let signupData = await AuthService.logout(req);        
        if(signupData == true){
            return res.status(200).json();
        }
        else{
            return res.status(400).json("something went wrong");
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

exports.showAll = async function (req, res, next) {
    try {
        let signupData = await AuthService.showAll(req);        
        if(signupData){
            return res.status(200).json(signupData);
        }
        else{
            return res.status(400).json('something went wrong');
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

exports.showProfile = async function (req, res, next) {
    try {
        let signupData = await AuthService.showProfile(req);        
        if(signupData){
            return res.status(200).json(signupData);
        }
        else{
            return res.status(400).json('not logged in');
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}