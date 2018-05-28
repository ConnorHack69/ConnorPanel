var puntos = {};

/*var elemento = document.getElementById("features");
// On every scroll event, check which element is on screen
elemento.onscroll = function() {
    var chapterNames = Object.keys(puntos);
    for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};*/

var activeChapterName = 'test';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(puntos[chapterName]);
    if (document.getElementById(chapterName)){
    	document.getElementById(chapterName).setAttribute('class', 'active');
	if(document.getElementById(activeChapterName)){
    		document.getElementById(activeChapterName).setAttribute('class', '');
	}
    }
    activeChapterName = chapterName;
}
/*
function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}*/
