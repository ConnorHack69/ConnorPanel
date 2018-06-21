
import BaseHTTPServer
import urlparse

class SimpleHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        if "?" in self.path:
            for key,value in dict(urlparse.parse_qsl(self.path.split("?")[1], True)).items():
                print key + " = " + value

    def do_POST(self):
        self.send_response(200)
        if self.rfile:
            # print urlparse.parse_qs(self.rfile.read(int(self.headers['Content-Length'])))
            for key,value in dict(urlparse.parse_qs(self.rfile.read(int(self.headers['Content-Length'])))).items():
                print key + " = " + value[0]
                command = "/root/theHarvester/theHarvester.py -d " + value[0] + " -l 1000 -b all -f " + value[0] + ".xml"
    			a = subprocess.Popen(command, shell=True)

    def log_request(self, code=None, size=None):
        return

if __name__ == "__main__":
    try:
        BaseHTTPServer.HTTPServer(("0.0.0.0", 9000), SimpleHandler).serve_forever()
    except KeyboardInterrupt:
        print('shutting down server')
def index(req):
    postData = req.form
    json = str(postData['param'].value)
   