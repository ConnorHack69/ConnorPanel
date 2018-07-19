import os
import subprocess
import json

import mysql.connector

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
	domain = request.form['domain']
	metodo = request.form['metodo']

	if metodo == "all":
		metodo=""

	if domain != '':
		some_command = "echo '001FAF7C6677' | sudo -S python /var/www/html/ConnorPanel/funciones/funciones.py " + str(domain) + " " + metodo
		p = subprocess.Popen(some_command, stdout=subprocess.PIPE, shell=True)
		(output, err) = p.communicate()
		p_status = p.wait()
		return jsonify({"domain" : output})
	else:
		return jsonify({"error" : "Falta el dominio!"})

@app.route('/getBBDDconfig', methods=['POST'])
def getBBDDconfig():
	config = {
	  'user': 'root',
	  'password': '001FAF7C6677',
	  'host': '127.0.0.1',
	  'database': 'panel'
	}
	cnx = mysql.connector.connect(**config)
	cursor = cnx.cursor()

	cursor.execute("SELECT jsonKey, value FROM conf_core")

	configuracion = {}

	for (jsonKey, value) in cursor:
		# jsonKey == interfaz_panel_buscador_buscarDominioIP_urlAjax
		claveDividida = jsonKey.split("_")

		ultimaClave = claveDividida[-1]
		claveDividida.pop()

		# claveDividida == ["interfaz","panel","buscador","buscarDominioIP"]
		# ultimaClave == ["urlAjax"]

		tempDatos = configuracion

		for clave in claveDividida:
			try:
			    tempDatos[clave]
			except:
			    tempDatos[clave] = {}
			tempDatos = tempDatos[clave]

		# tempDatos == tempDatos["interfaz"]["panel"]["buscador"]["busdarDominioIP"]
		if value.isdigit():
			tempDatos[ultimaClave] = int(value)
		else:
			if value[0] == "[" and value[-1] == "]": # Listas ["insertarDominio", "getDominios"] los parseamos a list
				tempDatos[ultimaClave] = map(unicode.strip, value.replace("[","").replace("]","").replace("\"","").split(","))
			elif value[0] == "/":
				tempDatos[ultimaClave] = value
			else:
				if "true" == value:
					tempDatos[ultimaClave] = True
				elif "false" == value:
					tempDatos[ultimaClave] = False
				else:
					tempDatos[ultimaClave] = value

		print value
	cursor.close()
	cnx.close()

	return jsonify(configuracion)

if __name__ == '__main__':
	app.run(debug=True, threaded=True)