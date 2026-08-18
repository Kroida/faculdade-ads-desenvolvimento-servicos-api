// ===== Manipulação dinâmica com JS =====

var total = 0;

function add() {
    // Campos
    var txtNome = document.getElementById("txtNome");
    var txtPreco = document.getElementById("txtPreco");
    var listaProdutos = document.getElementById("listaProdutos");
    var divTotalProdutos = document.getElementById("divTotalProdutos");

    // Variáveis
    var nome = txtNome.value;
    var preco = parseFloat(txtPreco.value.replace(",", "."));

    // Se estiver vazio alerta erro. Se não: atribui preco ao total,
    // atualiza o html e limpa as entradas
    if (nome == "" || preco == "") {
        alert("Os campos devem ser preenchidos!");
    } else {
        total += preco;

        listaProdutos.innerHTML += `<li> ${nome} R$ ${preco.toFixed(2).replace(".", ",")} </li>`;
        txtNome.value = "";
        txtPreco.value = "";

        divTotalProdutos.innerHTML = `<h2>Total = R$ ${total.toFixed(2).replace(".", ",")}</h2>`;
    }
}

// ===== Objetos em JS =====
function lerDados() {
    var usuario = {
        // Atributos
        nome: document.getElementById("entradaNome").value,

        peso: parseFloat(
            document.getElementById("entradaPeso").value.replace(",", ".")
        ),

        altura: parseFloat(
            document.getElementById("entradaAltura").value.replace(",", ".")
        ),

        // Métodos
        // Retorna apenas um valor
        calcularIMC() {
            return this.peso / (this.altura * this.altura)
        },

        // Retorna um objeto
        getDados() {
            return {
                nome: this.nome,
                peso: this.peso,
                altura: this.altura
            };
        }
    }

    var dados = usuario.getDados();

    txt = "Nome: " + dados.nome;
    txt += "<br>Altura: " + dados.altura;
    txt += "<br>Casado: " + (usuario.casado ? "Sim" : "Não");
    txt += "<br><h2>IMC do caboco: </h2>" + usuario.calcularIMC().toFixed(2);
    document.getElementById("divDados").innerHTML = txt;
}