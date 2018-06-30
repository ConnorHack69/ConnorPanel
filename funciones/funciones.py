import os
import requests

class Funciones(object):

	domain=''

	def __init__(self):
		super(Funciones, self).__init__()
		self.root="/home/connor/InfoGathering/Yuki-Chan-The-Auto-Pentest/"

	def getWhoIs(self):
		print("Cargando getWhoIs()")
		command = "whois "+ self.domain + " >> " + self.domain + "/whois.txt"
		print("Comando: '"+command+"'")
		os.system(command)

	def getNsLookUp(self):
		print("Cargando getNsLookUp()")
		command = "nslookup "+ self.domain + " >> " + self.domain + "/nslookup.txt"
		print("Comando: '"+command+"'")
		os.system(command)

	def getNmap(self):
		print("Cargando getNmap()")
		command = "nmap -v -O "+ self.domain + " >> " + self.domain + "/nmap.txt"
		print("Comando: '"+command+"'")
		os.system(command)

	def getHarvest(self, buscador="all", cantidad=1000):
		buscadores = ["Threatcrowd","crtsh","google","googleCSE","google-profiles","bing","bingapi",
						"dogpile","pgp","linkedin","vhost","twitter","googleplus","yahoo","baidu","shodan"]
		if buscador != "all":
			for busc in buscadores:
				if buscador in busc:
					print("Cargando getHarvest("+busc+")")
					command = self.root + "Module/theHarvester/theHarvester.py -d "+self.domain+" -l "+str(cantidad)+" -b " + busc + " >> " + self.domain + "/harvest_"+busc+".txt"
					print("Comando: '"+command+"'")
					os.system(command)
		else:
			print("Cargando getHarvest()")
			command = self.root + "Module/theHarvester/theHarvester.py -d "+self.domain+" -l "+str(cantidad)+" -b " + buscador + " >> " + self.domain + "/harvest_ALL.txt"
			print("Comando: '"+command+"'")
			os.system(command)

	def getMetaGoofil(self):
		print("Cargando getMetaGoofil()")
		command = self.root + "Module/metagoofil/metagoofil.py -d "+self.domain+" -t doc,pdf,xls,csv,txt -l 200 -n 50 -o metagoofiles -f data.html"
		print("Comando: '"+command+"'")
		os.system(command)

	def getDNSRecon(self):
		print("Cargando getDNSRecon()")
		command = self.root + "Module/dnsrecon/dnsrecon.py -d "+ self.domain + " >> " + self.domain + "/dnsRecon.txt"
		print("Comando: '"+command+"'")
		os.system(command)

	def getDig(self):
		print("Cargando getDig()")
		command = "dig -x "+ self.domain + " >> " + self.domain + "/dig.txt"
		print("Comando: '"+command+"'")
		os.system(command)

	def getSublist3r(self):
		print("Cargando getSublist3r()")
		command = self.root + "Module/sublist3r/sublist3r.py --domain "+ self.domain + " >> " + self.domain + "/sublist3er.txt"
		print("Comando: '"+command+"'")
		os.system(command)

	def getWafW00f(self):
		print("Cargando getWafW00f()")
		command = "wafw00f http://"+ self.domain + " >> " + self.domain + "/wafw00f.txt"
		print("Comando: '"+command+"'")
		os.system(command)

	def getFullInfoGath(self):
		print("Cargando getFullInfoGath()")
		command = self.root + "./wafninja bypass -u 'http://" + self.domain + "/index.php' -p 'Name=PAYLOAD&Submit=Submit' -c 'phpsessid=value' -t xss -o output.html"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getXSS(self):
		print("Cargando getXSS()")
		command = self.root + "Module/XssPy.py -u " + self.domain+  " -v" + " >> " + self.domain + "/xss.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getWhatWeb(self):
		print("Cargando getWhatWeb()")
		command = self.root + "Module/WhatWeb/whatweb " + self.domain + " >> " + self.domain + "/whatWeb.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getSpaghetti(self):
		print("Cargando getSpaghetti()")
		command = self.root + "Module/Spaghetti/spaghetti.py --url http://"+self.domain+" --scan [0-3]" + " >> " + self.domain + "/spaghetti.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getWpscan(self):
		print("Cargando getWpscan()")
		command = "wpscan --url http://" + self.domain + " --enumerate u" + " >> " + self.domain + "/wpscan.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getWpscanner(self):
		print("Cargando getWpscanner()")
		command = self.root + "Module/wpscanner.py -s http://" + self.domain + " -n 20" + " >> " + self.domain + "/wpscanner.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
	def getWordPress(self):
		print("Cargando getWordPress()")
		command = "droopescan scan wordpress -u http://" + self.domain + " >> " + self.domain + "/wordpress.txt"
		print("Comando: '"+command+"'")
		os.system(command)
		
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

	def setDominio(self, dominio):
		self.domain = dominio

	def getALL(self):
		if os.geteuid() == 0:
			os.system("mkdir -p " + self.domain)
			self.getWhoIs()
			self.getNsLookUp()
			self.getNmap()
			self.getHarvest()
			#self.getMetaGoofil()
			#self.getDNSRecon()
			self.getDig()
			self.getSublist3r()
			self.getWafW00f()
			#self.getFullInfoGath()
			#self.getXSS()
			self.getWhatWeb()
			self.getSpaghetti()
			#self.getWpscan()
			#self.getWpscanner()
			#self.getWordPress()
			#self.getWPSeku()
			#self.getJoomScan()
			#self.getJoomla()
			#self.getDrupal()
			self.getSilverStripe()
			self.getMoodle()
			self.getSSLScan()
			self.getSSLyze()
			self.getA2SVu()
			self.getA2SVt()
			#self.getWaffNinja()
			self.getDirSearchPHP()
			self.getDirSearchASP()
		else:
			print("No puedes ejecutar estas funciones sin privilegios de administrador")

funciones = Funciones()
funciones.setDominio("geograma.com")
funciones.getALL()
funciones.setDominio("google.com")
funciones.getALL()
funciones.setDominio("welele.es")
funciones.getALL()
funciones.setDominio("pp.es")
funciones.getALL()
funciones.setDominio("psoe.es")
funciones.getALL()
funciones.setDominio("marca.com")
funciones.getALL()