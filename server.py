from tornado import (ioloop, web)
import hashlib
import base64
import random
import string
import os, sys


class MainHandler(web.RequestHandler):
    def get(self):
        self.render('index.html')


handlers = [
    (r"/css/(.*)", web.StaticFileHandler, {"path": "frontend/css/"}),
    (r"/js/(.*)", web.StaticFileHandler, {"path": "frontend/js/"}),
    (r"/html/(.*)", web.StaticFileHandler, {"path": "frontend/template/"}),
    (r"/img/(.*)", web.StaticFileHandler, {"path": "frontend/img/"}),
    (r"/", MainHandler),
]


settings = {
    "autoreload": True,
    "debug": True,
    "template_path": "frontend/template/",
    "cookie_secret": hashlib.sha256(''.join([
        random.choice(string.ascii_uppercase) for i in range(100)
    ])).hexdigest()
}

if __name__ == "__main__":
    # start main application.
    application = web.Application(handlers, **settings)
    port = int(os.environ.get("port", 8080))
    application.listen(port, address="0.0.0.0")
    ioloop.IOLoop.current().start()


