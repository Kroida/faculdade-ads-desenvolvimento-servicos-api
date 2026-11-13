const express = require("express");
const knex = require("knex");
const httpErrors = require("http-errors");
const cors = require("cors");

const PORT = 8001;
const HOSTNAME = "localhost";

const api = express();

// ========================================
// MIDDLEWARES
// ========================================

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cors());

// ========================================
// CONEXÃO COM O BANCO DE DADOS
// ========================================

const conn = knex({
    client: "mysql",
    connection: {
        host: HOSTNAME,
        user: "root",
        password: "",
        database: "loja_26_2"
    }
});

// ========================================
// ROTA PRINCIPAL
// ========================================

api.get("/", (req, res) => {
    res.status(200).json({
        resposta: "Seja bem-vindo(a) à nossa API!"
    });
});

// ========================================
// ROTAS DE PRODUTOS
// ========================================

// Listar todos os produtos
api.get("/product", (req, res, next) => {
    conn("produto")
        .join(
            "categoria",
            "produto.fk_codCategoria",
            "=",
            "categoria.pk_id_categoria"
        )
        .select("produto.*", "categoria.nome AS cat")
        .orderBy("produto.nome")
        .then((dados) => {
            res.status(200).json(dados);
        })
        .catch(next);
});

// Buscar produto por ID
api.get("/product/:idProd", (req, res, next) => {
    const idProduto = req.params.idProd;

    conn("produto")
        .join(
            "categoria",
            "produto.fk_codCategoria",
            "=",
            "categoria.pk_id_categoria"
        )
        .select("produto.*", "categoria.nome AS cat")
        .where("produto.pk_id_produto", idProduto)
        .first()
        .then((dados) => {
            if (!dados) {
                return next(httpErrors(404, "Produto não encontrado."));
            }

            res.status(200).json(dados);
        })
        .catch(next);
});

// Cadastrar produto
api.post("/product", (req, res, next) => {
    const { nome, preco, fk_codCategoria } = req.body;

    if (
        !nome ||
        preco === undefined ||
        fk_codCategoria === undefined
    ) {
        return next(httpErrors(400, "Dados do produto incompletos."));
    }

    conn("produto")
        .insert({
            nome,
            preco,
            fk_codCategoria
        })
        .then((dados) => {
            res.status(201).json({
                resposta: "Produto inserido!",
                id: dados[0]
            });
        })
        .catch(next);
});

// Atualizar produto
api.put("/product/:idProd", (req, res, next) => {
    const idProduto = req.params.idProd;
    const { nome, preco, fk_codCategoria } = req.body;

    conn("produto")
        .where("pk_id_produto", idProduto)
        .update({
            nome,
            preco,
            fk_codCategoria
        })
        .then((dados) => {
            if (!dados) {
                return next(httpErrors(404, "Produto não encontrado."));
            }

            res.status(200).json({
                resposta: "Produto editado!"
            });
        })
        .catch(next);
});

// Excluir produto
api.delete("/product/:idProd", (req, res, next) => {
    const idProduto = req.params.idProd;

    conn("produto")
        .where("pk_id_produto", idProduto)
        .delete()
        .then((dados) => {
            if (!dados) {
                return next(httpErrors(404, "Produto não encontrado."));
            }

            res.status(200).json({
                resposta: "Produto excluído!"
            });
        })
        .catch(next);
});

// ========================================
// ROTAS DE CATEGORIAS
// ========================================

// Listar todas as categorias
api.get("/category", (req, res, next) => {
    conn("categoria")
        .select("*")
        .orderBy("nome")
        .then((dados) => {
            res.status(200).json(dados);
        })
        .catch(next);
});

// Buscar categoria por ID
api.get("/category/:idCat", (req, res, next) => {
    const idCategoria = req.params.idCat;

    conn("categoria")
        .where("pk_id_categoria", idCategoria)
        .first()
        .then((dados) => {
            if (!dados) {
                return next(httpErrors(404, "Categoria não encontrada."));
            }

            res.status(200).json(dados);
        })
        .catch(next);
});

// Cadastrar categoria
api.post("/category", (req, res, next) => {
    const { nome } = req.body;

    if (!nome) {
        return next(httpErrors(400, "Nome da categoria é obrigatório."));
    }

    conn("categoria")
        .insert({ nome })
        .then((dados) => {
            res.status(201).json({
                resposta: "Categoria inserida!",
                id: dados[0]
            });
        })
        .catch(next);
});

// Atualizar categoria
api.put("/category/:idCat", (req, res, next) => {
    const idCategoria = req.params.idCat;
    const { nome } = req.body;

    if (!nome) {
        return next(httpErrors(400, "Nome da categoria é obrigatório."));
    }

    conn("categoria")
        .where("pk_id_categoria", idCategoria)
        .update({ nome })
        .then((dados) => {
            if (!dados) {
                return next(httpErrors(404, "Categoria não encontrada."));
            }

            res.status(200).json({
                resposta: "Categoria editada!"
            });
        })
        .catch(next);
});

// Excluir categoria
api.delete("/category/:idCat", (req, res, next) => {
    const idCategoria = req.params.idCat;

    conn("categoria")
        .where("pk_id_categoria", idCategoria)
        .delete()
        .then((dados) => {
            if (!dados) {
                return next(httpErrors(404, "Categoria não encontrada."));
            }

            res.status(200).json({
                resposta: "Categoria excluída!"
            });
        })
        .catch(next);
});

// ========================================
// MIDDLEWARE DE TRATAMENTO DE ERROS
// ========================================

api.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || err.statusCode || 500;

    res.status(status).json({
        erro: status === 500
            ? "Erro interno do servidor."
            : err.message
    });
});

// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

api.listen(PORT, () => {
    console.log(`API rodando em http://${HOSTNAME}:${PORT}`);
});
