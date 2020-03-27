const express = require ('express');
const cors = require ('cors');
const routes = require ('./routes'); //passar caminho pous é arquivo e nao pacote

const app = express();

app.use(cors());
// conver em ojbeto js
app.use(express.json());
app.use(routes);

app.listen(3333);