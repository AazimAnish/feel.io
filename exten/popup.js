console.log("hi")

const emoji_mapping = {
    "admiration": "🤩",
    "amusement": "😂",
    "anger": "😡",
    "annoyance": "🙄",
    "approval": "👍",
    "caring": "❤️",
    "confusion": "🤔",
    "curiosity": "🧐",
    "desire": "🥺",
    "disappointment": "😞",
    "disapproval": "👎",
    "disgust": "🤮",
    "embarrassment": "🫣",
    "excitement": "🥳",
    "fear": "😱",
    "gratitude": "🙏",
    "grief": "😢",
    "joy": "😃",
    "love": "🥰",
    "nervousness": "😰",
    "optimism": "😁",
    "pride": "😎",
    "realization": "💡",
    "relief": "😮‍💨",
    "remorse": "😓",
    "sadness": "😭",
    "surprise": "🫣",
    "neutral": "😐"
}

const suggestion_mapping = {
    "admiration": "You're doing great! Keep it up!",
    "amusement": "Laughing is good for the soul. Find something funny!",
    "anger": "Take a deep breath and count to ten.",
    "annoyance": "Try to stay patient and take a break if needed.",
    "approval": "Your efforts are appreciated. Keep it up!",
    "caring": "Show love and support to someone close to you.",
    "confusion": "Take some time to think and seek clarity.",
    "curiosity": "Explore and learn something new.",
    "desire": "Express your feelings and desires to someone you trust.",
    "disappointment": "It's okay to feel down sometimes. Talk to someone about it.",
    "disapproval": "Discuss your concerns openly and respectfully.",
    "disgust": "Identify what's bothering you and address it.",
    "embarrassment": "Everyone makes mistakes. It's okay to move on.",
    "excitement": "Celebrate your achievements and enjoy the moment.",
    "fear": "Acknowledge your fears and take small steps to overcome them.",
    "gratitude": "Express thanks to the people who matter in your life.",
    "grief": "Allow yourself to grieve and seek support if needed.",
    "joy": "Spread happiness and share your joys with others.",
    "love": "Tell someone you love them and cherish your relationships.",
    "nervousness": "Breathe deeply and stay calm. You've got this!",
    "optimism": "Stay positive and look for the silver lining.",
    "pride": "Take pride in your accomplishments and believe in yourself.",
    "realization": "Learn from your insights and put them into action.",
    "relief": "Relax and take a moment to clear your mind.",
    "remorse": "Apologize if needed and learn from your mistakes.",
    "sadness": "It's okay to be sad. Take time to rest and reflect.",
    "surprise": "Embrace the unexpected and adapt to change.",
    "neutral": "Take a moment to reflect on your emotions and relax.",
    "":"Take care of yourself and your loved ones."
};

const activity_mapping = {
    "admiration": "Watch an inspiring documentary or read a motivational book.",
    "amusement": "Watch a funny movie or play a fun game with friends.",
    "anger": "Engage in physical activity like jogging or boxing to release pent-up energy.",
    "annoyance": "Take a nature walk or do some calming meditation.",
    "approval": "Celebrate your achievements with a small treat or a night out.",
    "caring": "Spend quality time with a loved one or volunteer to help someone in need.",
    "confusion": "Create a to-do list and organize your tasks for clarity.",
    "curiosity": "Explore a new hobby or topic that piques your interest.",
    "desire": "Plan a romantic date or express your desires to your partner.",
    "disappointment": "Listen to soothing music or write down your feelings in a journal.",
    "disapproval": "Engage in a constructive conversation to resolve conflicts.",
    "disgust": "Clean and declutter your surroundings for a fresh start.",
    "embarrassment": "Find comfort in solitude or seek solace in a trusted friend.",
    "excitement": "Plan a celebration or an adventure with friends and family.",
    "fear": "Confront your fears gradually or seek professional support if necessary.",
    "gratitude": "Write a heartfelt thank-you note or practice gratitude journaling.",
    "grief": "Create a memorial or participate in a support group for comfort.",
    "joy": "Dance, sing, or indulge in activities that bring you joy.",
    "love": "Plan a surprise for your loved one or share a special moment together.",
    "nervousness": "Practice deep breathing exercises or engage in relaxation techniques.",
    "optimism": "Set positive goals and take steps to achieve them.",
    "pride": "Celebrate your accomplishments and showcase your talents.",
    "realization": "Implement your insights and work on self-improvement.",
    "relief": "Take a break or engage in a calming hobby like painting or gardening.",
    "remorse": "Apologize sincerely and make amends for your actions.",
    "sadness": "Spend time in self-care, do something you enjoy, or seek comfort from a friend.",
    "surprise": "Embrace the moment, explore new opportunities, and be open to change.",
    "neutral": "Reflect on your day and engage in activities that bring you peace.",
    "":"Take care of yourself and your loved ones."
};

let url = "https://nodeformakeaton.onrender.com" 

const resp = await fetch(url+"/lasthours", {
    method: 'POST',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({hours:10}),
  })
const top3Categories = await resp.json();
console.log(top3Categories)


        document.getElementById("recommendation2").innerHTML = activity_mapping[top3Categories[0]["mood"]]
        document.getElementById("recommendation1").innerHTML = suggestion_mapping[top3Categories[0]["mood"]]
        document.getElementById("mood1").innerHTML = top3Categories[0]["mood"]
        document.getElementById("emoji1").innerHTML = emoji_mapping[top3Categories[0]["mood"]]
        document.getElementById("emoji2").innerHTML = emoji_mapping[top3Categories[1]["mood"]]
        document.getElementById("emoji3").innerHTML = emoji_mapping[top3Categories[2]["mood"]]
