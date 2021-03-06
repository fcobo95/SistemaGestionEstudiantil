function agregarNuevoProfesor() {

// Se recolectan los datos del HTML
    var identificacion = $("#identificacion").val();
    var nombre = $("#nombre").val();
    var primerApellido = $("#primerApellido").val();
    var segundoApellido = $("#segundoApellido").val();
    var telefono = $("#telefono").val();
    var correo = $("#correo").val();

//Se convierten a JSON
     var losDatos = JSON.stringify({
        identificacion: identificacion,
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        telefono: telefono,
        correo: correo});

//Se envía el JSON al servidor a través de AJAX
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://127.0.0.1:5000/nuevoProfesor",
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
   //TODO: REPUESTA CORRECTA, NO SÓLO SUCCESS (AUNQUE LO ANTERIOR FUNCIONA).

       /*  success: function (response) {
            console.log(response);
            $("#result").addClass("alert alert-success").text("Lo datos se han almacenado correctamente.");
            $("#result").alert();
        },
        error: function (response) {
           console.log(response);
            $("#result").addClass("alert alert-danger").text("No es posible guardar los datos.");
            $("#result").alert();
        }
        */
    });
}