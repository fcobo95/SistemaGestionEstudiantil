function agregarNuevoProfesor() {

    var identificacion = $("#identificacion").val();
    var nombre = $("#nombre").val();
    var primerApellido = $("#primerApellido").val();
    var segundoApellido = $("#segundoApellido").val();
    var telefono = $("#telefono").val();

    $.ajax({
        "async": true,
        url: '/nuevoProfesor',
        data: $('form').serialize(),
        type: 'POST',
        success: function (response) {
            console.log(response);
            alert('Los datos se han guardado correctamente')
        },
        error: function (response) {
             console.log(response);
            alert('Ha ocurrido un error')
        }
    });
}