function agregueAsistencia() {

// Se recolectan los datos del HTML
    var Identificacion = ""; /* $("#identificacion").val(); TODO: se puede obtener de session storage. */
    var Periodo = $("#Periodo").val();
    var Ano = $("#Ano").val();
    var Tardias = $("#Tardias").val();
    var Motivadas = $("#Motivadas").val();
    var Inmotivadas = $("#Inmotivadas").val();

//Se convierten a JSON
    var losDatos = JSON.stringify({
        identificacion: Identificacion,
        periodo: Periodo,
        ano: Ano,
        tardias: Tardias,
        motivadas: Motivadas,
        inmotivadas: Inmotivadas
    });

//Se envía el JSON al servidor a través de AJAX
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://127.0.0.1:5000/asignacionAsistencia",
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