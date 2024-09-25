const questions = [
    {
        question: "Getúlio Vargas teve 3 mandatos?",
        answers: [
            { text: "Verdadeiro", correct: true },
            { text: "Falso", correct: false }
        ]
    },
    {
        question: "Quando se iniciou o segundo mandato de Getúlio Vargas?",
        answers: [
            { text: "1951", correct: true },
            { text: "1954", correct: false },
            { text: "1937", correct: false },
            { text: "1945", correct: false }
        ]
    },
    {
        question: "Getúlio Vargas era considerado pai dos pobres para a sociedade?",
        answers: [
            { text: "Verdadeiro", correct: true },
            { text: "Falso", correct: false }
        ]
    },
    {
        question: "Em quantos períodos dividiu-se a Era Vargas (1930-1945)?",
        answers: [
            { text: "3 fases", correct: true },
            { text: "5 fases", correct: false },
            { text: "3 movimentos", correct: false },
            { text: "2 períodos", correct: false }
        ]
    },
    {
        question: "Qual o nome do suposto ataque comunista, arquitetado por...",
        answers: [
            { text: "Plano Cohen", correct: true },
            { text: "Política café com leite", correct: false },
            { text: "Ditadura Militar", correct: false },
            { text: "Guerra Fria", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
let playerName;

const quizContainer = document.getElementById("quiz");
const scoreContainer = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const rankingContainer = document.getElementById("ranking");

function startQuiz() {
    playerName = prompt("Digite seu nome:");  // Pedir o nome do jogador
    if (!playerName) {
        alert("Por favor, insira um nome válido!");
        return;
    }
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetTimer();
    quizContainer.innerHTML = `<h2>${question.question}</h2>`;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-button");
        button.addEventListener("click", () => selectAnswer(answer));
        quizContainer.appendChild(button);
    });
    startTimer();
}

function selectAnswer(answer) {
    clearInterval(timerInterval);  // Para o tempo ao selecionar uma resposta
    if (answer.correct) {
        score += 10;
    }
    scoreContainer.innerText = `Pontuação: ${score}`;
    document.querySelectorAll('.answer-button').forEach(button => {
        button.disabled = true;  // Desativa todos os botões
    });
}

function nextQuestion() {
    clearInterval(timerInterval);  // Limpa o temporizador
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showResults() {
    saveScore();  // Salva a pontuação no ranking
    quizContainer.innerHTML = `<h2>Quiz Finalizado!</h2><p>Sua pontuação final é: ${score}</p>`;
    nextButton.style.display = "none";
    displayRanking();  // Mostra o ranking ao final
}

// Temporizador
function startTimer() {
    timeLeft = 10;
    nextButton.innerText = `Próxima Pergunta (Tempo: ${timeLeft})`;
    timerInterval = setInterval(() => {
        timeLeft--;
        nextButton.innerText = `Próxima Pergunta (Tempo: ${timeLeft})`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);  // Reduz o tempo a cada segundo
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    nextButton.innerText = `Próxima Pergunta (Tempo: ${timeLeft})`;
}

// Função para salvar a pontuação no localStorage
function saveScore() {
    const playerScore = { name: playerName, score: score };
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push(playerScore);
    ranking.sort((a, b) => b.score - a.score);  // Ordena por pontuação
    localStorage.setItem("ranking", JSON.stringify(ranking));  // Salva no localStorage
}

// Função para mostrar o ranking
function displayRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    rankingContainer.innerHTML = "<h2>Ranking</h2>";
    ranking.forEach((player, index) => {
        const playerRank = document.createElement("p");
        playerRank.innerText = `${index + 1}. ${player.name} - ${player.score} pontos`;
        rankingContainer.appendChild(playerRank);
    });
}

startQuiz();
