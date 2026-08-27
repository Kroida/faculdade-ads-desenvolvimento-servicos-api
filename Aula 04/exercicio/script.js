function converterValor() {
    const txt = document.getElementById("entry").value;
    const divConteudo = document.getElementById("divConteudo");

    const req = new XMLHttpRequest();

    divConteudo.innerHTML = "Fazendo conversão...";

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            divConteudo.innerHTML = this.responseText;
        }

        if (this.readyState == 4 && this.status == 404) {
            divNumeros.innerHTML = "Código: " + this.status + " - " + this.statusText;
        }
    }

    req.open("GET", "servidor.php?valor=" + txt, true);
    req.send();
}