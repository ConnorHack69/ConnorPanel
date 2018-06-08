var CONF = {
	"baseDatos" : {
		"urlAjax" : "php/db/conection.php"
	},
	"core" : {
		"panel" : {
			"minimizar" : {
				"imagen" : "images/minimizar.png"
			}
		}
	},
	"mapa" : {
		"initialCoordinates" : {
			"lon" : 42.854014,
			"lat" : -2.6869315
		},
		"mapbox" : {
			"apiKey" : "pk.eyJ1IjoiaXZhbmNvcmNvbGVzIiwiYSI6ImNpcHhuc2VlbzAwNzhoem0yeGt2dHowNzMifQ.G57kFhckY4Jq00VrVPJ2AQ",
			"style" : "mapbox://styles/ivancorcoles/cjhms0cvi3dz82spapuicuest"
		},
		"miubicacion" : {
			"name" : "Mi ubicación"
		}
	},
	"plugins" : {
		"getPublicIP" : {
			"urlAjax" : "php/getPublicIP.php"
		},
		"getLonLatFromIP" : {
			"urlAjax" : "php/getLonLatFromIP.php"
		},
		"getNetInterface" : {
			"urlAjax" : "php/getNetInterface.php"
		},
		"youtubeAPI" : {
			"apiKey" : "AIzaSyAmXrtsWu27KITfSddxeyTzMmDGEr726EM"
		}
	},
	"interfaz" : {
		"panel" : {
			"buscador" : {
				"tiempoDeEsperaParaBuscar" : 2000,
				"expresiones" : {
					"esDominio" : /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
					"esIp" : /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
				},
				"buscarDominioIP" : {
					"urlAjax" : "php/buscarDominio.php",
					"errorAjax" : "Fallo encontrando Dominio!"
				},
				"getLonLatFromIP" : {
					"urlAjax" : "php/getLonLatFromIP.php",
					"errorAjax" : "Fallo encontrando LonLat!"
				},
				"busquedaPorVoz" : {
					"msgVolando" : "Volando a ",
					"localizadoEn" : "localizado en "
				}
			},
			"botonera" : {
				"id" : "botonera",
				"className" : "botonera",
				"botonDeSalir" : false,
				"botones" : { // No se pueden poder mas de un boton con la misma funcion ya que se usa para parte de ls identificadores del html que genera
					"telegram" : {
						"usaLibreriaExterna" : true,
						"width" : 50,
						"height" : 15,
						"texto" : "Enviar a Telegram",
						"funcion" : "telegram.enviarMensaje()"
					},
					"busquedasRealizadas" : {
						"usaLibreriaExterna" : false,
						"width" : 50,
						"height" : 15,
						"texto" : "Busquedas Realizadas",
						"funcion" : "herramientas.busquedasRealizadas(this)", // Hay que pasar this para coger el boton con el que se ha llamado a la funcion
						"panelFuncion" : {
							"titulo" : "busquedasRealizadas",
							"botonDeSalir" : true,
							"width" : 500,
							"height" : 200,
							"botones" : [
								{
									"texto" : "Pulsame",
									"funcion" : "alert(123)"
								},
								{
									"texto" : "Otro mas",
									"funcion" : "alert('este es otro')"
								}
							]
						}
					},
					"ingenieriaForense" : {
						"usaLibreriaExterna" : false,
						"width" : 50,
						"height" : 15,
						"texto" : "Ingeniería Forense",
						"funcion" : "herramientas.ingenieriaForense(this)", // Hay que pasar this para coger el boton con el que se ha llamado a la funcion
						"panelFuncion" : {
							"titulo" : "ingenieriaForense",
							"botonDeSalir" : true,
							"width" : 500,
							"height" : 200,
							"botones" : [
								{
									"texto" : "Pulsame",
									"funcion" : "alert(123)"
								},
								{
									"texto" : "Otro mas",
									"funcion" : "alert('este es otro')"
								}
							]
						}
					}
				}
			},
			"panelMiRed" : {
				"infoPanelMiRed" : {
					"textoCargandoDatos" : "Cargando datos...",
					"textoActualizandoDatos" : "Actualizando datos...",
					"imagenCargando" : "images/loading.gif"
				}
			},
			"toolsType" : {
				"reconocimiento" : {
					"nombre" : "Reconocimiento",
					"tools" : {
						
					}
				},
				"metasploit" : {
					"email_harvest" : {
						"urlAjax" : "php/funciones/tools/metasploit/email_harvest.php"
					}
				}
			},
			"redesSociales" : {
				"telegram" : {
					"apiKey" : "478556684:AAEVzefOWHm_r_cF28f3D811T40VJcv2-bo",
					"urlAjax" : "php/funciones/telegram.php",
					"chatID" : "@panelconnor"
				}
			},
			"notificacion" : {
				"delayMensaje" : 2500,
				"velocidad" : {
					"fadeIn" : "slow",
					"fadeOut" : "slow"
				}
			},
			"layers" : {
				"mired" : {
					"order" : 0,
					"nombre" : "Mi Red",
					"urlAjax" : "php/funciones/mired.php",
					"onClickPersonalizado" : "flyToMe",
					"className" : "mired",
					"abrirPanel" : true
				},
				"shell" : {
					"order" : 1,
					"nombre":  'Shell', 
					"urlAjax" : "php/funciones/shell.php",
					"onClickPersonalizado" : "mostrarShell",
					"className" : "shell",
					"abrirShell" : true
				},
				"wifigratis" : {
					"order" : 2,
					"nombre":  'WiFi Gratis', 
					"urlAjax" : 'php/funciones/wifigratis.php'
				},
				"wpa" : {
					"order" : 3,
					"nombre" : 'WPA', 
					"urlAjax" : 'php/funciones/wpa.php'
				},
				"dominiosvulns" : {
					"order" : 4,
					"nombre":  'Dominios Vulnerados', 
					"urlAjax" : 'php/funciones/domvulns.php'
				},
				"ingsocial" : {
					"order" : 5,
					"nombre" : 'Ingenieria Social', 
					"urlAjax" : 'php/funciones/ingsoci.php'
				},
				"perfiles" : {
					"order" : 6,
					"nombre" : 'Perfiles', 
					"urlAjax" : 'php/funciones/perfiles.php'
				}
			},
			"layersErrors" : {
				"noExisteUrlAjax" : "No se ha encontrado la urlAjax para el Layer",
				"mirarConf" : "(Mirar configuración)"
			},
			"infoMiRed" : {
				"dispositivos" : {
					"imagen" : {
						"url" : "images/equipo.png",
						"cssClass" : "imagenEquipo"
					}
				}
			}
		}
	}
};