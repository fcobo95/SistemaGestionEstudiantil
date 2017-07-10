from flask import Flask
import cx_Oracle

app = Flask(__name__)

#Conexión a base de datos (Oracle Express Edition 11g)
TNS = cx_Oracle.makedsn('localhost',1521,'XE')
laBaseDeDatos = cx_Oracle.connect('TCU','oracle',TNS) #usuario/contraseña
elCursor = laBaseDeDatos.cursor()

elCursor.execute('SELECT * FROM ESTUDIANTE')
for registro in elCursor:
    print (registro)

@app.route('/')
def hello_world():
   return 'Hola Mundo'

if __name__ == '__main__':
    app.run()
