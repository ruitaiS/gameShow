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

    #imgdata = base64.b64decode(request.data)
    #fileName = "img.jpg"
    #with open(fileName, 'wb') as f:
    #    f.write(imgdata)

    #this doesn't work
    #encoded = base64.b64encode(open("file.png", "rb").read())

    imgdata = base64.b64decode(request.data)
    filename = 'img.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)    

    wr = wrCloud(username='petershao', password='jEkcp8sq!qMYEEh')
    print (wr.get_auth_token())
    job_id = wr.submit_job('dancing.jpg', work_type=['annotated_media'], options={}, url=False)
    print ("Job: " + job_id)
    status = wr.get_job_status(job_id)
    while (status == 'Processing'):
        status = wr.get_job_status(job_id)
        print ("Status: " + status)
    status = wr.get_job_status(job_id)
    print ("Status: " + status)

    #print("String: " + wr.get_result_as_string(job_id, work_type=''))
    return wr.get_result_as_string(job_id, work_type='')
    
