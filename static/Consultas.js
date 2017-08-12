function modificarNivel(){

    $(".alert").hide()

    var elMenuDeCiclos = document.getElementById("ciclo");
    var elCiclo = elMenuDeCiclos.options[elMenuDeCiclos.selectedIndex].text;

    var elMenuDeNiveles= document.getElementById("nivel");
    $('#nivel').empty();

    switch (elCiclo)
    {
        case 'Primer':
        for(elNivel = 1; elNivel < 4; elNivel++){
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elNivel.toString();
            elMenuDeNiveles.add(nuevoElemento);
            console.log(nuevoElemento.text);
        }
        break;

        case 'Segundo':
        for(elNivel = 4; elNivel < 7; elNivel++){
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elNivel.toString();
            elMenuDeNiveles.add(nuevoElemento);
            console.log(nuevoElemento.text);
        }
        break;

        case 'Tercer':
        for(elNivel = 7; elNivel < 10; elNivel++){
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elNivel.toString();
            elMenuDeNiveles.add(nuevoElemento);
            console.log(nuevoElemento.text);
        }
        break;

        case 'Cuarto':
        for(elNivel = 10; elNivel < 12; elNivel++){
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elNivel.toString();
            elMenuDeNiveles.add(nuevoElemento);
            console.log(nuevoElemento.text);
        }
        break;

        default:
            $("#errorCiclo").show()
            //$("#result").addClass("alert alert-warning").text("Seleccione un ciclo.");
            //$("#result").alert();
    }
}