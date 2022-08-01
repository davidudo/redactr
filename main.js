startapp();

function startapp() {
  const copy_button = document.getElementById("copy-btn");
  const delete_button = document.getElementById("delete-btn");
  const redact_button = document.getElementById("redact-btn");

  redact_button.addEventListener("click", (e) => {
    redactText();
  });

  delete_button.addEventListener("click", (e) => {
    deleteText();
  });

  copy_button.addEventListener("click", (e) => {
    copyText();
  });
};


function redactText() {
  const text_area = document.getElementById("text");
  const replace_word = document.getElementById("replace-word");
  const replace_character = document.getElementById("replace-character");

  let text = text_area.value;
  let word_to_redact = replace_word.value;
  let scramble_character = replace_character.value;
  scramble_character = scramble_character || "#";

  word_to_redact = word_to_redact.toLowerCase().trim();
  let splitted_original_text;
  let first_word = text.toLowerCase().split(" ")[0];

  if (first_word === word_to_redact) {
    splitted_original_text = text.trim().toLowerCase().split(" ");
  } else {
    splitted_original_text = text.trim().split(" ");
  };

  const scrambled_word = scramble_character.repeat(word_to_redact.length);

  if ((text && word_to_redact) === "") {
    alert("Boss! Input something in at least the first two input fields.")
    return
  };

  let match_count = 0;

  const start_time = performance.now()

  for (let index in splitted_original_text) {
    if ((splitted_original_text[index].replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()) === (word_to_redact)) {
      splitted_original_text[index] = scrambled_word;
      match_count = match_count + 1;
    }
  };

  const end_time = performance.now()

  const redacted_text = splitted_original_text.join(" ");
  const number_of_word = text.length;
  const number_of_text = splitted_original_text.length;
  const time_taken = (end_time - start_time).toFixed(2);

  displayRedactedText(redacted_text);

  displayStat(number_of_word, number_of_text, match_count, time_taken, word_to_redact);
  
  const copy_button = document.getElementById("copy-btn");
  copy_button.style.display = "block"
};


function displayRedactedText(redacted_text) {
  const redacted_text_disp = document.getElementById("redacted-text");
  const dummy_loading = document.getElementById("dummy-loading");

  redacted_text_disp.innerText = redacted_text;
  dummy_loading.style.display = "none";
};


function displayStat(number_of_word, number_of_text, match_count, time_taken, word_to_redact) {
  const words_scanned_disp = document.getElementById("words-scan");
  const matched_words_disp = document.getElementById("matched-words");
  const characters_scrambled_disp = document.getElementById("characters-scramb");
  const time_taken_disp = document.getElementById("time-taken");

  words_scanned_disp.innerText = number_of_text;
  matched_words_disp.innerText = match_count;
  characters_scrambled_disp.innerText = (match_count * word_to_redact.length);
  time_taken_disp.innerText = time_taken + "s";
};


async function copyText() {
  const redacted_text = document.getElementById("redacted-text");
  const tooltip = document.getElementById("tooltip");

  try {
    await navigator.clipboard.writeText(redacted_text.innerHTML)
    tooltip.innerText = "Copied Text!";
  } catch (e) {
    tooltip.innerText = "Could not copy text!";

  };
};


function deleteText() {
  const text_area = document.getElementById("text");
  const replace_word = document.getElementById("replace-word");
  const replace_character = document.getElementById("replace-character");
  const redacted_text_disp = document.getElementById("redacted-text");

  text_area.value = "";
  replace_word.value = "";
  replace_character.value = "";
  redacted_text_disp.innerHTML = "";

  const words_scanned_disp = document.getElementById("words-scan");
  const matched_words_disp = document.getElementById("matched-words");
  const characters_scrambled_disp = document.getElementById("characters-scramb");
  const time_taken_disp = document.getElementById("time-taken");

  words_scanned_disp.innerText = "0";
  matched_words_disp.innerText = "0";
  characters_scrambled_disp.innerText = "0";
  time_taken_disp.innerText = "0s";

  const dummy_loading = document.getElementById("dummy-loading");
  dummy_loading.style.display = "block";
  
  const copy_button = document.getElementById("copy-btn");
  copy_button.style.display = "none";
};
