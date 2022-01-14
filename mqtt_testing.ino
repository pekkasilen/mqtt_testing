#include <ArduinoMqttClient.h>
#include <ESP8266WiFi.h>

String ssid = "vihreathaisee";
String pwd = "SalainenSana1";
WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "10.15.10.132";
int port = 1883;
const char topic[] = "presence";

long lastPollInMillis = millis();

String msgToSend = "";

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  delay(500);
  
  Serial.print("Wifiin: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pwd) != WL_CONNECTED) {
    Serial.print(".");
    delay(5000);
  }

  Serial.println("WiFi ok");

  Serial.print("Mosquitoon MQTT brokeriin: ");
  Serial.println(broker);

  if (!mqttClient.connect(broker, port)) {
    Serial.print("Vituiks män, virhekoodi: ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();
  
  mqttClient.onMessage(onMqttMessage);

  Serial.print("Topicci: ");
  Serial.println(topic);
  mqttClient.subscribe(topic);

  Serial.print("Waiting for messages on topic: ");
  Serial.println(topic);
  Serial.println();
}
long lastPoll = millis();
void loop() {
  if((millis()-lastPoll)>2000){
    mqttClient.poll();
    lastPoll = millis();
  }
}

void onMqttMessage(int messageSize) {
  Serial.println("Viesti tuli: '");
  Serial.print(mqttClient.messageTopic());
  Serial.print("', length ");
  Serial.print(messageSize);
  Serial.println(" bytes:");

  while (mqttClient.available()) {
    Serial.print((char)mqttClient.read());
  }
  Serial.println();
}
