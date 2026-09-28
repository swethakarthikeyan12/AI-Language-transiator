const translateBtn = document.getElementById("translateBtn");

translateBtn.addEventListener("click", async function () {

    const inputText = document.getElementById("inputText").value;
    const sourceLanguage = document.getElementById("sourceLanguage").value;
    const targetLanguage = document.getElementById("targetLanguage").value;
    const outputText = document.getElementById("outputText");

    if (inputText.trim() === "") {
        outputText.value = "Please enter some text.";
        return;
    }

    if (sourceLanguage === targetLanguage) {
        outputText.value = "Please select different languages.";
        return;
    }

    outputText.value = "Translating...";

    try {
        const url =
            "https://api.mymemory.translated.net/get?q=" +
            encodeURIComponent(inputText) +
            "&langpair=" +
            sourceLanguage +
            "|" +
            targetLanguage;

        const response = await fetch(url);
        const data = await response.json();

        if (data.responseData && data.responseData.translatedText) {
            outputText.value = data.responseData.translatedText;
        } else {
            outputText.value = "Translation could not be found.";
        }

    } catch (error) {
        console.error(error);
        outputText.value = "Translation failed. Check your internet connection.";
    }
});
const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", function () {

    const outputText = document.getElementById("outputText").value;

    if (outputText.trim() === "") {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(outputText)
        .then(function () {
            alert("Translation copied!");
        })
        .catch(function () {
            alert("Copy failed. Please try again.");
        });
});
const swapBtn = document.getElementById("swapBtn");

swapBtn.addEventListener("click", function () {

    const sourceLanguage = document.getElementById("sourceLanguage");
    const targetLanguage = document.getElementById("targetLanguage");

    const oldSource = sourceLanguage.value;

    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = oldSource;
});