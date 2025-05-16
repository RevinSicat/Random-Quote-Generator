//HTML Elements variables


//Variables
const qoutesSourceLink = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const colors = [
    "#222222", 
    "#ff5252", 
    "#00b4d8", 
    "#ffc107", 
    "#8b5e3c", 
    "#d4a373", 
    "#6c9c89", 
    "#800020", 
    "#00416a", 
    "#ff4500", 
    "#9400d3", 
    "#228b22", 
    "#ff00ff", 
    "#1e90ff", 
    "#8b0000", 
];


let qoutesData = [];
let randomInt = 0;
//Functions
const getQoutesData = async () => {
    try {
        const response = await fetch(qoutesSourceLink);
        const data = await response.json();
        qoutesData = data.quotes;
        getRandomQoute();
    }
    catch (err) {
        console.error("Failed to fetch quotes:", err);
    }
}
const textScramble = (text, element) => {
    const chars = "!@#$%^&*()_+{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const words = text.split(" ");
    let iterations = 0;
    const maxIterations = Math.max(...words.map(word => word.length));
    const intervalTime = 50;
    
    const interval = setInterval(() => {
        let scrambledSentence = words.map(word => {
            let scrambled = "";
            for (let i = 0; i < word.length; i++) {
                scrambled += i < iterations ? word[i] : chars[Math.floor(Math.random() * chars.length)];
            }
            return scrambled;
        }).join(" ");

        element.textContent = scrambledSentence;
        $(element).text(`${scrambledSentence}`);
        
        iterations++;
        if (iterations > maxIterations) {
            clearInterval(interval);
        }
    }, intervalTime);
};

const getRandomQoute = () => {
    randomInt = Math.floor(Math.random() * qoutesData.length);
    textScramble(`"${qoutesData[randomInt].quote}"`, "#text");
    textScramble(`- ${qoutesData[randomInt].author}`, "#author");
    randomInt = Math.floor(Math.random() * colors.length);
    $("#text").css("color",`${colors[randomInt]}`);
    $("#author").css("color",`${colors[randomInt]}`);
    $("#new-quote").css("background-color",`${colors[randomInt]}`);
    $("body").css("background-color",`${colors[randomInt]}`);
    $("#tweet-quote").css("background-color",`${colors[randomInt]}`);
}
const tweetQoute = () => {
    const quote = $("#text").text();
    const author = $("#author").text();
    const tweetText = encodeURIComponent(`"${quote}" ${author}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    $("#tweet-quote").attr("href", twitterUrl);
}
//Event Listeners
$("#new-quote").on("click", getRandomQoute);
$("#tweet-quote").on("click", tweetQoute);
//Initialization
getQoutesData();