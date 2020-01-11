const mongoose = require("mongoose");

mongoose.model("Produto", {
    id:{type: String},
    nome:{type: String},
    fabricante:{type: String},
    preco:{type: Number}
});