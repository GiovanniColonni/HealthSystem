# wannabe bluprint

import time
import paho.mqtt.client as paho
broker = "localhost"
port = 1883

#define callback
def on_message(client, userdata, message):
    time.sleep(1)
    print("received message =",str(message.payload.decode("utf-8")))

client= paho.Client("client-001") #create client object 

client.on_message=on_message
client.username_pw_set(username="username",password="password")
print("connecting to broker ",broker)

client.connect(broker,port=port)#connect
client.loop_start() #start loop to process received messages

client.subscribe("prova/provaThread")#subscribe
time.sleep(100000)

client.disconnect() #disconnect
client.loop_stop() #stop loop