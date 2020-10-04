import time
import base64
from flask import Flask, request
from flask_cors import CORS, cross_origin
from wrcloud.wrcloud import wrCloud

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/time')
@cross_origin()
def get_current_time():
    return {'time': time.time()}

@app.route('/img', methods=['POST'])
@cross_origin()
def processImg():
    #print (request.data)

    wr = wrCloud(username='petershao', password='jEkcp8sq!qMYEEh')
    print (wr.get_auth_token())
    return "yo"
    
