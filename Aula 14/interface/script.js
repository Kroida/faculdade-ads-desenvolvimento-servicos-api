function add() {
    const txtNome = document.getElementById("txtNome");
    const txtPreco = document.getElementById("txtPreco");
    const selCategoria = document.getElementById("selCategoria")

    if (txtNome.value != "" && selCategoria.value != 0) {
        var preco = 0.0;
        if (txtPreco.value != "") {
            preco = parseFloat(txtPreco.value.replace(",", "."));
        }

        const req = new XMLHttpRequest();

        req.onreadystatechange = function () {
            if (this.readyState == 4) {
                txtNome.value = "";
                txtPreco.value = "";
                selCategoria.value = "0";
            }
        }

        req.open("POST" , "http://localhost:8001/product");
        req.setRequestHeader( "Content-type" , "application/x-www-form-urlencoded");
        req.send("nome=" + encodeURIComponent(txtNome.value) + "&preco=" + encodeURIComponent(preco) + "&fk_codCategoria=" + encodeURIComponent(selCategoria.value));
    }
}

function carregarCategorias() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const categorias = JSON.parse(this.responseText);
            var txt = '<option value="0"> Selecione...</option>';
            categorias.forEach(cat => {
                txt += `<option value="${cat.pk_id_categoria}">${cat.nome}</option>`;
            });
            document.getElementById("selCategoria").innerHTML = txt;
        }
    }

    req.open("GET" , "http://localhost:8001/category");
    req.send();

}