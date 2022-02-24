from logging import debug
from flask import Flask, jsonify, request
from fun import disp
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
import math
import cv2
import time
import json

app = Flask(__name__)


@app.route("/")
def hello_world():
    # client = MongoClient("mongodb://localhost:27017")
    # db=client['clips']
    # collection= db['uploads']
    # v=db.list_collection_names()
    # fs = gridfs.GridFS(db,collection='uploads')
    # id= ObjectId("61eeb66c44ccd4ed104ea307")
    # d=None
    # for data in fs.find({"_id": id}, no_cursor_timeout=True):
    #     d=data.read()

    # decoded_doc = bson.BSON(d).decode()

    # # type(decoded_doc)

    # return decoded_doc
    return "<p> Hello World </p>"


def prediction(model, frame):
    prediction = model.predict(frame, batch_size=10)

    return prediction


@app.route('/checkVideo', methods=['GET'])
def checkVideo():
    print('here')
    result = []
    c = 0

    name = request.args.get('name')
    print(name)
    model = load_model("./models/nsfw_classifier_v1.h5")
    path = '../server/uploads/'+name
    frame_rate = 18
    prev = 0
    cap = cv2.VideoCapture(path)
    while(cap.isOpened()):
        time_elapsed = time.time() - prev
        ret, frame = cap.read()
        if time_elapsed > 1./frame_rate:
            prev = time.time()
            if ret:
                c += 1
                frame = cv2.resize(frame, (300, 300),
                                   interpolation=cv2.INTER_AREA)
                frame = image.img_to_array(frame)
                frame = np.expand_dims(frame, axis=0)
                p = prediction(model, frame)

                val1 = str(p[0][0])
                val2 = str(p[0][1])
                val3 = str(p[0][2])
                if 'e' in val1:
                    p[0][0] = math.log(float(val1[:4]))
                if 'e' in val2:
                    p[0][1] = math.log(float(val2[:4]))
                if 'e' in val3:
                    p[0][2] = math.log(float(val3[:4]))

                result.append(p)
                # print(p[0][0]);
                print(c)
            else:
                break

    cap.release()
    res = np.average(result, 0)
    flag = np.argmax(res)
    out = None
    if flag == 0:
        out = "strict"
    elif flag == 1:
        out = "safe"
    else:
        out = "adult"
    print(res)
    data = {
        "porn": str(res[0][0]),
        "safe": str(res[0][1]),
        "sexy": str(res[0][2])

    }
    return jsonify({"result": data, "flag": out})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=7000,debug=True)
