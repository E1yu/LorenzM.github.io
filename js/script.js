const chatbotWindow = document.getElementById('chatbot-window');
const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');

function toggleChatbot() {
    chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
}

function generateResponse(input) {
    let response = "";

    if (input.includes('schedule')) {
        response = `
            <b>Monday</b>: Comp2 at 7AM - 9AM, Comp 1 at 1AM to 10AM and PE at 1PM to 5PM<br>
            <b>Tuesday</b>: UTS at 10AM, TCW, ARTS, MATH at 1PM to 5PM<br>
            <b>Wednesday</b>: Comp2 at 7AM - 10AM, Comp 1 at 11AM to 2PM and NSTP 1PM to 5PM<br>
            <b>Thursday</b>: UTS at 10AM, TCW, ARTS, MATH at 1PM to 5PM<br>
            <b>Friday</b>: Free day!
        `;
    } else if (input.includes('picture')) {
        response = `Here's a picture of me (click it for a website recommendation):<br>
            <a href="https://www.leetcode.com" target="_blank"><img src="https://i.ibb.co/5Mdr1KJ/LPU-1621-1.jpg" alt="My Picture"></a><br>
            I love this website because it provides amazing resources and inspiration for tech enthusiasts like me!`;
    } else if (input.includes('hi')) {
        response = 'Hello! Type in either "picture" or "schedule". I can also tell you a joke, give information about the weather, or even chat about your favorite food!';
    } else if (input.includes('how are you')) {
        response = "I'm doing great, thanks for asking! How about you?";
    } else if (input.includes('what\'s up') || input.includes('what\'s new')) {
        response = "Not much, just here to help you with whatever you need! What's up with you?";
    } else if (input.includes('bye') || input.includes('goodbye')) {
        response = "Goodbye! Have a wonderful day! If you need me, just type 'Hi'.";
    } else if (input.includes('thank you') || input.includes('thanks')) {
        response = "You're welcome! I'm happy to help anytime!";
    } else if (input.includes('favorite color')) {
        response = "My favorite color is blue! How about you?";
    } else if (input.includes('favorite food')) {
        response = "I love pizza! It's hard to beat a classic. What's your favorite food?";
    } else if (input.includes('where are you from')) {
        response = "I live in the digital world, always here to assist you! Where are you from?";
    } else if (input.includes('tell me a joke')) {
        response = "Why don't skeletons fight each other? They don’t have the guts!";
    } else if (input.includes('help me')) {
        response = "Of course! What do you need help with? Just let me know!";
    } else if (input.includes('weather')) {
        response = "I can't check the weather for you, but I recommend checking your favorite weather app!";
    } else if (input.includes('time')) {
        response = `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (input.includes('good morning')) {
        response = "Good morning! Hope you have a great day ahead!";
    } else if (input.includes('good night')) {
        response = "Good night! Sleep well and take care!";
    } else if (input.includes('your name')) {
        response = "I'm Lorenz, your friendly chatbot assistant!";
    } else if (input.includes('capable of') || input.includes('can do')) {
        response = "I can help with your schedule, show you a picture, tell a joke, chat about various topics, and much more. Just ask!";
    } else if (input.includes('help') || input.includes('hello')) {
        response = "I can help with your schedule, show you a picture, tell a joke, chat about various topics, and much more. Just ask!";
    } else {
        response = "I can help with your schedule or show you a picture of me. Just type 'schedule' or 'picture'.";
    }

    return response;
}

function handleMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    // Show user message
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-message');
    userDiv.innerHTML = `You: ${userMessage}`;
    chatOutput.appendChild(userDiv);

    // Clear user input
    userInput.value = '';

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = `Lorenz (Bot) is typing...`;
    chatOutput.appendChild(typingIndicator);
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Delay before showing bot response
    setTimeout(() => {
        chatOutput.removeChild(typingIndicator);

        const responseDiv = document.createElement('div');
        responseDiv.classList.add('bot-message');
        const botResponse = generateResponse(userMessage.toLowerCase());
        responseDiv.innerHTML = `Lorenz (Bot): ${botResponse}`;
        chatOutput.appendChild(responseDiv);
        chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the latest message
    }, 2000); // 2 seconds delay
}

const background = document.querySelector('.background');

function moveBackground(event) {

  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;


    const rotateX = (y - 50) / 10; 
    const rotateY = (50 - x) / 10;

    background.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}


window.addEventListener('mousemove', moveBackground);

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission
        handleMessage(); // Call the handleMessage function
    }
});

