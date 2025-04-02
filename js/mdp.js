let attempts = 3;
let lockTime = 0;

const submitPasswordButton = document.getElementById('submitPasswordButton');
const passwordField = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const attemptsMessage = document.getElementById('attemptsMessage');
const waitMessage = document.getElementById('waitMessage');
const attemptsLeft = document.getElementById('attemptsLeft');
const passwordPrompt = document.getElementById('passwordPrompt');
const siteContent = document.getElementById('siteContent');
const successMessage = document.getElementById('successMessage'); // Ajout du message de succès

function checkPassword() {
    const correctPassword = "mynameisalexa";  // Le mot de passe correct.
    const enteredPassword = passwordField.value;

    if (lockTime > 0) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime < lockTime) {
            waitMessage.textContent = `Veuillez patienter ${lockTime - currentTime} secondes avant de réessayer.`;
            waitMessage.style.display = "block";
            return;
        } else {
            lockTime = 0;
            attempts = 3;
            attemptsMessage.style.display = "none";
            waitMessage.style.display = "none";
        }
    }

    if (enteredPassword === correctPassword) {
        successMessage.style.display = "block";

        setTimeout(function() {
            successMessage.style.display = "none";
            passwordPrompt.style.display = "none";
            siteContent.style.display = "block"; 
            siteContent.style.opacity = "1"; 
        }, 1500);
    } else {
        attempts--;
        if (attempts > 0) {
            errorMessage.style.display = "block";
            attemptsMessage.style.display = "block";
            attemptsLeft.textContent = attempts;
        } else {
            lockTime = Math.floor(Date.now() / 1000) + 30;
            errorMessage.style.display = "none";
            attemptsMessage.style.display = "none";
            waitMessage.style.display = "block";

            setTimeout(function() {
                waitMessage.style.display = "none";
            }, 30000);
        }
    }
}

submitPasswordButton.addEventListener('click', checkPassword);

passwordField.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});