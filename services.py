#!/usr/bin/env python
import textwrap

import subprocess
import urlparse

from six.moves.BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

class HelloRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path != '/':
            self.send_error(404, "Object not found")
            return
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()
        if "?" in self.path:
            for key,value in dict(urlparse.parse_qsl(self.path.split("?")[1], True)).items():
                print key + " = " + value
        command = "/root/theHarvester/theHarvester.py -d geograma.com -l 1000 -b google"
        a = subprocess.Popen(command, shell=True)
        response_text = textwrap.dedent('''\
            <html>
            <head>
                <title>Greetings to the world</title>
            </head>
            <body>
                <h1>Greetings to the world</h1>
                <p>Hello, world!</p>
                <p>''',str(a),'''</p>
            </body>
            </html>
        ''')
        self.wfile.write(response_text.encode('utf-8'))
        

server_address = ('', 8000)
httpd = HTTPServer(server_address, HelloRequestHandler)
httpd.serve_forever()