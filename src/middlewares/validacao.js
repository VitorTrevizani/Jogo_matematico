 
module.exports = {
    validar: (req, res, next) => {
       
        let erros = []
    
        if(req.body.email == null || typeof req.body.email == "undefined" || req.body.password == null || typeof req.body.password == "undefined"){
            erros.push({texto:"campos vazios não são permitidos"})
        }
    
    
        if(req.body.password.length < 5 || req.body.password.length > 10 ){
            erros.push({texto:"A senha deve ter de 5 a 10 caracteres"})
    
        }
        
        
        if(erros.length > 0){
            res.render("cadastro", {erros: erros})
        }else{
            next()
        }
    } 
}
        