class Panel {

  constructor(id, width, height, className, botonDeSalir) {
    if(!document.getElementById(id + "_panel")){
      this.id = id;
      this.height = height;
      this.width = width;
      this.className = className;

      // Boton de minimizar
      if(botonDeSalir) {
        var minimizar = $('<img src="'+CONF.core.panel.minimizar.imagen+'"></img>');
        minimizar.attr('id', this.id+"_cerrarPanel");
        minimizar.attr('class', "cerrarPanel");
        minimizar.attr('alt', "Cerrar Panel");
      }

      var divTitulo = $('<div></div>');
      divTitulo.attr('id', this.id+"_panelDivTitulo");
      divTitulo.attr('class', "corePanelDivTitulo");
      if(!botonDeSalir){
        divTitulo.attr('class', "sinBotonDeSalir");
      }

      var divContenido = $('<div></div>');
      divContenido.attr('id', this.id+"_panelDivContenido");
      divContenido.attr('class', "corePanelDivContenido");

      // Div completo del Panel
      var parsedWidth;
      var parsedHeight;
      if(!isNaN(this.width))
        parsedWidth = this.width + "px";
      else
        parsedWidth = this.width;

      if(!isNaN(this.height))
        parsedHeight = this.height + "px";
      else
        parsedHeight = this.height;
      var panelHtml = $('<div style="position: absolute;display:block;float:left;width:' + parsedWidth + ';height:' + parsedHeight + ';"></div>');
      panelHtml.attr('id', this.id+"_panel");
      panelHtml.attr('class', "corePanel " + this.className);

      if(botonDeSalir){
        panelHtml.append(minimizar);
      }
      panelHtml.append(divTitulo);
      panelHtml.append(divContenido);

      panelHtml.draggable();

      $("#interfaz").append(panelHtml);

      $("div").not("#" + id + "_panel").css("z-index", "1");
      $("#" + id + "_panel").css("z-index", "2");

      // Funcion onClick de minimizar
      if(botonDeSalir){
        $("#" + this.id+"_cerrarPanel").on('click', function () {
          $("#herramientas").removeClass("herramientasFull");
          $("#" + this.id.split("_")[0] + "_panel").hide();
        });
      }

      // Funcion onClick en el Panel
      $("#" + this.id+"_panel").on('click', function () {
        $("div").not("#" + id + "_panel").css("z-index", "1");
        $("#" + id + "_panel").css("z-index", "2");
      });
    } else {
      $("#" + id + "_panel").toggle();
      $("div").not("#" + id + "_panel").css("z-index", "1");
      $("#" + id + "_panel").css("z-index", "2");
    }
  }
  
  addTitulo(id, titulo){
    var tit = titulo.replace(/\s/g,'');
    if(document.getElementById(id +"_corePanelTitulo_" + tit) == null){
      $("#"+ id + "_panelDivTitulo").append($('<span class="corePanelTitulo">'+titulo+'</span>').attr('id', id + '_corePanelTitulo_' + tit));
    }
  }

  addBoton(id, texto, funcion){
    var func = funcion.replace(/[()]/g, '');
    if(document.getElementById(id + "_coreBoton_" + func) == null){
      $("#"+ id + "_panelDivContenido").append($('<button type="button" class="coreBoton" onclick="'+funcion+'"><span>'+texto+'</span></button>').attr('id', id + '_coreBoton_' + func));
    }
  }

  addLayerSelectorPanel(id){
    var layerselector = '<div class="container"><div id="treeview"></div><br /><p><span id="checkedCount"></span></p></div>';
    document.getElementById(id + "_panelDivContenido").innerHTML = layerselector;
    $(function ($) {
        function onCheck() {
            // find all LI elements in the treeview and determine how many are checked
            var checkedCount = $("#treeview").swidget("TreeView").element.find("li").filter(function () {
                return $("#treeview").swidget("TreeView").checked($(this));
            }).length;
            $("#checkedCount").html(checkedCount + " items checked");
        }

        /* CONTINUAR AQUI */
        var sources = map.getAllSources();
        var layers = map.getAllLayers();
        var dataJson = {};
        for(var source in sources){
          for(var layer in layers){
            if(layers[layer].source && layers[layer].source == source){
              console.log("Se ha encontrado la capa " + layers[layer].id + " en el source " + source);
            }
          }
        }
        $("#treeview").shieldTreeView({
            checkboxes: {
                enabled: true,
                children: true
            },
            events: {
                check: onCheck
            },
            dataSource: {
                data: [
                    {
                        text: "GeoJSON",
                        iconUrl: "/images/geojson.png",
                        expanded: true,
                        items: [
                            {
                                text: "js",
                                iconUrl: "/Content/img/file/folder.png",
                                items: [
                                    {
                                        text: "jquery.10.1.min.js",
                                        iconUrl: "/Content/img/file/file_extension_txt.png"
                                    }
                                ]
                            },
                            {
                                text: "resources",
                                iconUrl: "/Content/img/file/folder.png",
                                expanded: true,
                                items: [
                                    {
                                        text: "license.pdf",
                                        iconUrl: "/Content/img/file/file_extension_pdf.png"
                                    },
                                    {
                                        text: "privacy.pdf",
                                        iconUrl: "/Content/img/file/file_extension_pdf.png"
                                    },
                                    {
                                        text: "report.xls",
                                        iconUrl: "/Content/img/file/file_extension_xls.png"
                                    }
                                ]
                            },
                            {
                                text: "styles",
                                iconUrl: "/Content/img/file/folder.png",
                                expanded: true,
                                items: [
                                    {
                                        text: "logo.jpg",
                                        iconUrl: "/Content/img/file/file_extension_jpeg.png"
                                    },
                                    {
                                        text: "theme.css",
                                        iconUrl: "/Content/img/file/file_extension_txt.png"
                                    }
                                ]
                            },
                            {
                                text: "about.html",
                                iconUrl: "/Content/img/file/file_extension_html.png"
                            },
                            {
                                text: "index.html",
                                iconUrl: "/Content/img/file/file_extension_html.png"
                            }
                        ]
                    }
                ]
            }
        });
        onCheck();
    });
  }

  addTablaDatos(id, metodo, tablaBBDD, filter){ // method = getDominios, tabla Dominios, filter {"where" : "1=1"}
    var params = {  
      "metodo": metodo, 
      "datos": {
        "tabla" : tablaBBDD,
        "filtros" : filter
      },
      "bbddMethodsConf" : CONF.baseDatos.methods
    };

    $("#"+ id + "_panelDivContenido").append($(ddbb.getTabla(params)).attr('id', id+'_corePanelTabla'));
  }

  onClickPanel(funcion){
    funcion;
  }

  cerrarPanel(){
    // Cierra el panel
    $("#herramientas").removeClass("herramientasFull");
    $(this).parentNode.hide();
  }

  focusOnMe(){
    $("div").not(this).css("z-index", "1");
    $(this).css("z-index", "2");
  }

}