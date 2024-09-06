// JAVA-SCRIPT:
const select_tag = document.querySelectorAll("select");
const user_text = document.getElementById("text-from");
const output_text = document.getElementById("text-to");
const exchange_button = document.getElementById("exchange");
const translation_button = document.getElementById("translate-button");
const icons = document.querySelectorAll(".row i");

select_tag.forEach((tags, id) =>
{
    for (const countires_code in countries) 
    {
        let selected;

        if(id == 0 & countires_code == "en-GB")
        {
            selected = "selected";
        }
        else if(id == 1 & countires_code == "hi-IN")
        {
            selected = "selected";
        }

        let option = `<option value="${countires_code}" ${selected}>${countries[countires_code]}</option>`;
        tags.insertAdjacentHTML("beforeend", option);
    }
});

translation_button.addEventListener("click", () =>
{
    // USER-INPUT-TEXT
    let input_text = user_text.value;

    // LANGUAGE-TRANSLATE
    let translate_from = select_tag[0].value;
    let translate_to = select_tag[1].value;

    if(input_text == "") return;
    output_text.setAttribute("placeholder", "Translating...");

    // API
    let api_url = `https://api.mymemory.translated.net/get?q=${input_text}&langpair=${translate_from}|${translate_to}`;
    fetch(api_url).then(res => res.json()).then(data =>
    {
        output_text.innerText = data.responseData.translatedText;
        console.log(data);
    });
});

exchange_button.addEventListener("click", () =>
{
    let temp_text = user_text.value;
    user_text.value = output_text.value;
    output_text.value = temp_text;

    let temp_lang = select_tag[0].value;
    select_tag[0].value = select_tag[1].value;
    select_tag[1].value = temp_lang;
});

icons.forEach(icon =>
{
    icon.addEventListener("click", ({target}) =>
    {
        if(target.classList.contains("fa-copy"))
        {
            if(target.id == "from")
            {
                navigator.clipboard.writeText(user_text.value);
            }
            else
            {
                navigator.clipboard.writeText(output_text.value);
            }
        }
        else
        {
            let message_voice;

            if(target.id == "from")
            {
                message_voice = new SpeechSynthesisUtterance(user_text.value);
                message_voice.lang = select_tag[0].value;
            }
            else
            {
                message_voice = new SpeechSynthesisUtterance(output_text.value);
                message_voice.lang = select_tag[1].value;
            }
            speechSynthesis.speak(message_voice);
        }
    });
});