let table;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let radio;
let input;
let button;
let question;
let result;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#e3d5ca");

  // 顯示題目和選項
  displayQuestion();
}

function draw() {  
  background("#e3d5ca");
  textSize(32);
  text('答對題數: ' + correctAnswers, 10, 30);
  text('答錯題數: ' + incorrectAnswers, 10, 70);
  text('413730523 呂韻婕' , 10, 110);
}

function displayQuestion() {
  if (currentQuestionIndex < table.getRowCount()) {
    let row = table.getRow(currentQuestionIndex);
    let type = row.get('type');

    // 顯示題目
    question = createP(row.get('question'));
    question.position(windowWidth / 2 - 250, windowHeight / 2 - 100);
    question.style('font-size', '30px');

    if (type === 'multiple') {
      // 建立選擇題
      radio = createRadio();
      radio.option(row.get('optionA'));
      radio.option(row.get('optionB'));
      radio.option(row.get('optionC'));
      radio.option(row.get('optionD'));
      radio.position(windowWidth / 2 - 250, windowHeight / 2);
      radio.style('width', '600px');
      radio.style('font-size', '30px');
      radio.style('background-color', "#d5bdaf");
    } else if (type === 'fill') {
      // 建立填空題
      input = createInput();
      input.position(windowWidth / 2 - 250, windowHeight / 2);
      input.style('width', '600px');
      input.style('font-size', '30px');
    }
    
    // 建立按鈕
    button = createButton('提交');
    button.position(windowWidth / 2 - 120, windowHeight / 2 + 50);
    button.style('font-size', '30px');
    button.mousePressed(handleSubmit);

    // 顯示結果
    result = createP('');
    result.position(windowWidth / 2 - 150, windowHeight / 2 + 100);
    result.style('font-size', '30px');
  } else {
    // 顯示測驗結果
    question = createP('測驗結束！');
    question.position(windowWidth / 2 - 150, windowHeight / 2 - 100);
    question.style('font-size', '30px');

    result = createP(`答對題數: ${correctAnswers}, 答錯題數: ${incorrectAnswers}`);
    result.position(windowWidth / 2 - 150, windowHeight / 2);
    result.style('font-size', '30px');
  }
}

// 按鈕點擊處理函數
function handleSubmit() {
  let row = table.getRow(currentQuestionIndex);
  let type = row.get('type');
  let correctAnswer = row.get('correctAnswer');
  let selectedOption;

  if (type === 'multiple') {
    selectedOption = radio.value();
  } else if (type === 'fill') {
    selectedOption = input.value();
  }

  if (selectedOption === correctAnswer) {
    correctAnswers++;
    result.html('答案正確！');
    button.html('下一題');
    button.mousePressed(nextQuestion);
  } else {
    incorrectAnswers++;
    result.html('答案錯誤，請再試一次。');
    button.html('再試一次');
    button.mousePressed(retryQuestion);
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  question.remove();
  if (radio) radio.remove();
  if (input) input.remove();
  button.remove();
  result.remove();
  displayQuestion();
}

function retryQuestion() {
  result.html('');
  button.html('提交');
  button.mousePressed(handleSubmit);
}