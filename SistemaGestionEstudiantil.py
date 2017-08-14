from flask import Flask, request, json, Response, redirect, render_template
import cx_Oracle
from datetime import datetime

app = Flask(__name__)

# Conexión a base de datos (Oracle Express Edition 11g)
TNS = cx_Oracle.makedsn('localhost', 1521, 'XE')
laBaseDeDatos = cx_Oracle.connect('TCU', 'oracle', TNS)  # usuario/contraseña
elCursor = laBaseDeDatos.cursor()


# elCursor.execute('SELECT * FROM ESTUDIANTE')
# for registro in elCursor:
#    print(registro)


@app.route('/')
def redirecciona():
    return redirect('/Login',302)

@app.route('/Login')
def login():
    return render_template('Login.html')

@app.route('/formularioIngreso')
def muestreFormulario():
    return render_template('NuevoIngreso.html')

@app.route('/formularioProfesor')
def muestreFormularioProfesor():
    return render_template('NuevoProfesor.html')

@app.route('/Consultas')
def consulte():
    return render_template('Consultas.html')

@app.route('/informeHogar')
def muestreInformeHogar():
    return render_template('PlantillaInformaHogar.html')

@app.route('/formula14')
def muestreFormula14():
    return render_template('Formula14.html')

#TODO: MÉTODO PARA ERRORES
@app.route('/nuevoRegistro', methods=['POST'])
def agregueRegistro():
    print(request.json)
    # Se reciben datos del estudiante y del encargado. Se ingresan a la BD primero los del encargado
    # TODO: OPCIÓN PARA SELECCIONAR ENCARGADO EXISTENTE A UN NUEVO ALUMNO (CREAR NUEVO ENCARGADO O SELECCIONAR)

    # Datos estudiante
    laIdentificacion = request.json['identificacion']
    elNombre = request.json['nombre']
    elPrimerApellido = request.json['primerApellido']
    elSegundoApellido = request.json['segundoApellido']
    elSexo = request.json['sexo']
    laFechaNacimiento = request.json['fechaNacimiento']
    elCiclo = request.json['ciclo']
    elNivel = request.json['nivel']
    laSeccion = request.json['seccion']
    elNivelComoNumero = int(elNivel)

    if elSexo=='Hombre':
        elSexoComoChar = "H"
    if elSexo == 'Mujer':
        elSexoComoChar = "M"

    laFechaDividida = laFechaNacimiento.split("-")
    elAno = laFechaDividida[0]
    elMes = laFechaDividida[1]
    elDia = laFechaDividida[2]
    laFechaFormateada =  elDia+"/"+elMes+"/"+elAno

    # Datos encargado
    laIdentificacionEncargado = request.json['IDencargado']  # Id del encargado que se asocia a estudiante
    elNombreEncargado = request.json['nombreEncargado']
    elTelefono = request.json['telefono']
    elParentesco = request.json['parentesco']
    laDireccion = request.json['direccion']
    elCorreo = request.json['correo']
    elTelefonoComoNumero = int(elTelefono)

    try:

        laConsulta = 'INSERT INTO ENCARGADO(IDENTIFICACION, NOMBRE_COMPLETO, TELEFONO, PARENTESCO, DIRECCION, CORREO) ' \
                     'VALUES (:1,:2, :3, :4, :5, :6)'
        elCursor.execute(laConsulta,
                         (
                         laIdentificacionEncargado, elNombreEncargado, elTelefonoComoNumero, elParentesco, laDireccion, elCorreo))
        laBaseDeDatos.commit()

        laConsulta = 'INSERT INTO ESTUDIANTE (IDENTIFICACION, NOMBRE, APELLIDO1, APELLIDO2, SEXO, FECHA_NACIMIENTO, ' \
                     'CICLO, NIVEL, SECCION, ENCARGADO) VALUES (:1,:2, :3, :4, :5, :6, :7, :8, :9, :10)'
        elCursor.execute(laConsulta,
                         (laIdentificacion, elNombre, elPrimerApellido, elSegundoApellido, elSexoComoChar,
                         laFechaFormateada, elCiclo.upper(), elNivelComoNumero, laSeccion, laIdentificacionEncargado))
        # datetime.strptime(laFechaNacimiento, "%d%m%Y")
        laBaseDeDatos.commit()

        elTexto = "Los datos se han ingresado con éxito"
        laRespuesta = json.dumps(elTexto)  # convertir respuesta a json
        return Response(laRespuesta, 200, mimetype="application/json")

    except Exception as e:
        print(e)
        elTexto = "Error: Imposible almacenar los datos"
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")


