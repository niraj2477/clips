from logging import debug
from flask import Flask, jsonify
from fun import disp
from fun import check
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/home/<num>', methods = ['GET'])
def home(num):
    data=disp(num)
    return jsonify({'result': data})

@app.route('/check', methods = ['GET'])
def check():
    data=check()
    return jsonify({'result': data})

if __name__ == "__main__":
    app.run(debug=True)