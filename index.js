#!/bin/node
const commande = require("commander");

commande.name("jereo")
.description("CLI to git file automaticaly after saving with the adequte message")
.argument("[path]")
.version("1.0.0")
.action(require("./controllers/main.controller").watchFolder);


commande.parse();
