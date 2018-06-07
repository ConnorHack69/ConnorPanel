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
      var panelHtml = $('<div style="position: absolute;display:block;float:left;width:'+this.width+'px;height:'+this.height+'px;"></div>');
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

  addTablaDatos(){
    // LLamada por ajax a un servicio PHP que devuelva de una base de datos todos los dominios y mostrarlos en una tabla
    $("#"+this.id + "_panelDivContenido").append($('<table class="coreTabla"/>'+titulo+'</table>').attr('id', this.id+'_corePanelTabla'));
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