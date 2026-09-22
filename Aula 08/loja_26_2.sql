CREATE DATABASE loja_26_2;

USE loja_26_2;

CREATE TABLE produto (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nome VARCHAR(100) NOT NULL ,
    preco DOUBLE 
);

INSERT INTO produto (nome, preco ) VALUES 
( "Coca-Cola" , 9.89 ) , 
( "Pepsi" , 7.99 ) , 
( "Trakinas" , 3.50 ) ;