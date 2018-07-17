import os
import subprocess

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

@app.route('/bbdd')
def bbdd():
	config = {
	  'user': 'root',
	  'password': '001FAF7C6677',
	  'host': '127.0.0.1',
	  'database': 'panel'
	}
	cnx = mysql.connector.connect(**config)
	cursor = cnx.cursor()

	cursor.execute("SELECT dominio, ip, location, lon, lat FROM dominio")
	datos = ''
	for (dominio, ip, location, lon, lat) in cursor:
		datos+=str(str("dominio: ") + str(dominio) + str(", ip: ") + str(ip) + str(", location: ") + str(location) + str(", lon: ") + str(lon )+ str(", lat: ") + str(lat) + str("; "))

	cursor.close()
	cnx.close()

	return datos
if __name__ == '__main__':
	app.run(debug=True, threaded=True)