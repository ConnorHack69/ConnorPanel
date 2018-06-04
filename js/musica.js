// Se implementará mas adelante, cuando la version de reconocimiento de voz vaya perfecto
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    var apiKey = CONF["plugins"].youtubeAPI.apiKey;
    gapi.client.setApiKey(apiKey);
}
 
// Called when the search button is clicked in the html code
function search(query) {
    var query = query;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:query
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
}
// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML = responseString;
}
