const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    checkLoggedIn: function(req,res, next){
        const token = req.headers.authorization;
        try{
            const decoded = jwt.verify(token, process.env.token_login);
            //De esta manera, en los endpoints se puede acceder a los atributos que tiene el token con req.userData.atributo
            req.userData = decoded;
            next();
        }catch(error){
            return res.status(400).send({message:'Error validating token. Please log in.', error, success: false, date:Date()});
        }
    },
}