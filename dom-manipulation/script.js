document.addEventListener('DOMContentLoaded', function() {
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteButton = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn")

const quoteObject = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "If you judge people, you have no time to love them.", category: "Wisdom" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", category: "Perseverance" }
];

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quoteObject.length);
    const quote = quoteObject[randomIndex];
    document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" <br><em>(${quote.category})</em>`;
}

function createAddQuoteForm(){
    const text = document.getElementById("newQuoteText").value;
    const category = document.getElementById("newQuoteCategory").value;

    if(text && category){
        quoteObject.push({text, category});
        document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    showRandomQuote()
}
}
    quoteButton.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", createAddQuoteForm);

    showRandomQuote();  

});
