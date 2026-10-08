CREATE DATABASE loja_26_2;

USE loja_26_2;

CREATE TABLE categoria (
    pk_id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produto (
    pk_id_produto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DOUBLE NOT NULL,
    fk_codCategoria INT NOT NULL,
    FOREIGN KEY (fk_codCategoria) REFERENCES categoria (pk_id_categoria)
);

INSERT INTO categoria (nome) VALUES ("Refrigerante"), ("Biscoito");

INSERT INTO
    produto (nome, preco, fk_codCategoria)
VALUES ("Coca-cola", 9.89, 1),
    ("Pepsi", 7.99, 1),
    ("Trakinas", 3.50, 2);