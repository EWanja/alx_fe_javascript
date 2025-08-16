    const quoteObject = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "If you judge people, you have no time to love them.", category: "Wisdom" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", category: "Perseverance" }
    ];  

    //function to save new quotes
    function saveQuotesToStorage(){

            localStorage.setItem("quoteObject", JSON.stringify(quoteObject))
        }
    //function to import new quotes from json file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quoteObject.push(...importedQuotes);
        saveQuotesToStorage();
        alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }


    document.addEventListener('DOMContentLoaded', function() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const quoteButton = document.getElementById("newQuote");
    const addQuoteBtn = document.getElementById("addQuoteBtn");
    const exportQuoteBtn = document.getElementById("exportQuoteBtn");
    const importFileInput = document.getElementById("importFile");


    //function to showrandom quotes
    function showRandomQuote(){
    quoteDisplay.innerHTML ="";

    const randomIndex = Math.floor(Math.random() * quoteObject.length);
    const quote = quoteObject[randomIndex];
    
    const quoteText = document.createElement("span");
    quoteText.textContent = `"${quote.text}" `;

    const quoteCategory = document.createElement("em");
    quoteCategory.textContent = `(${quote.category})`;

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(document.createElement("br"));
    quoteDisplay.appendChild(quoteCategory);
    }

    function createAddQuoteForm(){
    const text = document.getElementById("newQuoteText").value;
    const category = document.getElementById("newQuoteCategory").value;

    if(text && category){
        quoteObject.push({text, category});

        saveQuotesToStorage(quoteObject);

        document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    showRandomQuote()
    }
    }

    // function to  load quotes stored in storage
    function loadQuotesFromStorage(){
        const storedQuotes = localStorage.getItem('quoteObject')
        if (storedQuotes){
            return  JSON.parse(storedQuotes);
        }
        return null;
    }
     // function to export and download quotes
    function exportQuotes(){

        const jsonData = JSON.stringify(quoteObject, null, 2);

        //create a blob from JSON
        const blob = new Blob ([jsonData], {type:"application/json"});

        const url = URL.createObjectURL(blob);

        //create a hidden <a> for download
        const a = document.createElement("a");
        a.href = url;
        a.download = `quotes_${new Date().toISOString().slice(0,19).replace(/[:T]/g, "-")}.json`;

        //add link to document
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    
        URL.revokeObjectURL(url);
    }

    //event listeners 

    quoteButton.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", createAddQuoteForm);
    exportQuoteBtn.addEventListener("click", exportQuotes);
    importFileInput.addEventListener("change" ,importFromJsonFile);

    showRandomQuote();  

    });
