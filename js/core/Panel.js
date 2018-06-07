class Panel {

  constructor(id, height, width) {
    if(!document.getElementById(id)){
      this.id = id;
      this.height = height;
      this.width = width;

      var panelHtml = $('<div style="display:block; float:left;width:'+this.width+'px; height:'+this.height+'px;" class="corePanel"><img src="'+CONF.core.panel.minimizar.imagen+'" alt="Cerrar Panel" id="cerrarPanel"></img></div>');
      panelHtml.attr('id', this.id);

      panelHtml.draggable();

      $("#interfaz").append(panelHtml);
    } else {
      $("div").not("#" + id).css("z-index", "1");
      $("#" + id).css("z-index", "2");
    }
  }
  
  addTitulo(titulo){
    $("#"+this.id).append($('<span class="corePanelTitulo">'+titulo+'</span>').attr('id', this.id+'_corePanelTitulo'));
  }

  addTablaDatos(){
    // LLamada por ajax a un servicio PHP que devuelva de una base de datos todos los dominios y mostrarlos en una tabla
    $("#"+this.id).append($('<table class="corePanelTabla"/>'+titulo+'</table>').attr('id', this.id+'_corePanelTabla'));
  }

  addBoton(texto, funcion){
    $("#"+this.id).append($('<button type="button" class="coreBotonTabla" onclick="'+funcion+'">'+texto+'</button>').attr('id', this.id+'coreBotonTabla'));
  }

  onClickPanel(funcion){
    funcion;
  }

  focusOnMe(){
    $("div").not(this).css("z-index", "1");
    $(this).css("z-index", "2");
  }

}