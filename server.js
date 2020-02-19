// Criando o servidor
const express = require("express")
const server = express()


// Configurando a engine de templates
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


// Configurando o servidor para apresentar os arquivos estáticos (js/css/imgs/etc)
server.use(express.static('public'))


// Habilitando o corpo do formulário
server.use(express.urlencoded({ extendend: true}))


// Configurando a apresentação da página
server.get("/", function(req, res) {
    return res.render("./index.html", { donors })
})

server.post("/", function(req, res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    donors.push({
        name: name,
        blood: blood
    })

    return res.redirect("/")
})


// Iniciar o servidor e permitir acesso na porta 3000
server.listen(3000, function() {
    console.log ("Server initiated.")
})

// Lista de doadores
const donors = [
    {
        name: "Gustavo Lima",
        blood: "AB+",
    },
    {
        name: "Mateus Brandao",
        blood: "A+",
    },
    {
        name: "Thalys Matias",
        blood: "O+",
    },
    {
        name: "Andre Bastos",
        blood: "A-",
    },
]

