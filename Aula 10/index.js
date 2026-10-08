const express = require("express");
const knex = require("knex");
const http_errors = require("http-errors");

const PORT = 8001;
const HOSTNAME = "localhost";

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Criar a conexão com o banco
const conn = knex({
  client: "mysql",
  connection: {
    host: HOSTNAME,
    user: "root",
    password: "",
    database: "loja_26_2",
  },
});

// ---------- Construção dos endpoints ----------

// Teste da API
api.get("/", (req, res, next) => {
  res.status(200);
  //    res.send( '{ "resposta" : "Seja bem-vindo(a) à nossa API" }' )
  res.json({ resposta: "Seja bem-vindo(a) à nossa API" });
});

// Pega todos os produtos
api.get("/product", (req, res, next) => {
  conn("produto")
    .join(
      "categoria",
      "produto.fk_codCategoria",
      "=",
      "categoria.pk_id_categoria",
    )
    .select("produto.*", "categoria.nome AS cat")
    .orderBy("produto.nome")
    .then((dados) => {
      res.status(200);
      res.json(dados);
    })
    .catch(next);
});

// Pega um produto pelo ID
api.get("/product/:idProd", (req, res, next) => {
  const idProduto = req.params.idProd;

  conn("produto")
    .join(
      "categoria",
      "produto.fk_codCategoria",
      "=",
      "categoria.pk_id_categoria",
    )
    .select("produto.*", "categoria.nome AS cat")
    .where("produto.pk_id_produto", idProduto)
    .first()
    .then((dados) => {
      if (!dados) {
        return next(http_errors(404, "Produto não encontrado"));
      }

      res.status(200);
      res.json(dados);
    })
    .catch(next);
});

// Altera um produto
api.put("/product/:idProd", (req, res, next) => {
  const idProduto = req.params.idProd;

  conn("produto")
    .where("pk_id_produto", idProduto)
    .update(req.body)
    .then((dados) => {
      if (!dados) {
        return next(http_errors(404, "Erro ao editar"));
      }

      res.status(200);
      res.json({ resposta: "Produto editado!" });
    })
    .catch(next);
});

// Deleta um produto
api.delete("/product/:idProd", (req, res, next) => {
  const idProduto = req.params.idProd;

  conn("produto")
    .where("pk_id_produto", idProduto)
    .delete()
    .then((dados) => {
      if (!dados) {
        return next(http_errors(404, "Erro ao excluir!"));
      }

      res.status(200);
      res.json({ resposta: "Produto excluído!" });
    })
    .catch(next);
});

// Colocando o servidor no ar
api.listen(PORT, () => {
  console.log(`API rodando em http://${HOSTNAME}:${PORT}`);
});
