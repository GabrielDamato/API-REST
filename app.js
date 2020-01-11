const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");

const ignore = {_id: false, __v: false};

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Produto", {
    useNewUrlParser: true, useUnifiedTopology: true
}, (erro) =>{
    if (erro){
        console.log("Ocorreu um erro" + erro);
    }else{
        console.log("Banco de dados conectado");
    }
})

require("./models/Produto")
const Produto = mongoose.model("Produto");

app.post("/produto", (req,res) => {
    let id = uuidv1();
    let produto = new Produto({
        id , nome: req.body.nome, fabricante: req.body.fabricante, preco:req.body.preco
    });

    produto.save().then((result) => {
        console.log("Produto salvo com sucesso " + JSON.stringify(result));
        res.status(200).json(produto);
    }).catch((erro) => {
        if(erro){
            console.log("Deu erro" + JSON.stringify(erro));
            throw erro;
        }
            console.log("Deu erro" + JSON.stringify(erro));
        res.statusCode = 417;
    });
    console.log("Teste");
});

app.get("/produto", (req, res) => {
    
    Produto.find({}, ignore).then((result, erro) => {
        if (erro) {
            console.log("Deu erro" + JSON.stringify(erro));
            res.status(500);
        }else{
            console.log("resultado " + JSON.stringify(result));
            res.status(200).json(result);
        }
    });
});

app.delete("/produto/:id", (req, res) => {

    let id = req.params.id;

    Produto.deleteOne({id}).then((result, erro) => {
        if (erro) {
            console.log("Deu erro" + erro);
            res.status(500);
        }else{
            if (result.deletedCount > 0){
                console.log("Resultado " + JSON.stringify(result));
                res.status(200).json({mensagem: "Produto de ID = " + id + "removido com sucesso"});
            }
        }
    })
})

app.listen(8080,() => {
    console.log("API rodando!");
});