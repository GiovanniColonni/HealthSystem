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
  {'9','0','A','B'},
  {'C','D','E','F'}
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

int simulatePressureMeasurement(int type){
    // if type = 1 : single measurement
    // else : continuos monitoring
    int cont = 1;  // sostituire con lettura pin
    String cmd = "";
    
    if(type == 1){
          pressureMeasure();
      }else{
          while(cont){
            pressureMeasure();
            delay(Tmeasurement);
            // fare qui digital read del bottone e cambiare cont
            cmd = kp.getKey();
            if(cmd == "F"){
             cont = 0;
             }
          }
      }
      Serial.println("Stop");
      return 0;
  }
  
int simulateHRMeasurement(int type){
  // if type = 1 : single measurement
  // else : continuos monitoring  
  int cont = 1;
  String cmd = "";
 
  if(type == 1){
      heartRateMeasure();
    }else{
      while(cont){
        heartRateMeasure();
        delay(Tmeasurement);
        // fare qui digital read del bottone e cambiare cont
        cmd = kp.getKey(); // conversione a string necessaria altrimenti non va
        if(cmd == "F"){
          cont = 0;
        }
      }
    }
  Serial.println("Stop");
  return 0;
 }

int simulateSaturimeterMeasurement(int type){
  // if type = 1 : single measurement
  // else : continuos monitoring  
  int cont = 1;
  String cmd = "";
  if(type == 1){
      saturimeterMeasure();
    }else{
      while(cont){
        saturimeterMeasure();
        delay(Tmeasurement);
        cmd = kp.getKey();
        if(cmd == "F"){
          cont = 0;
        }
      }
    }
  Serial.println("Stop");
  return 0;
 }

int saturimeterMeasure(){
  const int capacity = JSON_OBJECT_SIZE(1);
  char output[14];

  StaticJsonDocument<capacity> measure;
  if(critic == 0){
    measure["Operc"] = random(Operc-3,Operc);
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
      measure["HRate"] = random(EarthRateMin,EarthRateMax);
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
    measure["Max"] = random (MaxPressureMIN,MaxPressureMAX);
    measure["Min"] = random (MinPressureMIN,MinPressureMAX);
    measure["HRate"] = random (EarthRateMin,EarthRateMax);
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
  Serial.write('Start Sensor Emulator \n');
}

String cmd = "" ;

void loop() {
  char key = kp.getKey();
  
  if(key){
    cmd = key;   
   }

  
    
  if(cmd == "1"){ 
    simulatePressureMeasurement(1);          
  }else if (cmd == "2"){
    simulateSaturimeterMeasurement(1);
  }else if(cmd == "3"){
    simulateHRMeasurement(1);          
  }else if(cmd == "4"){
    simulatePressureMeasurement(0);
  }else if(cmd == "5"){
    simulateSaturimeterMeasurement(0);    
  }else if(cmd == "6"){
    simulateHRMeasurement(0);
  }else if(cmd == "7"){
    critic = 1;
    simulatePressureMeasurement(0);
  }else if(cmd == "8"){
    critic = 1;
    simulateSaturimeterMeasurement(0);
  }else if(cmd == "9"){
    critic = 1;
    simulateHRMeasurement(0);
  }
  // gli altri tasti sono per simulazione di situzioni critiche 
  
  cmd = "";
  critic = 0;
}
