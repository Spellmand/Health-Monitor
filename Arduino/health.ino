#include "SocketIOClient.h"
#include <ArduinoJson.h>
#include <Wire.h>
#include <WiFi.h>

extern String RID;
extern String Rname;
extern String Rcontent;

SocketIOClient client;

const char* ssid     = "YU87";
const char* password = "waffenSS1997";

////type ip and port of your devicesocket server
char host[] = "192.168.88.249";
int port = 3000;

void setup() {
  Serial.begin(115200);

  delay(500);

  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("Connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  while (!client.connect(host, port)) {
    Serial.print("connection failed");
    delay(1000);
  }
  if (client.connected())
  {
    client.send("connection", "message", "Device is connected");
  }

  Serial.println();
}

void loop() {

  if (client.connected())
  {
    getAndSendData();
  } else
  {
    Serial.println("Connection failed");
    client.connect(host, port);
    delay(500);
  }
}

void getAndSendData() {
  Serial.println("Sending");
  String JSON;
  StaticJsonBuffer<400> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["device"] = 1;
  root["id"] = 1;
  root.printTo(JSON);
  client.sendJSON("json", JSON);
  delay(2);
}
