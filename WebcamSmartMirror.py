import cv2
import serial
import time
import os
import pyautogui

arduino = serial.Serial(port='COM7', baudrate=115200, timeout=.1)

cam = cv2.VideoCapture(0)

cv2.namedWindow("test")

img_counter = 1

directory = r'C:\Users\Elias\WebstormProjects\IxD6-SmartMirror-JS-LEAP\JS-frontend\Cardpage_v2\Img_2'

os.chdir(directory)
print(os.listdir(directory))

global dataArduino

#https://thecleverprogrammer.com/2021/01/05/use-phone-camera-with-python/
def readA():
    dataArduino = arduino.readline()
    if dataArduino:
        string = dataArduino.decode()
        dataArduino = int(string) 
    print (dataArduino)
    return dataArduino

while True:
    ret, frame = cam.read()
    dataArduino = readA()
    if not ret:
        print("failed to grab frame")
        break
    cv2.imshow("test", frame)

    k = cv2.waitKey(1)
    if k%256 == 27:
        # ESC pressed
        print("Escape hit, closing...")
        break
    elif dataArduino == 1:
        # SPACE pressed
        img_name = "{}.jpg".format(img_counter)
        cv2.imwrite(img_name, frame)
        image = cv2.imread(img_name)
        rotated = cv2.rotate(image, cv2.ROTATE_180)

        cv2.imwrite(img_name, rotated)
        
        
        print("{} written!".format(img_name))
        img_counter += 1
        pyautogui.press('enter')
        time.sleep (1)
        pyautogui.press('space')

        #C:\Users\Elias\WebstormProjects\IxD6-SmartMirror-JS-LEAP\JS-frontend\CardPage\Img
   

cam.release()

cv2.destroyAllWindows()
