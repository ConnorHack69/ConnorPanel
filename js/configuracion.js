var CONF = {
	"baseDatos" : {
		"urlAjax" : "php/db/conection.php"
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
				}
			},
			"layers" : {
				"mired" : {
					"order" : 0,
					"nombre" : "Mi Red",
					"urlAjax" : "php/funciones/mired.php",
					"onClickPersonalizado" : "flyToMe",
					"className" : "mired"
				},
				"wifigratis" : {
					"order" : 1,
					"nombre":  'WiFi Gratis', 
					"urlAjax" : 'php/funciones/wifigratis.php'
				},
				"wpa" : {
					"order" : 2,
					"nombre" : 'WPA', 
					"urlAjax" : 'php/funciones/wpa.php'
				},
				"dominiosvulns" : {
					"order" : 3,
					"nombre":  'Dominios Vulnerados', 
					"urlAjax" : 'php/funciones/domvulns.php'
				},
				"ingsocial" : {
					"order" : 4,
					"nombre" : 'Ingenieria Social', 
					"urlAjax" : 'php/funciones/ingsoci.php'
				},
				"perfiles" : {
					"order" : 5,
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