import os
import subprocess

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

if __name__ == '__main__':
	app.run(debug=True, threaded=True)