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
const int Tmeasurement = 1000 ; // ms from one measure to another


int simulatePressureMeasurement(int type){
    // if type = 1 : single measurement
    // else : continuos monitoring
    int cont = 1;  // sostituire con lettura pin
    if(type == 1){
          pressureMeasure();
      }else{
          while(cont){
            pressureMeasure();
            delay(Tmeasurement);
            // fare qui digital read del bottone e cambiare cont
          }
      }
      return 0;
  }
  
int simulateHRMeasurement(int type){
  // if type = 1 : single measurement
  // else : continuos monitoring  
  int cont = 1;
  if(type == 1){
      heartRateMeasure();
    }else{
      while(cont){
        heartRateMeasure();
        delay(Tmeasurement);
        // fare qui digital read del bottone e cambiare cont
      }
    }
  return 0;
 }

int simulateSaturimeterMeasurement(int type){
  // if type = 1 : single measurement
  // else : continuos monitoring  
  int cont = 1;
  if(type == 1){
      saturimeterMeasure();
    }else{
      while(cont){
        saturimeterMeasure();
        delay(Tmeasurement);
        // fare qui digital read del bottone e cambiare cont
      }
    }
  return 0;
 }

int saturimeterMeasure(){
  Serial.print("Operc: "); // operc = percentuale ossigeno
  Serial.println();
  
  }
int heartRateMeasure(){
    Serial.print("HRate: ");
    Serial.println(random(EarthRateMin,EarthRateMax));
    return 0;
  }
int pressureMeasure(){ // one measure of pression
  // this 
  // Max: 115 / 130 mmHg
  // Min: 75 / 85 mmHg
  // EarthRate: 
  Serial.print("Max: ");
  Serial.println(random (MaxPressureMIN,MaxPressureMAX));  // max
  Serial.print("Min: ");
  Serial.println(random (MinPressureMIN,MinPressureMAX)); // min
  Serial.print("HRate: ");
  Serial.println(random (EarthRateMin,EarthRateMax));  // hr
  
  return 0;  
}

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin,INPUT);
  Serial.write("Start Sensor Emulator \n");
}

void loop() {
  //Serial.write("1");
  int simulation = 1; // dato in input
  switch(simulation){
       // sostituire switch con griglia di bottoni
      case 1: 
              simulatePressureMeasurement(0);
              break;
      case 2:
              simulateSaturimeterMeasurement(0);
              break;
      case 3:
              simulateHeartRateMeasurement(0);
              break;
      }  
  
}
