function agregarNuevoIngreso() {

    var idEstudiante = $("#idEstudiante").val();
    var nombreEstudiante = $("#nombreEstudiante").val();
    var apellidoEstudiante1 = $("#email").val();
    var apellidoEstudiante2 = $("#user").val();
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
        direccion: direccion});

    $.ajax({
        "async": true,
        "url": "/nuevoRegistro",
        "method": "POST",
        "dataType": "json",
        "processData": false,
        "data": losDatos,
        success: function (response) {
            console.log(response);
            alert(response)
        },
        error: function (response) {
            console.log(response);
            alert(response)
        }
    });
}