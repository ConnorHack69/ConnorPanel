<!DOCTYPE html>
<html>
<head>
  <script src="http://code.jquery.com/jquery-1.12.1.js"></script>
  <script src="http://code.responsivevoice.org/responsivevoice.js"></script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
 <input type="text" name="text">
  <a href="#" class="say">Escuchar Texto!</a>
  <audio src="" hidden class=speech></audio>
  <script>
    $("a.say").on('click', function(e){
      e.preventDefault();
      var text = $("input[name=text]").val();
      responsiveVoice.speak(text,"Spanish Female");
      text=encodeURIComponent(text);
      var url="http://translate.google.com/translate_tts?tl=es&q="+text;
      $("audio").attr("src",url).get(0).play();
    })

  </script>
</body>
</html>﻿
