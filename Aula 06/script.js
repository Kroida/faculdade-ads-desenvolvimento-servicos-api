function getDados() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dados = JSON.parse(this.responseText);
            var txt = "Nome: " + dados.nome;
            txt += "<br>Idade: " + dados.idade;
            txt += "<br>Casado(a): ";
            dados.casado ? txt += "Sim" : txt += "Não";
            txt += "<br>Cônjuge: " + dados.conjuge.nome;

            if (dados.filhos.length > 0) {
                txt += "<br>Filhos: ";

                dados.filhos.forEach(child => {
                    txt += "<br> - " + child.nome + " Idade: " + child.idade;
                })
            }

            document.getElementById("divDados").innerHTML = txt;
        }
    }

    req.open("GET", "dados.json", true);
    req.send();
}

function salvar() {
    const txtNome = document.getElementById("txtNome").value;
    const txtPreco = parseFloat(document.getElementById("txtPreco").value.replace(",", "."));

    if (txtNome == "" || isNaN(txtPreco)) {
        alert("O campo é obrigatório");
    } else {
        const req = new XMLHttpRequest();

        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const objJSON = JSON.parse(this.responseText);
                var txt = objJSON.resposta;

                if (objJSON.id) {
                    txt += "\nID: " + objJSON.id;
                    getProdutos();
                    alert(txt);
                }
            }
        }

        req.open("POST", "servidor.php?inserir");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(`name=${txtNome}&price=${txtPreco}`);
    }
}

function buscar() {
    const req = new XMLHttpRequest();
    var txt = "";

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objJSON = JSON.parse(this.responseText);

            objJSON.produtos.forEach(prod => {
                txt += `
                    <tr>
                        <td>${prod.id}</td>
                        <td>${prod.nome}</td>
                        <td>${prod.preco}</td>
                        <td>
                            <button onclick="editar(${prod.id})">🖊️</button>
                        </td>
                        <td>
                            <button onclick="excluir(${prod.id})">🗑️</button>
                        </td>
                    </tr>
                `;
            })
            document.querySelector("#tblProdutos tbody").innerHTML = txt;
        }
    }

    req.open("GET", "servidor.php?buscar", true);
    req.send();
}

function editar(idProd) {
    txtNome = prompt("Digite o novo nome: ");
    txtPreco = parseFloat(prompt("Digite o nome preço: ").replace(",", "."));

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objJSON = JSON.parse(this.responseText);
            alert(objJSON.resposta);
            getProdutos();
        }
    }

    req.open("POST", "servidor.php?editar&idProduto=" + idProd);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(`name=${txtNome}&price=${txtPreco}`);
}

function excluir(idProd) {
    const confirma = confirm(`Confirma a exclusão do id ${idProd}?`);

    if (confirma) {
        const req = new XMLHttpRequest();

        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const objJSON = JSON.parse(this.responseText);
                alert(objJSON.resposta);
                getProdutos();
            }
        }

        req.open("GET", "servidor.php?excluir&idProduto=" + idProd);
        req.send();
    }
}