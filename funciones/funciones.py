# encoding=utf8  
import sys  

reload(sys)  
sys.setdefaultencoding('utf8')

import os
import subprocess
import requests
import json

class Funciones(object):

	domain=''

	def __init__(self, dominio):
		super(Funciones, self).__init__()
		self.root="/root/Yuki-Chan-The-Auto-Pentest/"
		self.domain = dominio

	def getWhoIs(self):
		res=[]
		output=subprocess.Popen(['whois', self.domain], stdout=subprocess.PIPE).stdout.readlines()
		for ou in output:
			if "no dispone de servidor whois" in ou:
				res.append({"error" : "no_whois"})
			if "Contact Phone" in ou:
				num=ou.split(":")
				if num[1] != '\n':
					parsedNum=num[1].split("\n")[0].strip().replace("."," ")
					res.append({"phone" : parsedNum})
			if "Province" in ou:
				prov = ou.split(":")[1].replace("\n","").strip()
				if prov:
					res.append({'province' : prov})
			if "Tech City" in ou:
				city = ou.split(":")[1].replace("\n","").strip()
				if city:
					res.append({'city' : city})
			if "Acceso restringido" in ou:
				res.append({"error" : "Acceso restringido"})
		return json.dumps({"getWhoIs" : res})

	def getNsLookUp(self):
		res=[]
		output=subprocess.Popen(['nslookup', self.domain], stdout=subprocess.PIPE).stdout.readlines()
		for ou in output:
			if "Address" in ou:
				num=ou.split(":")
				if num[1] != '\n' and "#" not in num[1]:
					parsedNum=num[1].split("\n")[0].strip()
					res.append({"ip" : parsedNum})
		return json.dumps({"getNsLookUp" : res})

	def getNmap(self):
		res=[]
		ports=[]
		output=subprocess.Popen(['nmap', '-v', '-O', self.domain], stdout=subprocess.PIPE).stdout.readlines()
		for ou in output:
			if ou[0].isdigit():
				ports.append({"port" : ou.replace("/", " ").replace("open","").replace("\n","")})
			if "Running " in ou:
				res.append({"OS" : ou.split(":")[1].replace("\n","")})
			#if "Aggressive OS guesses" in ou:
				#res.append({'OS_aggresive' : ou.split(":")[1]})
		res.append({"ports" : ports})
		return json.dumps({"getNmap" : res})

	def getHarvest(self, buscador="all", cantidad=1000):
		# Permisos modulo
		permisos = "sudo chmod 755 " + self.root + "Module/theHarvester/theHarvester.py"
		os.system(permisos)

		buscadores = ["Threatcrowd","crtsh","google","googleCSE","google-profiles","bing","bingapi",
						"dogpile","pgp","linkedin","vhost","twitter","googleplus","yahoo","baidu","shodan"]

		if buscador != "all":
			for busc in buscadores:
				if buscador in busc:
					res=[]
					output=subprocess.Popen([self.root + "Module/theHarvester/theHarvester.py", "-d", self.domain , "-l", str(cantidad), "-b", busc], stdout=subprocess.PIPE).stdout.readlines()
					for ou in output:
						if "@" in ou:
							res.append({"email" : ou.replace("\n","").replace("*","").strip()})
					return json.dumps({"getHarvest" : res})
		else:
			res=[]
			output=subprocess.Popen([self.root + "Module/theHarvester/theHarvester.py", "-d", self.domain , "-l", str(cantidad), "-b", buscador], stdout=subprocess.PIPE).stdout.readlines()
			for ou in output:
				if "@" in ou:
					res.append({"email" : ou.replace("\n","").replace("*","").strip()})
			return json.dumps({"getHarvest" : res})

	def getSublist3r(self):
		# Permisos modulo
		permisos = "sudo chmod 755 " + self.root + "Module/sublist3r/sublist3r.py"
		os.system(permisos)

		res=[]
		output=subprocess.Popen([self.root + "Module/sublist3r/sublist3r.py", "--domain", self.domain], stdout=subprocess.PIPE).stdout.readlines()
		encontrado=False
		for ou in output:
			if "[-]" not in ou and self.domain in ou:
				encontrado=True
				res.append({"domain" : str("http://") + ou.replace("\n","").split(self.domain)[0].split("92m")[1].strip() + str(self.domain)})
		if not encontrado:
			res.append({"error" : "No se han encontrado subdominios"})
		return json.dumps({"getSublist3r_" + str(self.domain) : res})

	def getWafW00f(self):
		res=[]
		output=subprocess.Popen(['wafw00f', self.domain], stdout=subprocess.PIPE).stdout.readlines()
		for ou in output:
			if "No WAF detected" in ou:
				res.append({"WAF" : "false"})
			if "seems to be behind a WAF" in ou:
				res.append({"WAF" : "true"})
			if "is behind a" in ou:
				res.append({"firewall" : ou.split("is behind a")[1].replace("\n","").strip()})
			if "a normal response is" in ou:
				res.append({"header_normal" : ou.split("a normal response is")[1].split(",")[0].replace('\"',"").replace("\n","").strip()})
			if "a response to an attack is" in ou:
				res.append({"header_attacker" : ou.split("a response to an attack is")[1].split(",")[0].replace('\"',"").replace("\n","").strip()})
		return json.dumps({"getWafW00f" : res})
		
	def getXSS(self):
		# Permisos modulo
		permisos = "sudo chmod 755 " + self.root + "Module/XssPy.py"
		os.system(permisos)

		res=[]
		vulnerables=False
		try:
			output=subprocess.Popen(["sh", self.root + "Module/XssPy.py", "-u", self.domain], stdout=subprocess.PIPE).stdout.readlines()
			for ou in output:
				if "No link found" in ou:
					res.append({"xss" : "false"})
				if "Vulnerable" in ou and "found" in ou:
					vulnerables=True

			if vulnerables:
				res.append({"links" : "Hay links vulnerables"})
			else:
				res.append({"links" : "NO hay links vulnerables"})
		except:
			res.append({"links" : "NO hay links vulnerables"})
		return json.dumps({"getXSS" : res})
		
	def getWhatWeb(self):
		# Permisos modulo
		permisos = "sudo chmod 755 " + self.root + "Module/WhatWeb/whatweb"
		os.system(permisos)

		res=[]
		output=subprocess.Popen([self.root + "Module/WhatWeb/whatweb", self.domain], stdout=subprocess.PIPE).stdout.readlines()
		hasTitle=False
		for ou in output:
			if "Title" in ou and not "Forbidden" in ou and not "301 Moved" in ou:
				hasTitle=True
				titulo=ou.split("Title")[1].split("33m")[1].split("]")[0].split("\\")[0].strip()
				if "\xc3\xb1" in ou:
					titulo=titulo.replace("\xc3\xb1", "ñ").decode("utf-8")
				if "\x1b" in ou:
					titulo=titulo.split("\x1b")[0]
				res.append({"titulo" : titulo})
		if not hasTitle:
			res.append({"titulo" : "No se ha encontrado el titulo del dominio"})
		return json.dumps({"getWhatWeb" : res})
		
	def getSpaghetti(self):
		# Permisos modulo
		permisos = "sudo chmod 755 " + self.root + "Module/Spaghetti/spaghetti.py"
		os.system(permisos)

		res=[]
		output=subprocess.Popen([self.root + "Module/Spaghetti/spaghetti.py", "--url", "http://"+self.domain,  "--scan", "[0-3]"], stdout=subprocess.PIPE).stdout.readlines()
		for ou in output:
			if "Language" in ou:
				language=r""+ou.split(":")[1].strip()
				res.append({"language" : language.replace("\x1b[0m", "")})
			if "CMS" in ou:
				res.append({"CMS" : ou.split(":")[1].replace("\x1b[0m", "").strip()})
			if "Server" in ou:
				res.append({"server" : ou.split(":")[1].replace("\x1b[0m", "").strip()})
		return json.dumps({"getSpaghetti" : res})
		
	def getWpscan(self):
		res=[]
		output=subprocess.Popen("echo Y | wpscan --url http://"+self.domain+ " --enumerate u", shell=True, stdout=subprocess.PIPE).stdout.readlines()
		encontrado=False
		for ou in output:
			if "Memory used" in ou or "Interesting entry from robots.txt" in ou or "WordPress theme in use" in ou:
				encontrado=True
				res.append({"scan" : ou.split(":")[1].strip()})
		if not encontrado:
			res.append({"scan" : "No se ha podido escanear el servicio WP"})
		return json.dumps({"getWpscan" : res})
		
	def getWpscanner(self):
		# Permisos modulo
		permisos = "sudo chmod 755 " + self.root + "Module/wpscanner.py"
		os.system(permisos)

		res=[]
		output=subprocess.Popen([self.root + "Module/wpscanner.py", "-s", "http://"+self.domain,  "-n", "20"], stdout=subprocess.PIPE).stdout.readlines()
		encontrado=False
		for ou in output:
			if "|" in ou and encontrado:
				res.append({"wps" : {ou.replace("\n","").split("|")[2].strip():ou.replace("\n","").split("|")[3].split(" ")[1].strip()}})
			if "Login" in ou and "Name" in ou:
				encontrado=True
			if "Could not find anything" in ou:
				res.append({"wps" : 'no_wpscanner'})
		return json.dumps({"getWpscanner" : res})
		
	def getWordPress(self):
		res=[]
		output=subprocess.Popen("droopescan scan wordpress -u http://" + self.domain, shell=True, stdout=subprocess.PIPE).stdout.readlines()
		hayPlugins=False
		for ou in output:
			if "default changelog" in ou:
				res.append({"changelog" : ou})
			if hayPlugins in ou:
				res.append({ou.split(" ")[0] : ou.split(" ")[1].replace("\n","")})
			if "Plugins found" in ou:
				hayPlugins=True
		return json.dumps({"getWordPress" : res})
		
	def getWPSeku(self):
		print("Cargando getWPSeku()")
		command = self.root + "Module/WPSeku/wpseku.py --target http://" + self.domain + " >> " + self.domain + "/wpseku.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getJoomScan(self):
		print("Cargando getJoomScan()")
		command = self.root + "./joomscan -u http://" + self.domain + " >> " + self.domain + "/joomscan.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getJoomla(self):
		print("Cargando getJoomla()")
		command = "droopescan scan joomla -u http://" + self.domain + " >> " + self.domain + "/joomla.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getDrupal(self):
		print("Cargando getDrupal()")
		command = "droopescan scan drupal -u http://" + self.domain + " >> " + self.domain + "/drupal.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getSilverStripe(self):
		print("Cargando getSilverStripe()")
		command = "droopescan scan silverstripe -u http://" + self.domain + " >> " + self.domain + "/silverstripe.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getMoodle(self):
		print("Cargando getMoodle()")
		command = "droopescan scan moodle -u http://" + self.domain + " >> " + self.domain + "/moodle.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getSSLScan(self):
		print("Cargando getSSLScan()")
		command = "sslscan " + self.domain + " >> " + self.domain + "/sslscan.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getSSLyze(self):
		print("Cargando getSSLyze()")
		command = "sslyze --resum --certinfo=basic --compression --reneg --sslv2 --sslv3 --hide_rejected_ciphers " + self.domain + " >> " + self.domain + "/sslyze.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getA2SVu(self):
		print("Cargando getA2SVu()")
		command = self.root + "Module/a2sv/a2sv.py -u " + self.domain + " >> " + self.domain + "/a2svu.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getA2SVt(self):
		print("Cargando getA2SVt()")
		command = self.root + "Module/a2sv/a2sv.py -t " + self.domain + " >> " + self.domain + "/a2svt.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getWaffNinja(self):
		print("Cargando getWaffNinja()")
		command = self.root + "./wafninja fuzz -u 'http://" + self.domain + "/index.php?id=FUZZ' -c 'phpsessid=value' -t xss -o output.html"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getDirSearchPHP(self):
		print("Cargando getDirSearchPHP()")
		command = self.root + "Module/dirsearch/dirsearch.py -u http://" + self.domain + " -e .php" + " >> " + self.domain + "/dirSearchPHP.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getDirSearchASP(self):
		print("Cargando getDirSearchASP()")
		command = self.root + "Module/dirsearch/dirsearch.py -u http://" + self.domain + " -e .asp" + " >> " + self.domain + "/dirSearchASP.txt"
		print("Comando: '"+command+"'")
		os.system(command)

