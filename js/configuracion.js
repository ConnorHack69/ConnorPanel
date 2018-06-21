var CONF = {
	"baseDatos" : {
		"urlAjax" : "php/db/databaseFunctions.php",
		"urlAjaxErrorMsg" : "No existe el metodo",
		"urlAjaxDesc" : "No está difindo el método en 'CONF.baseDatos.methods'",
		"msgNoConn" : "No se ha podido conectar con la BBDD",
		"msgErrorSql" : "Error en la sentenica SQL",
		"msgErrorSwitch" : "Se está devolviendo",
		"msgInsertOK" : "Se ha añadido correctamente a la BBDD",
		"methods" : [
			"insertarDominio",
			"getDominios"
		]
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
					"errorAjax" : "Fallo encontrando Dominio!",
					"errorAjaxDesc" : "No se ha podido encontrar el Dominio de la IP indicada."
				},
				"getLonLatFromIP" : {
					"urlAjax" : "php/getLonLatFromIP.php",
					"errorAjax" : "Fallo encontrando LonLat!",
					"errorAjaxDesc" : "No se ha podido encontrar el LonLat de la busqueda."
				},
				"busquedaPorVoz" : {
					"msgVolando" : "Volando a",
					"localizadoEn" : "localizado en"
				}
			},
			"layerSelectorPanel" : {
				"id" : "layerSelectorPanel",
				"width" : 60,
				"widthOver" : 350,
				"height" : 56,
				"heightOver" : "auto",
				"className" : "layerSelectorPanel",
				"nombrePanel" : "Layer Selector Panel",
				"img" : "images/layer.png"
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
						"recon-ng" : {

						},
						"theharvester" : {
							"urlAjax" : "php/funciones/tools/theharvester/email_harvest.php"
						}
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
				},
				"console" : {
					"whatMakesError" : {
						"color": "#ce1e00",
						"fontSize":"15px",
						"background": "orange",
						"padding": "5px 0px 5px 5px;"
					},
					"descripcionError" : {
						"color": "#0f308c",
						"fontSize":"15px",
						"background": "orange",
						"padding": "5px 5px 5px 10px"
					},
					"whatMakesInfo" : {
						"color": "yellow",
						"fontSize":"12px",
						"background": "#1c4f1c",
						"padding": "5px 0px 5px 5px;"
					},
					"descripcionInfo" : {
						"color": "white",
						"fontSize":"12px",
						"background": "#1c4f1c",
						"padding": "5px 5px 5px 10px"
					}
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