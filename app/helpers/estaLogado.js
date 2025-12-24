//verifica se um usuário está logado

module.exports = {
    estaLogado : function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error_msg", "você precia estar logado")
        res.redirect("/")
    }
}