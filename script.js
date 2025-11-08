// ==========================
// MQTT CONFIG
// ==========================
const topicTemp = "iot/andre/temp";
const topicHum  = "iot/andre/hum";
const topicCmd  = "iot/andre/cmd/fan";

// pakai broker websocket biar gak timeout
const client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");

// ==========================
// EVENT CONNECTION
// ==========================
client.on("connect", () => {
  const status = document.getElementById("status");
  status.textContent = "✅ Connected";
  client.subscribe(topicTemp);
  client.subscribe(topicHum);
  console.log("Connected and subscribed!");
});

client.on("message", (topic, msg) => {
  if (topic === topicTemp) document.getElementById("temp").textContent = msg.toString();
  if (topic === topicHum)  document.getElementById("hum").textContent = msg.toString();
});

client.on("error", (err) => {
  document.getElementById("status").textContent = "❌ Connection Error";
  console.error("MQTT error:", err);
});

// ==========================
// BUTTON HANDLERS
// ==========================
document.getElementById("btnOn").addEventListener("click", () => {
  client.publish(topicCmd, "ON");
  console.log("Sent: ON");
});

document.getElementById("btnOff").addEventListener("click", () => {
  client.publish(topicCmd, "OFF");
  console.log("Sent: OFF");
});
