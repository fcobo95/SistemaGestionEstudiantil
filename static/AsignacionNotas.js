//TODO: CSS de tabla puede ser mejorado.
/*
    Se realizan filtros por Ciclo, Nivel, Sección. Se obtiene desde el servidor,
    los nombres de los estudiantes de la sección seleccionada. A través del nivel,
    se obtienen las materias que esos estudiantes reciben. Con estos datos se crea
    una tabla desde este JS. Los estudiantes se asignan en la primera columna, y las
    materias en el resto de columnas. En las celdas entre materias y estudiantes,
    se crea un input con su respectivo ID para ingresar la calificación. La última
    columna corresponde a el estado final del estudiante (Aprobado...), en esta se
    tiene un select con un ID.
    A través de los ID se recolecta la información ingresada, y se va formando un JSON,
    este JSON es envíado al servidor, en donde se procesa y se guarda en la BD.
*/
var laCantidadDeMaterias = 0;
var laCantidadDeInputs = 0;
var laCantEstudiantes = 0;
var losIdDeLasMaterias =[];
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

        elContador = 1;
        lasMaterias =[];
        while (elContador < laCantidadDeMaterias + 1) {
            laIdentificacion = response[elContador.toString()]["identificacion"]+",";
            losIdDeLasMaterias +=[laIdentificacion];
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
                var estado = ["EN PROCESO","APROBADO","REPROBADO"];
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

   elContadorTotal = 0;
   elContadorDeEstudiantes = 1;
   var elArregloDeDatos = [];
   lasMateriasSeparadas = losIdDeLasMaterias.split(",");

   var elPeriodoSeleccionado = $('#periodo').val();
   var ano = $('#ano').val();

   while (elContadorDeEstudiantes < laCantEstudiantes + 1) {
        var laCondicionSeleccionada= $('#select'+(elContadorDeEstudiantes-1)).val();
       for (cadaMateria = 0; cadaMateria < laCantidadDeMaterias; cadaMateria++) {
            elArregloDeDatos += '{"estudiante":"'+sessionStorage.getItem(elContadorDeEstudiantes)+ '", ';
            if(document.getElementById('input'+cadaMateria).value == ""){
                elArregloDeDatos += '"materia":"'+lasMateriasSeparadas[cadaMateria]+'", "elPeriodo'+elPeriodoSeleccionado  +'":"0", ';
            }
            else{
            elArregloDeDatos += '"materia":"'+lasMateriasSeparadas[cadaMateria] +'", "elPeriodo'+elPeriodoSeleccionado  +'":"'+ document.getElementById('input'+cadaMateria).value +'", ';
            }
       elArregloDeDatos += '"condicion":"' + laCondicionSeleccionada +'", '
       elArregloDeDatos += '"elAno":"' + ano +'", '

       if(elPeriodoSeleccionado == '1')
      {
        elArregloDeDatos +='"elPeriodo2":"0", '
        elArregloDeDatos +='"elPeriodo3":"0"' + '};'
      }
      else if (elPeriodoSeleccionado == '2')
      {
        elArregloDeDatos +='"elPeriodo1":"0", '
        elArregloDeDatos +='"elPeriodo3":0"' + '};'
      }
      else if (elPeriodoSeleccionado == '3')
      {
        elArregloDeDatos +='"elPeriodo1": "0", '
        elArregloDeDatos +='"elPeriodo2": "0"' + '};'
      }
      elContadorTotal+=1;
   }
    elContadorDeEstudiantes +=1;
}

   for (cadaJSON = 0; cadaJSON < elContadorTotal; cadaJSON++) {
      losJSONsSeparados = elArregloDeDatos.split(";");
      losDatos = losJSONsSeparados[cadaJSON]

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
}
