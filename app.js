const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://gabrieldamato:senha@cluster0-3cyc4.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
}, () =>{
    console.log("Banco de dados conectado");
})

require("./models/Produto")
const Produto = mongoose.model("Produto");

app.post("/produto", (req,res) => {
    var produto = new Produto({
        nome: req.body.nome, fabricante: req.body.fabricante, preco:req.body.preco
    });

    produto.save().then(() => {
        console.log("Deu erro" + JSON.stringify(erro));
        res.res.status(200).json(produto);
        res.send();
    }).catch((erro) => {
        if(erro){
            console.log("Deu erro" + JSON.stringify(erro));
            throw erro;
        }
        console.log("Deu erro" + JSON.stringify(erro));
        res.statusCode = 417;
        res.send();    
    })
    console.log("Teste");
});

app.listen(8080,() => {
    console.log("API rodando!");
})