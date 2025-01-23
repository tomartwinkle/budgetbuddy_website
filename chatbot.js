function toggleChat() {
  const chatContainer = document.querySelector('.chat-container');
  chatContainer.style.display =
    chatContainer.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('whatIfForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userId = document.getElementById('user_id').value;
  const question = document.getElementById('question').value;

  fetch('http://localhost:5000/api/what_if', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      question: question,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const chatBox = document.getElementById('chat-box');

      const userMessage = document.createElement('div');
      userMessage.classList.add('user-message');
      userMessage.innerHTML = `<p>${question}</p>`;
      chatBox.appendChild(userMessage);

      const botMessage = document.createElement('div');
      botMessage.classList.add('bot-message');
      botMessage.innerHTML = `<p>${data.response || 'No response from backend.'}</p>`;
      chatBox.appendChild(botMessage);

      document.getElementById('question').value = '';
      chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    })
    .catch((error) => {
      console.error('Error:', error);
      const chatBox = document.getElementById('chat-box');
      const botMessage = document.createElement('div');
      botMessage.classList.add('bot-message');
      botMessage.innerHTML = `<p>An error occurred. Please try again.</p>`;
      chatBox.appendChild(botMessage);
    });
});
