#include "FastLED.h"

#define LED_PIN 6

#define NUM_LEDS    6
#define CHIPSET     WS2812B
#define COLOR_ORDER GRB
CRGB leds[NUM_LEDS];

#define BRIGHTNESS  150

const int buttonPinCamera = 2;
const int buttonPinSend = 9;

int buttonStateCamera = 0;
int buttonStateSend = 0;  

bool current_state = false;
bool old_state = current_state; 

void setup() {
 Serial.begin(115200);
 //Serial.setTimeout(1);

 pinMode(buttonPinCamera, INPUT);
 pinMode(buttonPinSend,INPUT_PULLUP);
 
 FastLED.addLeds<CHIPSET, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection( TypicalSMD5050 );
 FastLED.setBrightness( BRIGHTNESS );
}
void loop() {
  
 buttonStateCamera = digitalRead(buttonPinCamera);
 current_state = digitalRead(buttonPinSend);

 if (buttonStateCamera == LOW) {
  for(int n = 0; n < NUM_LEDS; n++) {
  leds[n] = CRGB::White ;
  FastLED.show();
   }
  //while (!Serial.available());
  delay ( 1000 );
  Serial.print("1");
  delay (100);
   
  

  for(int n = 0; n < NUM_LEDS; n++) {
  leds[n] = CRGB::Black ;
  FastLED.show(); 
   }
  delay( 150 );

  for(int n = 0; n < NUM_LEDS; n++) {
  leds[n] = CRGB::White ;
  FastLED.show();
   }
  delay( 100 );
   }

  else if (current_state != old_state) {
    old_state = current_state;
    Serial.print("2"); 
    
  }
  
  else {
  for(int n = 0; n < NUM_LEDS; n++) {
  leds[n] = CRGB::Black ;
  FastLED.show();
   }
  
 }
 

 
}