if sys.argv[1]:
	funciones = Funciones(sys.argv[1])
	if len(sys.argv) == 3:
		if sys.argv[2]:
			if sys.argv[2] == "getWhoIs":
				print(funciones.getWhoIs())
			elif sys.argv[2] == "getNsLookUp":
				print(funciones.getNsLookUp())
			elif sys.argv[2] == "getNmap":
				print(funciones.getNmap())
			elif sys.argv[2] == "getHarvest":
				print(funciones.getHarvest())
			elif sys.argv[2] == "getSublist3r":
				print(funciones.getSublist3r())
			elif sys.argv[2] == "getWafW00f":
				print(funciones.getWafW00f())
			elif sys.argv[2] == "getXSS":
				print(funciones.getXSS())
			elif sys.argv[2] == "getWhatWeb":
				print(funciones.getWhatWeb())
			elif sys.argv[2] == "getSpaghetti":
				print(funciones.getSpaghetti())
			elif sys.argv[2] == "getWpscan":
				print(funciones.getWpscan())
			elif sys.argv[2] == "getWpscanner":
				print(funciones.getWpscanner())
			elif sys.argv[2] == "getSilverStripe":
				print(funciones.getSilverStripe())
			elif sys.argv[2] == "getMoodle":
				print(funciones.getMoodle())
			elif sys.argv[2] == "getSSLScan":
				print(funciones.getSSLScan())
			elif sys.argv[2] == "getSSLyze":
				print(funciones.getSSLyze())
			elif sys.argv[2] == "getA2SVu":
				print(funciones.getA2SVu())
			elif sys.argv[2] == "getA2SVt":
				print(funciones.getA2SVt())
			elif sys.argv[2] == "getDirSearchPHP":
				print(funciones.getDirSearchPHP())
			elif sys.argv[2] == "getDirSearchASP":
				print(funciones.getDirSearchASP())
			else:
				print("No existe la funcion")
		else:
			print("No existe la funcion")
	else:
		print("No existe la funcion")