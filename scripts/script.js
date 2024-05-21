// copyright 2024 (c) Suryansh Shakya
const startButton = document.querySelector('.start-btn');
const quizContainer = document.querySelector('.quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizHeading = document.querySelector('.quiz-heading');
const progressBar = document.getElementById('progress-bar');

const questions = [{
    question: 'Who wrote "To Kill a Mockingbird"?',
    answers: [{text: 'Harper Lee', correct: true}, {text: 'J.K. Rowling', correct: false}, {
        text: 'Ernest Hemingway', correct: false
    }, {text: 'Mark Twain', correct: false},],
}, {
    question: 'What is the largest ocean in the world?',
    answers: [{text: 'Atlantic Ocean', correct: false}, {text: 'Indian Ocean', correct: false}, {
        text: 'Arctic Ocean', correct: false
    }, {text: 'Pacific Ocean', correct: true},],
}, {
    question: 'What is the chemical symbol for gold?',
    answers: [{text: 'Au', correct: true}, {text: 'Ag', correct: false}, {
        text: 'Fe', correct: false
    }, {text: 'Cu', correct: false},],
}, {
    question: 'Who painted the Mona Lisa?',
    answers: [{text: 'Leonardo da Vinci', correct: true}, {text: 'Pablo Picasso', correct: false}, {
        text: 'Vincent van Gogh', correct: false
    }, {text: 'Michelangelo', correct: false},],
}, {
    question: 'What is the largest country in the world by land area?',
    answers: [{text: 'Russia', correct: true}, {text: 'Canada', correct: false}, {
        text: 'China', correct: false
    }, {text: 'United States', correct: false},],
}, {
    question: 'What is the symbol for the element oxygen?',
    answers: [{text: 'O', correct: true}, {text: 'H', correct: false}, {
        text: 'C', correct: false
    }, {text: 'N', correct: false},],
},];

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hidden');
    quizHeading.classList.add('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    progressBar.classList.remove('hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

        const optionNumber = document.createElement('div');
        optionNumber.innerText = `Option ${index + 1}`;
        optionNumber.classList.add('option-number');

        const optionText = document.createElement('div');
        optionText.innerText = answer.text;
        optionText.classList.add('option-text');

        button.appendChild(optionNumber);
        button.appendChild(optionText);

        answerButtonsElement.appendChild(button);
    });

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function resetState() {
    questionElement.classList.remove('result');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    progressBar.style.width = '0%';
}

function selectAnswer(e) {
    const selectedButton = e.target.closest('button');
    const correct = selectedButton.dataset.correct;
    if (correct === 'true') {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `Quiz Finished! Your score is ${score} out of ${questions.length}.`;
    startButton.innerText = 'Restart Quiz';
    startButton.classList.remove('hidden');
    questionElement.classList.add('result');
    progressBar.classList.add('hidden');
}