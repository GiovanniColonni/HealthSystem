// configuration of the keypad

// start and wait for arduino serial communication message based + checksum
// serial comunication profile


#include <Keypad.h>
#include <ArduinoJson.h>

const byte rows = 4;
const byte cls = 4;

char keyMap[rows][cls] = {
  {'1','2','3','4'},
  {'5','6','7','8'},
  {'9','C','C','C'},
  {'C','C','C','F'}
 };

byte pinRows[rows] = {2,3,4,5};
byte pinCls[cls] = {6,7,8,9};

Keypad kp = Keypad(makeKeymap(keyMap),pinRows,pinCls,rows,cls);
//-------------------------

int buttonPin = 28;

// Costants Definition

const int MaxPressureMIN = 115;
const int MaxPressureMAX = 130;

const int MinPressureMIN = 75;
const int MinPressureMAX = 85;

const int EarthRateMin = 60 ; // valore tra 60 e 100 battiti al minuto
const int EarthRateMax = 100; // questi sono soltanto valori di riferimento
// tachicardia sopra i 100

const int Operc = 100; // Oxigen perc
const int Tmeasurement = 5000 ; // ms from one measure to another


int critic = 0;


int simulatePressureMeasurement(){
      
    String cmd = "";
    int cont = 1; 
          while(cont){
            pressureMeasure();
            
            delay(Tmeasurement);
            
            if(kp.getState() == HOLD){
             Serial.println(kp.getState());
             cont = 0;
             Serial.println("Stop");
             }
          cmd = "";
      }
      
      return 0;
  }
  
int simulateHRMeasurement(){
  
  char cmd = "";
  int cont = 1; 
      while(cont){
        heartRateMeasure();
        delay(Tmeasurement);
        cmd = kp.getKey(); 
        if(kp.getState() == HOLD){
          cont = 0;
          Serial.println("Stop");
        }
        cmd = "";
    }

  return 0;
 }

int simulateSaturimeterMeasurement(){
  // if type = 1 : single measurement
  // else : continuos monitoring  
  int cont = 1; 
  char cmd = "";
      while(cont){
        saturimeterMeasure();
        delay(Tmeasurement);
        cmd = kp.getKey();
        if(kp.getState() == HOLD){
          Serial.println(kp.getState());
          cont = 0;
          Serial.println("Stop");
    }
    cmd = "";
      }  
  
  return 0;
 }

int saturimeterMeasure(){
  const int capacity = JSON_OBJECT_SIZE(1);
  char output[14];

  StaticJsonDocument<capacity> measure;
  if(critic == 0){
    measure["Operc"] = random(Operc-1,Operc);
  }else{
    measure["Operc"] = random(Operc-10,Operc);
  }
  serializeJson(measure,output);
  Serial.println(output);
  
  return 0;

  }
int heartRateMeasure(){
    const int capacity = JSON_OBJECT_SIZE(1); // number of field
    char output[14];

    StaticJsonDocument<capacity> measure;
    if(critic == 0){
      measure["HRate"] = random(EarthRateMin+5,EarthRateMax-5);
    }else{
      measure["HRate"] = random(EarthRateMin-20,EarthRateMax+20);      
    }
    serializeJson(measure,output);
    Serial.println(output);
    
    return 0;
  }
int pressureMeasure(){ // one measure of pression
  const int capacity = JSON_OBJECT_SIZE(3); // number of field
  char output[32];
  
  StaticJsonDocument<capacity> measure;
  if(critic == 0){
    measure["Max"] = random (MaxPressureMIN+5,MaxPressureMAX-5);
    measure["Min"] = random (MinPressureMIN+5,MinPressureMAX-5);
    measure["HRate"] = random (EarthRateMin+5,EarthRateMax-5);
  }else{
    measure["Max"] = random (MaxPressureMIN-20,MaxPressureMAX+20);
    measure["Min"] = random (MinPressureMIN-20,MinPressureMAX+20);
    measure["HRate"] = random (EarthRateMin-20,EarthRateMax+20);      
  }
  
  serializeJson(measure, output);
  Serial.println(output);
  return 0;  
}

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin,INPUT);
  //kp.addEventListener(keyPadEvent);
  kp.setHoldTime(2000);
}

String cmd = "" ;
String seq = "";
void loop() {
  
  char key = kp.getKey();
  
  if(key){
    seq = seq + key;
    cmd = key;
  }

  
  if(cmd == "1"){
    pressureMeasure();
  }else if(cmd == "2"){
    saturimeterMeasure();    
    
  }else if(cmd == "3"){
    heartRateMeasure();
    
  }else if(cmd == "4"){
    critic = 1;
    pressureMeasure();
    
  }else if(cmd == "5"){
    critic = 1;
    saturimeterMeasure();    
    
  }else if(cmd == "6"){
    critic = 1;
    heartRateMeasure();
    
  }else if(cmd == "F"){
    Serial.println("stop");
    cmd = "";
  }
  //delay(Tmeasurement);
}
