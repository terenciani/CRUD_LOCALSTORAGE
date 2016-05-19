$(function () {
    var operacao = "A";
    var indice_selecionado = -1;
    var tbClientes = localStorage.getItem("tbClientes");
    tbClientes = JSON.parse(tbClientes);
    if (tbClientes == null)
        tbClientes = [];

    $("#formCadastro").on("submit", function () {

        if (operacao == "A")
            adicionarElemento();
        else
            editarElemento();
    });
    
    $("#tbLista").on("click", "#btnEditar", function(){
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        
        var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#txt_nome").val(cli.nome);
        $("#txt_cpf").val(cli.cpf);
        $("#txt_cpf").focus();
    });
    
    $("#tbLista").on("click", "#btnExcluir", function(){
        indice_selecionado = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });
    

    function adicionarElemento() {
        var cliente = JSON.stringify({
            nome: $("#txt_nome").val(),
            cpf: $("#txt_cpf").val()
        });
        tbClientes.push(cliente);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro adicionado com sucesso");
        return true;
    }
    
    function editarElemento(){
         tbClientes[indice_selecionado] = JSON.stringify({
            nome: $("#txt_nome").val(),
            cpf: $("#txt_cpf").val()
        });
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro editado com sucesso");
        operacao = "A";
        return true;
    }
    
    function excluir(){
        tbClientes.splice(indice_selecionado, 1);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro Exluido com Sucesso");
    }

    function listar() {
        $("#tbLista").html("");
        $("#tbLista").html(
                "<thead>" +
                "   <tr>" +
                "       <th>CPF</th>" +
                "       <th>Nome</th>" +
                "       <th></th>" +
                "   </tr>" +
                "</thead>" +
                "<tbody>" +
                "</tbody>"
                );
        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);
            $("#tbLista tbody").append("<tr>");
            $("#tbLista tbody").append("<td>" + 
                    cli.cpf + "</td>");
            $("#tbLista tbody").append("<td>" + 
                    cli.nome + "</td>");
            $("#tbLista tbody").append(
                    "<td> "+
                        " <img src='img/edit.png' alt='" + 
                        i + "' id='btnEditar'></img>"+
                        "<img src='img/delete.png' alt='" + 
                        i + "' id='btnExcluir'></img>"+
                    "</td>");
            $("#tbLista tbody").append("</tr>");
        }
    }

    listar();
});