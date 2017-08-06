function agregarNuevoProfesor() {

    var identificacion = $("#identificacion").val();
    var nombre = $("#nombre").val();
    var primerApellido = $("#primerApellido").val();
    var segundoApellido = $("#segundoApellido").val();
    var telefono = $("#telefono").val();
    var correo = $("#correo").val();

    $.ajax({
        "async": true,
        url: '/nuevoProfesor',
        data: $('form').serialize(),
        type: 'POST',
        success: function (response) {
            console.log(response);
            $("#result").addClass("alert alert-success").text("Lo datos se han almacenado correctamente.");
            $("#result").alert();
        },
        error: function (response) {
            console.log(response);
            $("#result").addClass("alert alert-danger").text("No es posible guardar los datos.");
            $("#result").alert();
        }
    });
}