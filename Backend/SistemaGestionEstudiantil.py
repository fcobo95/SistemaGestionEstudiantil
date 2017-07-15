from flask import Flask, request, json, Response
import cx_Oracle

app = Flask(__name__)

# Conexión a base de datos (Oracle Express Edition 11g)
TNS = cx_Oracle.makedsn('localhost', 1521, 'XE')
laBaseDeDatos = cx_Oracle.connect('TCU', 'oracle', TNS)  # usuario/contraseña
elCursor = laBaseDeDatos.cursor()

elCursor.execute('SELECT * FROM ESTUDIANTE')
for registro in elCursor:
    print(registro)


@app.route('/')
def hello_world():
    return 'Hola Mundo'


@app.route('/nuevoRegistro', methods=['POST'])
def agregueRegistro():
    # Se reciben datos del estudiante y del encargado. Se ingresan a la BD primero los del encargado

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

    # Datos encargado
    laIdentificacionEncargado = request.json['IDencargado']  # Id del encargado que se asocia a estudiante
    elNombreEncargado = request.json['nombreEncargado']
    elTelefono = request.json['telefono']
    elParentesco = request.json['parentesco']
    laDireccion = request.json['direccion']
    elTelefonoComoNumero = int(elTelefono)

    try:

        laConsulta = 'INSERT INTO ENCARGADO(IDENTIFICACION, NOMBRE_COMPLETO, TELEFONO, PARENTESCO, DIRECCION) ' \
                     'VALUES (:1,:2, :3, :4, :5)'
        elCursor.execute(laConsulta,
                         (laIdentificacionEncargado, elNombreEncargado, elTelefonoComoNumero, elParentesco, laDireccion))
        laBaseDeDatos.commit()

        laConsulta = 'INSERT INTO ESTUDIANTE (IDENTIFICACION, NOMBRE, APELLIDO1, APELLIDO2, SEXO, FECHA_NACIMIENTO, ' \
                     'CICLO, NIVEL, SECCION, ENCARGADO) VALUES (:1,:2, :3, :4, :5, :6, :7, :8, :9, :10)'
        elCursor.execute(laConsulta,
                         (laIdentificacion, elNombre, elPrimerApellido, elSegundoApellido, elSexo,
                          laFechaNacimiento, elCiclo, elNivelComoNumero, laSeccion, laIdentificacionEncargado))
        laBaseDeDatos.commit()

        print(laIdentificacionEncargado, elNombreEncargado, elTelefono, elParentesco, laDireccion)
        print(laIdentificacion, elNombre, elPrimerApellido, elSegundoApellido, elSexo,
                          laFechaNacimiento, elCiclo, elNivel, laSeccion, laIdentificacionEncargado)

        elTexto = "Los datos se han ingresado con éxito"
        laRespuesta = json.dumps(elTexto)  # convertir respuesta a json
        return Response(laRespuesta, 200, mimetype="application/json")

    except Exception as e:
        print(e)
        elTexto = "Error: Imposible almacenar los datos"
        laRespuesta = json.dumps(elTexto)
        return Response(laRespuesta, 200, mimetype="application/json")


if __name__ == '__main__':
    app.run(debug=True,port=5000,host='0.0.0.0')
