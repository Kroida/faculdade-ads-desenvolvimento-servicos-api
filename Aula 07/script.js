const divContent = document.getElementById("divContent");

function lerXML() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            const dadosXML = this.responseXML;
            nome = dadosXML.getElementsByTagName("nome")[0].childNodes[0].nodeValue;
            idade = dadosXML.getElementsByTagName("idade")[0].childNodes[0].nodeValue;
            arrayFormacao = dadosXML.getElementsByTagName("formacao");
            arrayFilho = dadosXML.getElementsByTagName("filho");

            var txt = "Nome: " + nome + "<br>Idade: " + idade + "<br>Formações: ";

            for(i = 0; i < arrayFormacao.length; i++) {
                txt += arrayFormacao[i].childNodes[0].nodeValue;
            }

            txt += "<br>Filhos: ";

            for(i = 0; i < arrayFilho.length; i++) {
                txt += "<br>Nome: " + arrayFilho[i].getElementsByTagName("nome")[0].childNodes[0].nodeValue;
                txt += "<br>Idade: " + arrayFilho[i].getElementsByTagName("idade")[0].childNodes[0].nodeValue;
            }

            divContent.innerHTML = txt;
        }
    }

    req.open("GET", "dados.xml");
    req.send();
}