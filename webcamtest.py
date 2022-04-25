import cv2
import serial
import time

arduino = serial.Serial(port='COM8', baudrate=115200, timeout=.1)

cam = cv2.VideoCapture(0)

cv2.namedWindow("test")

img_counter = 0

global dataArduino


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
        img_name = "opencv_frame_{}.png".format(img_counter)
        cv2.imwrite(img_name, frame)
        print("{} written!".format(img_name))
        img_counter += 1

    
    

cam.release()

cv2.destroyAllWindows()