@app.route('/nuevoProfesor', methods=['POST'])
def nuevoProfesor():
    print(request.json)
    laIdentificacion = request.json['identificacion']
    elNombre = request.json['nombre']
    elPrimerApellido = request.json['primerApellido']
    elSegundoApellido = request.json['segundoApellido']
    elTelefono = request.json['telefono']
    elCorreo = request.json['correo']

    if elTelefono != '' and elTelefono != 0:
        elTelefonoComoNumero = int(elTelefono)
    else:
        elTelefonoComoNumero = ''

    try:
        laConsulta = 'INSERT INTO PROFESOR(IDENTIFICACION, NOMBRE, APELLIDO1, APELLIDO2,TELEFONO,CORREO) ' \
                     'VALUES (:1, :2, :3, :4, :5, :6)'
        elCursor.execute(laConsulta,
                         (laIdentificacion, elNombre, elPrimerApellido, elSegundoApellido, elTelefonoComoNumero, elCorreo))
        laBaseDeDatos.commit()

        elTexto = "Los datos se han ingresado con éxito."
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")

    except Exception as e:
        print(e)
        elTexto = "¡ERROR! Imposible almacenar los datos."
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, mimetype="application/json")


@app.route('/profesorMateria', methods=['POST'])
def asigneMateriaProfesor():
    # TODO: SOLUCIONAR PROBLEMA EN EL EXECUTE

    elProfesor = request.json['profesor']
    lasMaterias = request.json['materia']  # "materia" : "materia1, materia2..."

    lasMateriasComoLista = lasMaterias.split(',')

    try:
        for cadaMateria in lasMateriasComoLista:
            laConsulta = 'INSERT INTO PROFESOR_MATERIA(PROFESOR, MATERIA) VALUES (:1, :2)'
            # elCursor.execute(laConsulta, (elProfesor, cadaMateria))
            # laBaseDeDatos.commit()

        elTexto = "Los datos se han ingresado con éxito"
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")

    except Exception as e:
        print(e)
        elTexto = "Error: Imposible almacenar los datos"
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")


@app.route('/calificaciones', methods=['POST'])
def asigneCalificaciones():
    elEstudiante = request.json['estudiante']
    laMateria = request.json['materia']
    elPeriodo1 = request.json['elPeriodo1']
    elPeriodo2 = request.json['elPeriodo2']
    elPeriodo3 = request.json['elPeriodo3']
    elResultadoFinal = request.json['resultadoFinal']
    laCondicion = request.json['condicion']
    elAno = request.json['elAno']
    #TODO:En cliente, por defecto debe haber cero en los tres períodos y en resultadoFinal, y la condición "En Proceso"
    elPeriodo1ComoNumero = int(elPeriodo1)
    elPeriodo2ComoNumero = int(elPeriodo2)
    elPeriodo3ComoNumero = int(elPeriodo3)
    elResultadoFinalComoNumero = int(elResultadoFinal)
    elAnoComoNumero = int(elAno)

    try:
        laConsulta = 'INSERT INTO CALIFICACION(ESTUDIANTE, MATERIA, PERIODO1, PERIODO2, PERIODO3, RESULTADO_FINAL, ' \
                     'CONDICION, ANO) VALUES (:1, :2, :3, :4, :5, :6, :7, :8)'
        elCursor.execute(laConsulta,
                        (elEstudiante, laMateria, elPeriodo1ComoNumero, elPeriodo2ComoNumero, elPeriodo3ComoNumero,
                         elResultadoFinalComoNumero, laCondicion, elAnoComoNumero))
        laBaseDeDatos.commit()

        elTexto = "Los datos se han ingresado con éxito"
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")

    except Exception as e:
        print(e)
        elTexto = "Error: Imposible almacenar los datos"
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")

@app.route('/actualizarRegistro', methods=['POST'])
def actualiceRegistro():
    return ''

@app.route('/obtengaSecciones', methods=['POST'])
def obtengaSecciones():
    elNivel = request.json['nivel']
    lasSecciones = []
    try:
        laConsulta = 'SELECT SECCION FROM ESTUDIANTE WHERE NIVEL=' + elNivel + ' GROUP BY SECCION'
        elCursor.execute(laConsulta)
        for cadaResultado in elCursor:
            lasSecciones.append(cadaResultado[0])

        elJSON = {'secciones': lasSecciones}
        laRespuesta = json.dumps(elJSON)
        return Response(laRespuesta, 200, mimetype="application/json")

    except Exception as e:
        print(e)
        elTexto = "Error: Imposible obtener los datos"
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")

@app.route('/obtengaEstudiantes', methods=['POST'])
def obtengaEstudiantes():
    laSeccion = request.json['seccion']
    losEstudiantes = {}
    try:
        laConsulta = "SELECT IDENTIFICACION, NOMBRE, APELLIDO1, APELLIDO2 FROM ESTUDIANTE WHERE SECCION=" \
                     + "'" + laSeccion + "'"
        elCursor.execute(laConsulta)
        elContador = 1
        for cadaResultado in elCursor:
            laIdentificacion = cadaResultado[0]
            elNombre = cadaResultado[1]
            elApellido1 = cadaResultado[2]
            elApellido2 = cadaResultado[3]

            losEstudiantes[elContador] = {"identificacion":laIdentificacion, "nombre":elNombre,
                                          "apellido1":elApellido1, "apellido2":elApellido2}
            elContador+=1

        laRespuesta = json.dumps(losEstudiantes)
        return Response(laRespuesta, 200, mimetype="application/json")

    except Exception as e:
        print(e)
        elTexto = "Error: Imposible obtener los datos"
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
