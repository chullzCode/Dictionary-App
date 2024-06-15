


const form = document.querySelector("form");
const recipeDiv = document.querySelector(".recipe");


form.addEventListener("submit", (e)=>{
    recipeDiv.style.display = "flex"
    e.preventDefault();
    getWordInfo(form.elements[0].value)
});

const getWordInfo = async(word)=>{

    try {
        
    recipeDiv.innerHTML = "fetching Data....";

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data);

    let defenitions = data[0].meanings[0].definitions[0];

    recipeDiv.innerHTML = 
    `<h2><strong>Word:</strong>${data[0].word}</h2>
    <p class = "partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${defenitions.definition === undefined ? "Not found" : defenitions.definition}</p>
    <p><strong>Example:</strong>${defenitions.example === undefined ? "Not found" : defenitions.example}</p>
    <p><strong>Antonyms:</strong>
`;

// fetching the antonyms
    if(defenitions.antonyms.length === 0){
        recipeDiv.innerHTML += `<span>Not Found</span>`;
    }
    else{
        for(let i=0; i<defenitions.antonyms.length; i++){
            recipeDiv.innerHTML += `<li>${defenitions.antonyms[i]}</li>`
        }
   } 

recipeDiv.innerHTML += `<p><strong>Antonyms:</strong>`

// Fetching the synonyms

    if(defenitions.synonyms.length === 0){
        recipeDiv.innerHTML += `<span>Not Found</span>`;
    }
    else{
        for(let i=0; i<defenitions.synonyms.length; i++){
            recipeDiv.innerHTML += `<li>${defenitions.synonyms[i]}</li>`
        }
   } 

// adding a link to read more 

recipeDiv.innerHTML += `<div><a href = "${data[0].sourceUrls}"target = "_blank">Read More</a></div>`
} 
catch (error) {
    recipeDiv.innerHTML = `<p>Sorry ,The word could not be found! </p>`
    
}};

