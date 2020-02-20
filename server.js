// Criando o servidor
const express = require("express")
const server = express()


// Configurando o servidor para apresentar os arquivos estáticos (js/css/imgs/etc)
server.use(express.static('public'))


// Habilitando o corpo do formulário
server.use(express.urlencoded({ extendend: true}))


// Habilitando a conexão com o DB
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '000000',
    host: 'localhost',
    port: 5432,
    database: 'plataformadoe',
})


// Configurando a engine de templates
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


// Configurando a apresentação da página
server.get("/", function(req, res) {
    
    db.query("SELECT * FROM donors", function(err, result){
        if (err) return res.send("Erro de Banco de Dados!!")

        const donors = result.rows 
        return res.render("./index.html", { donors })
    })
})

server.post("/", function(req, res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "")
    {
        return res.send("Todos os campos são obrigatórios!")
    }
    
    // Inserindo values dentro do DB
    const query = `
        INSERT INTO donors ("name", "email", "blood") 
        VALUES ($1, $2, $3)
    `

    const values  = [name, email, blood]

    db.query(query, values, function(err){
        if (err) return res.send("Erro no Banco de Dados!!")

        return res.redirect("/")
    })

})


// Iniciar o servidor e permitir acesso na porta 3000
server.listen(3000, function() {
    console.log("Server initiated.")
})

