const form = document.getElementById('registrationForm');
const userinfo = () => {
    const user_s = JSON.parse(localStorage.getItem('users'));
    document.getElementById("userone").innerHTML = user_s[0];
    document.getElementById("usertwo").innerHTML = user_s[1];

  console.log(typeof user_s)
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const user1 = document.getElementById('user1').value;
  const user2 = document.getElementById('user2').value;
  if (!user1 || !user2) {
    alert('Please fill in all required fields.');
    return;
  }
  let users =[user1,user2];
  localStorage.setItem('users', JSON.stringify(users));
  alert('user added');
  window.location.href = "main.html";
});



function startConnect() {
 
  clientID = "my-client-" + Math.random().toString(36).substring(2, 7);

  host = 'broker.hivemq.com';
  port = 8000;
  client = new Paho.Client(host, Number(port), clientID);
  const connectOptions = {
    onSuccess: onConnect,
  };

  try {
    client.connect(connectOptions);
    console.log("Connecting to MQTT broker...");
  } catch (error) {
    console.error("Error connecting:", error);
  }
}

function onConnect() {
  console.log("Connected!");

  const topic = 'room1';
  client.subscribe(topic, { qos: 0 }); 
  console.log('Subscribed to topic:', topic);

 
  publishMessage(client)
  client.onMessageArrived = onMessageReceived;
}

function publishMessage(client) {
  try {

    if (true) {
      const msg = document.getElementById("type-area1").value; 
      const message = new Paho.Message(msg);
      message.destinationName = 'room1'; 
      client.send(message);
      console.log('Message sent to topic:', message.destinationName, msg);
      document.getElementById("msgsend1").innerHTML = msg;
    } else {
      console.log('Cannot send message. Client is not connected.');
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
function onConnectionLost(responseObject) {
  console.error("Connection lost:", responseObject.errorMessage);


}
function onMessageReceived(message) {

  const topic = message.destinationName;
  const payload = message.payloadString;
  
  console.log('Message received:', topic, payload);
  document.getElementById("msgrecieved2").innerHTML = payload;
  document.getElementById("type-area1").innerHTML = '';
  
 
}
function startConnect2() {
  clientID = "my-client-" + Math.random().toString(36).substring(2, 7);
  host = 'broker.hivemq.com';
  port = 8000;
  client = new Paho.Client(host, Number(port), clientID);
  const connectOptions = {
    onSuccess: onConnect2,
  };
  try {
    client.connect(connectOptions);
    console.log("Connecting to MQTT broker...");
  } catch (error) {
    console.error("Error connecting:", error);
  }
}

function onConnect2() {
  console.log("Connected!");
  const topic = 'room2';
  client.subscribe(topic, { qos: 0 }); 
  console.log('Subscribed to topic:', topic);
  publishMessage2(client)
  client.onMessageArrived = onMessageReceived2;
}

function publishMessage2(client) {
  try {
    // console.log(client)
    if (true) {
      const msg = document.getElementById("type-area2").value; 
      console.log("type-area2",msg)
      const message = new Paho.Message(msg);
      message.destinationName = 'room2'; 
      client.send(message);
      console.log('Message sent to topic:', message.destinationName, msg);
      document.getElementById("msgsend2").innerHTML = msg;
    } else {
      console.log('Cannot send message. Client is not connected.');
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
function onConnectionLost2(responseObject) {
  console.error("Connection lost:", responseObject.errorMessage);
}
function onMessageReceived2(message) {
  const topic = message.destinationName;
  const payload = message.payloadString;
  console.log('Message received:', topic, payload);
  document.getElementById("msgrecieved1").innerHTML = payload;
  document.getElementById("type-area2").innerHTML = '';
}