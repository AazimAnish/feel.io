import {initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js'
import { getDatabase, set, get, ref, child, push, onValue } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js'
  

const firebaseConfig = {
    apiKey: "AIzaSyBLOrV8K_-MYavFlHf7HiYwUHmUQSt2YzA",
    databaseURL: " https://empath-866ce-default-rtdb.asia-southeast1.firebasedatabase.app",
    authDomain: "empath-866ce.firebaseapp.com",
    projectId: "empath-866ce",
    storageBucket: "empath-866ce.appspot.com",
    messagingSenderId: "688144290902",
    appId: "1:688144290902:web:2cb7523e3db636e6e717f7",
    measurementId: "G-BC0BZWP1VD"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase()
const dbRef = ref(getDatabase());

function sendtopopup(){
    

    get(child(dbRef, `data`)).then((snapshot) => {
		if (snapshot.exists()) {
            let data = snapshot.val()
            const latest = 6
            const objectKeys = Object.keys(data);
            data = objectKeys.slice(-latest).reduce((result, key) => {
            result[key] = data[key];
            return result;
            }, {});

            console.log(data);

            const allCategories = [];

            for (const key in data) {
              const category = data[key].mood;
              allCategories.push(category);
            }
            const categoryCounts = allCategories.reduce((acc, category) => {
                acc[category] = (acc[category] || 0) + 1;
                return acc;
              }, {});
              
              // Step 2: Convert the object into an array of objects for sorting
              const categoryArray = Object.entries(categoryCounts).map(([category, count]) => ({
                category,
                count,
              }));
              
              // Step 3: Sort the array based on the frequency in descending order
              categoryArray.sort((a, b) => b.count - a.count);
              
              // Step 4: Get the top 3 categories
              
            const top3Categories = categoryArray.slice(0, 3);
            console.log(top3Categories)

            chrome.storage.local.set({ "top3": top3Categories }).then(() => {
                console.log("Value is set");
            });
		}
	})
}


function getdata(){
	get(child(dbRef, `data`)).then((snapshot) => {
		if (snapshot.exists()) {
			return snapshot.val()
		}
	})
}



function adddata(timestamp, prompt, mood, score){
    console.log(timestamp, prompt, mood, score)
	set(ref(db, "data/"+timestamp), {
		prompt: prompt,
		mood: mood,
		score: score,
        cluster:""
	});
    sendtopopup()   
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "forbackground"){
            console.log(sender.tab ?"from a content script:" + sender.tab.url : "from the extension");
      
            adddata(request.timestamp,request.prompt, request.mood, request.score)
            if (request.greeting === "hello")
                sendResponse({farewell: "goodbye"});
        }
      
    }
  );
