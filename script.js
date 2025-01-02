let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Charger les questions à partir du fichier JSON
async function loadQuestions() {
    try {
        const response = await fetch('questions.json'); // Charger le fichier JSON
        if (!response.ok) throw new Error('Erreur lors du chargement du fichier JSON');
        questions = await response.json(); // Parser le JSON
        displayQuestion(); // Afficher la première question
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('quiz-container').textContent =
            'Impossible de charger les questions. Vérifiez le fichier JSON.';
    }
}

// Afficher la question et les options
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Réinitialiser les options

    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

// Vérifier la réponse
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const resultContainer = document.getElementById('result');
    if (selectedOption === correctAnswer) {
        score++;
        resultContainer.textContent = 'Bonne réponse !';
    } else {
        resultContainer.textContent = `Mauvaise réponse. La bonne réponse était : ${correctAnswer}.`;
    }

    // Désactiver les boutons et afficher le score
    document.getElementById('next-button').style.display = 'block';
}

// Passer à la question suivante
function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('result').textContent = ''; // Réinitialiser le résultat
    displayQuestion();
    document.getElementById('next-button').style.display = 'none';
}

// Fin du quiz
function endQuiz() {
    document.getElementById('question').textContent = 'Quiz terminé !';
    document.getElementById('options').innerHTML = '';
    document.getElementById('score').textContent = `Votre score : ${score}/${questions.length}`;
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block'; // Afficher le bouton Recommencer
}

// Recommencer le quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('restart-button').style.display = 'none'; // Cacher le bouton Recommencer
    document.getElementById('score').textContent = '';
    displayQuestion();
}

// Initialiser le quiz en chargeant les questions
loadQuestions();
