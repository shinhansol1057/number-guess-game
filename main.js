//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 GO 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호 < 유저번호 ? Down!!!
//랜덤번호 > 유저번호 ? Up!!!
//Reset 버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다 쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 그리고 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 그리고 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resultAreaImg = document.getElementById("box-img");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1부터 100까지의 숫자만 입력해주세요!";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다!";
    return;
  }
  history.push(userValue);

  chances--;
  chanceArea.textContent = `남은 찬스 : ${chances}번`;

  if (userValue < computerNum) {
    resultArea.textContent = "UP!!!";
    resultAreaImg.src =
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAzMjNfMTcx%2FMDAxNDkwMjU0OTM0MDgy.9lbct8EVgHBbI6LABcTMMmoGE8dA_ONzsJ5HN8Ro24Eg.-CqJ62t-BShQ9i7FCxFWbJQi0hPzUEmpDXuZ3GRQv3Ug.JPEG.thezenith80%2F%25C1%25A4%25BF%25AD%25B8%25C7_%25C0%25FD%25B7%25B9%25C0%25FD%25B7%25B9_%25BF%25F8%25BA%25BB-5.jpg&type=sc960_832";
  } else if (userValue > computerNum) {
    resultArea.textContent = "DOWN!!!";
    resultAreaImg.src =
      "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F75%2Fa8%2F3b%2F75a83b4f5f25049c28bfc79df327e5c2.jpg&type=sc960_832";
  } else {
    resultArea.textContent = "정답입니다!!";
    resultAreaImg.src =
      "https://media.tenor.com/images/0a81b89954678ebe228e15e35044f7a5/tenor.gif";
    playButton.disabled = true;
    return;
  }

  if (chances < 1) {
    resultArea.textContent = "마셔라! 마셔라! 마셔라!!!!";
    playButton.disabled = true;
    return;
  }
}

function reset() {
  resultArea.textContent = "못맞추면 개가된다.";
  pickRandomNum();
  playButton.disabled = false;
  chances = 5;
  chanceArea.textContent = `남은 찬스 : ${chances}번`;
  history = [];
  userInput.value = "";
  resultAreaImg.src =
    "https://media1.giphy.com/media/9DinPR8bzFsmf74j9W/giphy.gif";
}

pickRandomNum();
