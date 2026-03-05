const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Replace with your VAPI Assistant API endpoint and API key
const VAPI_URL =
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if(!message) return;

  appendMessage('You', message);
  userInput.value = '';

  try {
    const response = await fetch(VAPI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VAPI_KEY}`
      },
      body: JSON.stringify({ input: message })
    });

    const data = await response.json();
    const reply = data.output_text || "Sorry, I didn't understand that.";
    appendMessage('Agent', reply);

  } catch (error) {
    appendMessage('Agent', "Error connecting to AI agent.");
    console.error(error);
  }
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
