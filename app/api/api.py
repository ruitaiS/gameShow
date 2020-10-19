import time
import base64
import os
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
    #Strip First 23 chars from data string (the 'data:image/jpeg;base64,' part)
    #Decode, store as jpg locally
    imgStr = base64.decodestring(request.data[23:])
    filename = "img.jpg"
    imgFile = open(filename, "wb")
    imgFile.write(imgStr)
    imgFile.close()
    
    #Connect to Wrnch, upload file, delete local file
    wr = wrCloud(username='petershao', password='jEkcp8sq!qMYEEh')
    job_id = wr.submit_job('img.jpg', work_type=['json'], options={}, url=False)
    os.remove("img.jpg")
    print (wr.get_auth_token())
    print ("Job ID: " + job_id)

    #Loop Status until processing Complete
    status = wr.get_job_status(job_id)
    while (status == 'Processing'):
        status = wr.get_job_status(job_id)
        print ("Status: " + status)
    status = wr.get_job_status(job_id)
    print ("Status: " + status)

    print(wr.get_json_result_as_dict(job_id))
    return wr.get_json_result_as_dict(job_id)
    
