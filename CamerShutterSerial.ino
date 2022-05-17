#include "FastLED.h"

//LED-strip set-up constant variables
#define LED_PIN 6
#define NUM_LEDS    8
#define CHIPSET     WS2812B
#define COLOR_ORDER GRB
CRGB leds[NUM_LEDS];

//constant for LED-strip brightness
#define BRIGHTNESS  255

//assign button to arduino pins
const int buttonPinCamera = 2;
const int buttonPinSend = 9;

int buttonStateCamera = 0;
int buttonStateSend = 0;  

bool current_state = false;
bool old_state = current_state; 

void setup() {
 Serial.begin(115200);
 //Serial.setTimeout(1);

 //Green button
 pinMode(buttonPinCamera, INPUT);
 //Blue button
 pinMode(buttonPinSend,INPUT_PULLUP);
 
 FastLED.addLeds<CHIPSET, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection( TypicalSMD5050 );
 FastLED.setBrightness( BRIGHTNESS );
}
void loop() {
 
 // Green button
 buttonStateCamera = digitalRead(buttonPinCamera); 
 // Blue button
 current_state = digitalRead(buttonPinSend);

 //when green button is pressed LED-strip light-sequence initiates 
 if (buttonStateCamera == LOW) {
    for(int n = 0; n < NUM_LEDS; n++) {
    leds[n] = CRGB::White ;
    FastLED.show();
    }
  
     //Print the number '1' to be interpreted by python script
     //Python script Takes picture with the phone
     //while (!Serial.available());
    delay ( 1000 );
     Serial.print("1");
    delay (100);
   
  
     //turn light off for 150 milliseconds
     for(int n = 0; n < NUM_LEDS; n++) {
     leds[n] = CRGB::Black ;
     FastLED.show(); 
      }
   
   delay( 150 );
  
     //turn light on for 100 milliseconds
     for(int n = 0; n < NUM_LEDS; n++) {
     leds[n] = CRGB::White ;
     FastLED.show();
     }
   
   delay( 100 );
   } //end of if-statement
  
   //when Blue button is pressed the number '2' is sent to be interpreted by python script 
   else if (current_state != old_state) {
     old_state = current_state;
     Serial.print("2"); 
    }
  
    // LED-strip stays unlit if no button is pressed
    else {
    for(int n = 0; n < NUM_LEDS; n++) {
    leds[n] = CRGB::Black ;
    FastLED.show();
    } 
  }
}
