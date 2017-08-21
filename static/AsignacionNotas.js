
var laCantidadDeMaterias = 0;
var laCantidadDeInputs = 0;
var laCantEstudiantes = 0;
var table = document.createElement('table'), tr, td, th, fila, columna;

function muestreMaterias(){
    var elNivel = document.getElementById("nivel").value;
    var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://127.0.0.1:5000/obtengaMaterias",
            "method": "POST",
            "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "c74b583f-d742-4792-0dc8-29732420b2bf"
        },
        "processData": false,
        "data": JSON.stringify({"nivel":elNivel})
        }

        $.ajax(settings).done(function (response) {
        laCantidadDeMaterias = Object.keys(response).length;
        localStorage.setItem("materias",laCantidadDeMaterias);

        elContador = 1;
        lasMaterias =[];
        while (elContador < laCantidadDeMaterias + 1) {
            laIdentificacion = response[elContador.toString()]["identificacion"];
            laMateria = response[elContador.toString()]["nombre"]+",";
            lasMaterias += [laMateria]
            lasMateriasSeparadas = lasMaterias.split(",");
            elContador+=1
        }
               for (fila = 0; fila < 1; fila++) {
                tr = document.createElement('tr');
                tr.innerHTML = "ESTUDIANTE";

                for (columna = 0; columna < laCantidadDeMaterias; columna++) {
                    th = document.createElement('th');
                    tr.appendChild(th);
                    th.innerHTML = lasMateriasSeparadas[columna];
                }
                    th = document.createElement('th');
                    tr.appendChild(th);
                    th.innerHTML = "CONDICION";

               table.appendChild(tr);
            }
            document.getElementById('tabla').appendChild(table);
    });
}

function muestreEstudiantes(){
	var laSeccion = document.getElementById("seccion").value;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://127.0.0.1:5000/obtengaEstudiantes",
            "method": "POST",
            "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "c74b583f-d742-4792-0dc8-29732420b2bf"
        },
        "processData": false,
        "data": JSON.stringify({"seccion":laSeccion})
        }

        $.ajax(settings).done(function (response) {

            sessionStorage.clear();
            laCantidadDeEstudiantes = Object.keys(response).length;
            localStorage.setItem("estudiantes",laCantidadDeEstudiantes);

            elContador = 1;
            while (elContador < laCantidadDeEstudiantes + 1) {
                laIdentificacion = response[elContador.toString()]["identificacion"];
                elNombre = response[elContador.toString()]["nombre"];
                elApellido1 = response[elContador.toString()]["apellido1"];
                elApellido2 = response[elContador.toString()]["apellido2"];
                elNombreCompleto = elNombre + " " + elApellido1 + " " + elApellido2

                sessionStorage.setItem(elContador, laIdentificacion);

            for (fila = laCantidadDeEstudiantes; fila >= laCantidadDeEstudiantes; fila--) {
                tr = document.createElement('tr');
                tr.innerHTML = elNombreCompleto;
                for (columna = 0; columna < laCantidadDeMaterias; columna++) {
                    td = document.createElement('td');
                    tr.appendChild(td);
                    td.innerHTML = "";

                    input = document.createElement('input');
                    input.setAttribute("id", "input"+laCantidadDeInputs);
                    td.appendChild(input);
                    laCantidadDeInputs++;
                }
                var estado = ["","EN PROCESO","APROBADO","REPROBADO"];
                td = document.createElement('select');
                td.setAttribute("id", "select"+laCantEstudiantes);
                laCantEstudiantes++;
                tr.appendChild(td);

                var option ="";
                for (contador = 0; contador < estado.length; contador++) {
                    option = document.createElement('option');
                    option.value = estado[contador];
                    option.text = estado[contador];
                    td.appendChild(option);
                }
                table.appendChild(tr);
            }
            document.getElementById('tabla').appendChild(table);

            elContador+=1
            }
        });
        $("#btnEnvio").show();
}
function enviarDatos(){


      $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://127.0.0.1:5000/calificaciones",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
      },
      "processData": false,
      "data": losDatos,
      success: function (response) {
            console.log(response);
            $("#result").addClass("alert alert-info").text(response);
            $("#result").alert();
      }
   });
}
