from flask import Flask
import cx_Oracle

app = Flask(__name__)

#Conexión a base de datos (Oracle Express Edition 11g)
con = cx_Oracle.connect('TCU/oracle@127.0.0.1') #usuario/contraseña
print (con.version)
con.close()

if __name__ == '__main__':
    app.run()
