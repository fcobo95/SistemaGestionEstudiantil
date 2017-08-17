function agregarNuevoIngreso() {

    var Identificacion = $("#identificacion").val();
    var Periodo = $("#Periodo").val();
    var Ano = $("#Ano").val();
    var Tardias = $("#Tardias").val();
    var Motivadas = $("#Motivadas").val();
    var Inmotivadas = $("#Inmotivadas").val();

    var losDatos = JSON.stringify({
        identificacion: Identificacion,
        periodo: Periodo,
        ano: Ano,
        tardias: Tardias,
        motivadas: Motivadas,
        inmotivadas: Inmotivadas
    });

    var settings = {
        "async": true,
        "url": "http://127.0.0.1:5000/ingresoAsistencia",
        "method": "GET",
        "dataType": "json",
        success: function (response) {
            console.log(response);
            alert("Se han guardado los datos ingresados!");
            window.location.href = "/index";
        },
        error: function (response) {
            console.log(response);
            alert("Error: " + response['statusText'])
        }
    }
}