const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passBox = document.getElementById("passBox");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const genBtn = document.getElementById("genBtn");
const copyIcon = document.getElementById("copyIcon");
const strengthText = document.getElementById("strength");
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
});
genBtn.addEventListener("click", () => {
    const password = generatePassword();
    passBox.value = password;
    updateStrength(password);
});
copyIcon.addEventListener("click", () => {
    if (passBox.value) {
        navigator.clipboard.writeText(passBox.value);
        alert("Password copied to clipboard!");
    }
});
function generatePassword() {
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allNumbers = "0123456789";
    const allSymbols = "~!@#$%^&*";
    let allChars = "";
    if (lowercase.checked) allChars += lowerChars;
    if (uppercase.checked) allChars += upperChars;
    if (numbers.checked) allChars += allNumbers;
    if (symbols.checked) allChars += allSymbols;
    if (!allChars) {
        alert("Please select at least one option!");
        return "";
    }
    let password = "";
    for (let i = 0; i < inputSlider.value; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return password;
}
function updateStrength(password) {
    const strength = getStrength(password);
    strengthText.textContent = strength;
    strengthText.style.color =
        strength === "Weak" ? "red" : strength === "Medium" ? "orange" : "green";
}
function getStrength(password) {
    if (password.length < 8) return "Weak";
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/)) {
        return password.match(/[^a-zA-Z0-9]/) ? "Strong" : "Medium";
    }
    return "Weak";
}
