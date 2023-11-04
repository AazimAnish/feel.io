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


document.addEventListener("DOMContentLoaded", (event) => {
    chrome.storage.local.get(["top3"]).then((result) => {
        console.log(result.top3)
        //document.getElementById("mood3").innerHTML = result.top3[2]["category"]
        //document.getElementById("mood2").innerHTML = result.top3[1]["category"]
        document.getElementById("mood1").innerHTML = result.top3[0]["category"]
        document.getElementById("emoji1").innerHTML = emoji_mapping[result.top3[0]["category"]]
        document.getElementById("emoji2").innerHTML = emoji_mapping[result.top3[1]["category"]]
        document.getElementById("emoji3").innerHTML = emoji_mapping[result.top3[2]["category"]]
        
        
      });
  });
