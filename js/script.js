let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Charger le fichier JSON
async function loadJSON() {
    try {
        const response = await fetch('data/questions.json'); // Assurez-vous que le fichier JSON est bien placé dans le même répertoire
        if (!response.ok) throw new Error('Erreur lors du chargement du fichier JSON');
        const jsonData = await response.json();
        questions = jsonData;
        shuffleQuestions();
        displayQuestion();
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('quiz-container').textContent =
            'Impossible de charger les questions. Vérifiez le fichier JSON.';
    }
}

// Mélanger les questions
function shuffleQuestions() {
    questions.sort(() => 0.5 - Math.random()); // Mélange le tableau aléatoirement
    questions = questions.slice(0, 10); // Sélectionne les 10 premières questions
  }

// Afficher une question
function displayQuestion() {
    if (currentQuestionIndex >= 10) { // Vérifier si 10 questions ont été posées
        endQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const questionContainer = document.getElementById('question');
    questionContainer.textContent = currentQuestion.question_text || 'Question non définie';

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    // Créer les boutons pour les options
    ['a', 'b', 'c'].forEach(option => {
        const optionKey = `option_${option}`;
        if (currentQuestion[optionKey]) {
            const button = document.createElement('button');
            button.textContent = currentQuestion[optionKey];
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        }
    });
}

// Vérifier la réponse
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const resultContainer = document.getElementById('result');
    const correctOption = currentQuestion.correct_option.toLowerCase();

    // Vérification de la bonne réponse
    if (selectedOption === correctOption) {
        score++;
        resultContainer.textContent = 'Bonne réponse !';
    } else {
        resultContainer.textContent = `Mauvaise réponse. La bonne réponse était : ${correctOption}.`;
    }

    document.getElementById('next-button').style.display = 'block';
}

// Passer à la question suivante
function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('result').textContent = '';
    displayQuestion();
    document.getElementById('next-button').style.display = 'none';
}

// Fin du quiz
function endQuiz() {
    document.getElementById('question').textContent = 'Quiz terminé !';
    document.getElementById('options').innerHTML = '';
    document.getElementById('score').textContent = `Votre score : ${score}/10`; // Afficher le score sur 10
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
}

// Recommencer le quiz
function restartQuiz() {
    shuffleQuestions(); // Mélanger les questions ici !
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('score').textContent = '';
    displayQuestion();
}

// Charger les questions au démarrage
loadJSON();
