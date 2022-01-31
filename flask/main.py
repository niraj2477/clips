from logging import debug
from flask import Flask, jsonify,request
from fun import disp

import cv2


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
@app.route('/checkVideo', methods = ['GET'])
def checkVideo():
    # cap = cv2.VideoCapture('../server/wa.avi')
    name = request.args.get('name')
    print(name)
    path='../server/uploads/'+name
    cap=cv2.VideoCapture(path)
    while(cap.isOpened()):
        ret,frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow('frame',gray)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    return name


if __name__ == "__main__":
    app.run(debug=True)