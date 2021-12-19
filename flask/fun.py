from keras.models import load_model
from keras.preprocessing import image
import numpy as np
import os
import math

def sum(a,b):
    return a+b
def avg(a,b):
    return (a+b)/2

def disp(num):
    if type(num) == int:
        return num**2
    else:
        return "Not a number"


    
def check():
    img_width, img_height = 300, 300
    os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'
    model = load_model('./models/nsfw_classifier_v1.h5')
    img = image.load_img('D:/imgchk.jpg', target_size=(img_width, img_height))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])
    classes = model.predict(images, batch_size=10)
    print(classes)
    print(math.log10(9.87)) #porn 
    print(math.log10(3.94)) #safe
    print(math.log10(9.6))  #sexy