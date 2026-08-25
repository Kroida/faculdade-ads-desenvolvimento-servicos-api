function lerDados() {
    const divDados = document.getElementById("divDados");
    divDados.innerHTML = "Carregando...";

    var req = new XMLHttpRequest();

    // Mudança de evento, quando mudar o ready state
    // Tudo dentro da função será executado quando o state mudar
    req.onreadystatechange = function() {
        alert("readyState: " + this.readyState);

        if (this.readyState == 4 && this.status == 200) {
            divDados.innerHTML = this.responseText;
        }
    }
    
    req.open("GET", "dados.txt", true);
    req.send();
}

function gerarNumeros() {
    const divNumeros = document.getElementById("divNumeros");
    const numero = document.getElementById("txtNumero").value;
    var req = new XMLHttpRequest();

    divNumeros.innerHTML = "Carregando...";

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            divNumeros.innerHTML = this.responseText;
        }

        if (this.readyState == 4 && this.status == 404) {
            divNumeros.innerHTML = "Código: " + this.status + " - " + this.statusText;
        }
    };
    
    req.open("GET", "servidor.php?valor=" + numero, true);
    req.send();
}