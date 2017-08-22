function agregarNuevoIngreso() {

// Se recolectan los datos del HTML
    var idEstudiante = $("#idEstudiante").val();
    var nombreEstudiante = $("#nombreEstudiante").val();
    var apellidoEstudiante1 = $("#apellido1").val();
    var apellidoEstudiante2 = $("#apellido2").val();
    var sexo = $("#sexo").val();
    var fechaNacimiento = $("#nacimiento").val();
    var ciclo = $("#ciclo").val();
    var nivel = $("#nivel").val();
    var seccion = $("#seccion").val();

    var idEncargado = $("#idEncargado").val();
    var nombreEncargado = $("#nombreEncargado").val();
    var telefono = $("#telefono").val();
    var parentesco = $("#parentesco").val();
    var direccion = $("#direccion").val();
    var correo = $("#correo").val();

//Se convierten a JSON
    var losDatos = JSON.stringify({
        identificacion: idEstudiante,
        nombre: nombreEstudiante,
        primerApellido: apellidoEstudiante1,
        segundoApellido: apellidoEstudiante2,
        sexo: sexo,
        fechaNacimiento: fechaNacimiento,
        ciclo: ciclo,
        nivel: nivel,
        seccion: seccion,
        IDencargado: idEncargado,
        nombreEncargado: nombreEncargado,
        telefono: telefono,
        parentesco: parentesco,
        direccion: direccion,
        correo: correo});

//Se envía el JSON al servidor a través de AJAX
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://127.0.0.1:5000/nuevoRegistro",
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