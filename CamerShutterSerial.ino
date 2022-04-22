#include "FastLED.h"

#define LED_PIN 6

#define NUM_LEDS    14
#define CHIPSET     WS2812B
#define COLOR_ORDER GRB
CRGB leds[NUM_LEDS];

#define BRIGHTNESS  255

int x;
const int buttonPin = 2;

int buttonState = 0; 


void setup() {
 Serial.begin(115200);
 Serial.setTimeout(1);

 pinMode(buttonPin, INPUT);
 
 FastLED.addLeds<CHIPSET, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection( TypicalSMD5050 );
 FastLED.setBrightness( BRIGHTNESS );
}
void loop() {
  
 buttonState = digitalRead(buttonPin);

 if (buttonState == LOW) {
  for(int n = 0; n < NUM_LEDS; n++) {
  leds[n] = CRGB::White ;
  FastLED.show();
   }
  while (!Serial.available());
  x = Serial.readString().toInt();
  Serial.print(x + 1);

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
  
  else {
  for(int n = 0; n < NUM_LEDS; n++) {
  leds[n] = CRGB::Black ;
  FastLED.show();
   }
  
 }
 

 
}
