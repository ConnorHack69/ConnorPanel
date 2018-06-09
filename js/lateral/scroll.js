var puntos = {};
var activeChapterName = 'test';

function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(puntos[chapterName]);
    if ($("#mark_" + chapterName)){
    	$("#mark_" + chapterName).addClass('dominios active');
	if($("#mark_" + activeChapterName)){
    	$("#mark_" + activeChapterName).addClass('dominios');
	}
    }
    activeChapterName = chapterName;
}