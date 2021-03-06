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
  
  addTitulo(id, titulo, img){
    var tit = titulo.replace(/\s/g,'');
    if(document.getElementById(id +"_corePanelTitulo_" + tit) == null){
      if(img)
        $("#"+ id + "_panelDivTitulo").append($('<img src="'+img+'" style="margin: 7px;">').attr('id', id + '_corePanelImgTitulo_' + tit));
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

          var checkeds = $("#treeview").swidget("TreeView").element.find("li").filter(function () {
              return $("#treeview").swidget("TreeView").checked($(this));
          });

          // Get checked names
          var seleccionados = [];
          for(var check in checkeds){
            // If is subchild
            if(checkeds[check] && checkeds[check].parentElement && checkeds[check].parentElement.parentElement && checkeds[check].parentElement.parentElement.innerText){
              var parentText = checkeds[check].parentElement.parentElement.innerText.split("\n")[0];
              if(parentText != 'GeoJSON'){
                var sources = map.getAllSources();
                var isChild = false;
                var checkedTextParsed = checkeds[check].innerText.split("\n")[0];
                // If has parent, is in sources? If yes, that tell us that is a subchild
                for(source in sources){
                  if(source == parentText + "_" + checkedTextParsed){
                    isChild = true;
                  }
                }
                // If is a child, add clusters off that GeoJSON to "seleccionados"
                if(isChild){
                  seleccionados.push("clusters_" + parentText + "_" + checkedTextParsed);
                  seleccionados.push("cluster-count_" + parentText + "_" + checkedTextParsed);
                  seleccionados.push("unclustered-point_" + parentText + "_" + checkedTextParsed);
                }
              } else {
                if(checkeds[check] && checkeds[check].innerText){
                  seleccionados.push(checkeds[check].innerText);            
                }
              }
            } else {
              if(checkeds[check] && checkeds[check].innerText){
                seleccionados.push(checkeds[check].innerText);            
              }
            }
          }

          // Get all layers
          var layersTemp = map.getAllLayers();
          for(var l in layersTemp)
            if(layersTemp[l].source && layersTemp[l].source != 'composite' && layersTemp[l].source != 'markers')
              map.setLayoutProperty(layersTemp[l].id, 'visibility', 'none');

          // If any is selected
          if(seleccionados.length > 0){
            for(var selec in seleccionados){
              var layerName = seleccionados[selec];
              for(var l in layersTemp)
                if(layersTemp[l].id.includes(layerName.split("\n")[0]))
                  map.setLayoutProperty(layersTemp[l].id, 'visibility', 'visible');
            }
          }
        }

        var sources = map.getAllSources();
        var layers = map.getAllLayers();
        var dataJson = [];

        for(var source in sources){
          if(source != 'composite' && source != 'markers'){
            var items = [];
            for(var layer in layers){
              if(layers[layer].source && layers[layer].source == source){
                var nombreLayer = layers[layer].id.split("_")[layers[layer].id.split("_").length-1];
                var exists = false;
                if(items && items.length > 0){
                  for(var it in items){
                    if(items[it].text == nombreLayer)
                      exists = true;
                  }
                }
                if(!exists)
                  items.push({text: nombreLayer, iconUrl: "images/layers/"+source.split("_")[0]+".png"});
              }
            }
            var sourceName = source.split("_")[0];
            var item;
            if(dataJson && dataJson.length > 0){
              var exists = false;
              for(var dj in dataJson){
                if(dataJson[dj].text && dataJson[dj].text == sourceName){
                  exists = true;
                }
              }
              if(exists){
                  for(var it in items) {
                    dataJson[dj].items.push(items[it]);
                  }
                } else {
                  item = {text: source.split("_")[0], iconUrl: "images/layers/"+source.split("_")[0]+".png", /*expanded: true, */items: items};
                  dataJson.push(item);
                }
            } else {
              item = {text: source.split("_")[0], iconUrl: "images/layers/"+source.split("_")[0]+".png", /*expanded: true,*/ items: items};
              dataJson.push(item);
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
                        iconUrl: "images/layers/GEOJSON.png",
                        expanded: true,
                        items: dataJson
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