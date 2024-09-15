const upperCaseLetters = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnpqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*{}[]()/\\'\"~,;:.<>";

const similarChars = "Il1O0";
const ambiguousChars = "{}[]()/\\'\"~,;:.<>";

function generatePassword() {
  const length = document.getElementById("length").value;
  const includeUpper = document.getElementById("uppercase").checked;
  const includeLower = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;
  const excludeSimilar = document.getElementById("excludeSimilar").checked;
  const excludeAmbiguous = document.getElementById("excludeAmbiguous").checked;

  let characterSet = "";
  let password = "";
  let guaranteedCharacters = [];

  if (includeUpper) {
    characterSet += upperCaseLetters;
    chSet = upperCaseLetters;
    guaranteedCharacters.push(randomCharacterFromSet(upperCaseLetters));
  }
  if (includeLower) {
    characterSet += lowerCaseLetters;
    guaranteedCharacters.push(randomCharacterFromSet(lowerCaseLetters));
  }
  if (includeNumbers) {
    characterSet += numbers;
    guaranteedCharacters.push(randomCharacterFromSet(numbers));
  }
  if (includeSymbols) {
    characterSet += symbols;
    guaranteedCharacters.push(randomCharacterFromSet(symbols));
  }

  if (characterSet === "") {
    alert("Please select at least one character type.");
    return;
  }

  if (excludeSimilar)
    characterSet = removeCharacters(characterSet, similarChars);
  if (excludeAmbiguous)
    characterSet = removeCharacters(characterSet, ambiguousChars);

  for (let i = guaranteedCharacters.length; i < length; i++) {
    password += randomCharacterFromSet(characterSet);
  }

  guaranteedCharacters.forEach((char) => {
    const randomPosition = Math.floor(Math.random() * (password.length + 1));
    password =
      password.slice(0, randomPosition) + char + password.slice(randomPosition);
  });

  document.getElementById("password").value = password;
}

function randomCharacterFromSet(characterSet) {
  return characterSet[Math.floor(Math.random() * characterSet.length)];
}

function removeCharacters(characterSet, charsToRemove) {
  return characterSet
    .split("")
    .filter((char) => !charsToRemove.includes(char))
    .join("");
}

function removeCharacters(characterSet, charsToRemove) {
  return characterSet
    .split("")
    .filter((char) => !charsToRemove.includes(char))
    .join("");
}

function copyToClipboard() {
  const password = document.getElementById("password");
  if (password.value === "") {
    alert("No password to copy!");
    return;
  }
  password.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!");
}

document.getElementById("generate").addEventListener("click", generatePassword);
document.getElementById("copy").addEventListener("click", copyToClipboard);
