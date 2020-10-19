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
    #Decode Base64 from React; store as jpg locally
    imgStr = base64.decodestring(request.data)
    filename = 'img.jpg'
    imgFile = open(filename, "wb")
    imgFile.write(imgStr)
    imgFile.close()
    
    #Connect to Wrnch, upload file
    wr = wrCloud(username='petershao', password='jEkcp8sq!qMYEEh')
    job_id = wr.submit_job('img.jpg', work_type=['annotated_media'], options={}, url=False)
    print (wr.get_auth_token())
    print ("Job ID: " + job_id)

    #Loop Status until processing Complete
    status = wr.get_job_status(job_id)
    while (status == 'Processing'):
        status = wr.get_job_status(job_id)
        print ("Status: " + status)
    status = wr.get_job_status(job_id)
    print ("Status: " + status)

    print(wr.get_result_as_string(job_id, work_type='')
    return wr.get_result_as_string(job_id, work_type='')
    
