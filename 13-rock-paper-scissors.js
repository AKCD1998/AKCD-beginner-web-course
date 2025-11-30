let score =  JSON.parse(localStorage.getItem('score')) || {
          player : 0,
          computer : 0,
          ties : 0,};
      
          updateScoreElement();
          showResultMessage();
        

        
        // อันนี้คือที่มาที่ไป (สูตรเต็มของการ set default score)
      /*let score =  JSON.parse(localStorage.getItem('score'));

      if (!score) {
        score = {
          player : 0,
          computer : 0,
          ties : 0,
        };
      } */

      function updateScoreElement() {
        document.querySelector('.js-score').innerHTML = `You: ${score.player}  Computer: ${score.computer}  ties: ${score.ties}`;
      }

      // แสดงผลลัพธ์ของเกม

      
      function showResultMessage(playerMove, computerMove, result) {

        let resultMessage = `You picked ${playerMove}. Computer picked ${computerMove}. ${result}`;
        let playerMoveImage = gameImage(playerMove, computerMove).playerImage;
        let computerMoveImage = gameImage(playerMove, computerMove).computerImage;

        if(!playerMove && !computerMove && !result) {

          resultMessage = 'Choose the option to play the game.';

          document.querySelector('.js-standoff').innerHTML = resultMessage;
        } else {
          document.querySelector('.js-result').innerHTML = `${result}`;
          resultMessage = `You : ${playerMoveImage} vs ${computerMoveImage} : Computer`;
         }
        document.querySelector('.js-standoff').innerHTML = resultMessage;
      }

      // แสดงผลลัพธ์อย่างละเอียดของเกม

      function pickComputerMove() {
        const randomMethod3 = Math.random();
      if (randomMethod3 >=0 && randomMethod3 < 1/3) {
        computerMove = 'rock';
      } else if (randomMethod3 >= 1/3 && randomMethod3 < 2/3) {
        computerMove = 'paper';
      } else {
        computerMove = 'scissors';
      }
      return computerMove;
      }
      //การสุ่มเลือกของคอมพิวเตอร์ เพื่อเอาไปใช้เทียบต่อใน playGame


      //ต้องได้พารามิเตอร์ playerMove กับ computerMove เพื่อจะได้แสดงรูปภาพถูกต้อง

      function gameImage(playerMove, computerMove) {
        let playerImage = '';
        let computerImage = '';

        if (playerMove === 'rock') {
          playerImage = '<img src="images/rock-emoji.png" class="move-icon" alt="Rock">';
        } else if (playerMove === 'paper') {
          playerImage = '<img src="images/paper-emoji.png" class="move-icon" alt="Paper">';
        } else if (playerMove === 'scissors') {
          playerImage = '<img src="images/scissors-emoji.png" class="move-icon" alt="Scissors">';
        }

        if (computerMove === 'rock') {
          computerImage = '<img src="images/rock-emoji.png" class="move-icon" alt="Rock">';
        } else if (computerMove === 'paper') {
          computerImage = '<img src="images/paper-emoji.png" class="move-icon" alt="Paper">';
        } else if (computerMove === 'scissors') {
          computerImage = '<img src="images/scissors-emoji.png" class="move-icon" alt="Scissors">';
        }

        return { playerImage, computerImage };
      }
      
      // ถ้าเราเลือกอะไร คอมพิวเตอร์จะเลือกอะไร รูปภาพจะเป็นแบบไหน เอาไปใช้ใน showResultMessage

      let isautoPlaying = false;
      let intervalId;

    
      // function มันทำ hoisting ได้ เลยสามารถเรียกใช้ function autoPlay() ก่อนที่จะประกาศ function นี้ได้ ต่างกับการ const autoPlay = function() {} ที่จะทำ hoisting ไม่ได้ 
      function autoPlay() {
        if (!isautoPlaying) {
          intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            // ก่อนหน้านี้เวอร์ชั่นเต็มมาจาก intervalId = setInterval(funtion() { ... }); แต่หลังจากเรียน advance function part 2 และได้รู้จัก arrow function เลยเปลี่ยนมาใช้แบบนี้แทนเพื่อความกระชับ อ่านง่าย แต่ก็แล้วยแต่ละคนชอบ
            playGame(playerMove);
        }, 1000);
        isautoPlaying = true;
      } else {
        clearInterval(intervalId);
        isautoPlaying = false;
      }
    }

    // เพิ่ม event listener ให้กับปุ่ม rock, paper, scissors จากการกดปุ่ม r = rock p = paper s = scissors
    document.body.addEventListener('keydown', (event) =>{
      console.log('keydown');
      if(event.key === 'r') {
        playGame('rock');
      } else if(event.key === 'p') {
        playGame('paper');
      } else if(event.key === 's') {
        playGame('scissors');
      }
    });

    document.querySelector('.js-rock-button').addEventListener('click', () => {
      playGame('rock');
    });
    // ใช้ .addeventlistener('click',playGame('rock')) ไม่ได้นะ เพราะจะเป็นการเรียกใช้ฟังก์ชันทันทีที่โหลดหน้าเว็บ แล้วค่าที่ได้จะได้เป็น undefined เพราะ playGame ไม่มีการ return ค่าอะไรกลับมาต้องเขียนตามแบบนี้

    document.querySelector('.js-paper-button').addEventListener('click', () => {
      playGame('paper');
    });

    document.querySelector('.js-scissors-button').addEventListener('click', () => {
      playGame('scissors');
    }); 


      // เอาสิ่งที่ผูเ้เล่นเลือกไปเทียบกับคอมพิวเตอร์ ถ้าผลเป็นแบบไหนต้องเพิ่มคะแนนให้ใคร
      function playGame(playerMove,ComputerMove) {
        const computerMove = pickComputerMove();
        let result = '';
        if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
            result = 'You lose!';
          } else if (computerMove === 'paper') {
            result = 'You win!';
          } else {
            result = 'Tie!';
          }
          
        } else if (playerMove === 'rock') {
            if (computerMove === 'paper') {
              result = 'You lose!';
            } else if (computerMove === 'scissors') {
              result = 'You win!';
            } else {
              result = 'Tie!';
            }

          } else if (playerMove === 'paper') {
            if (computerMove === 'scissors') {
              result = 'You lose!';
            } else if (computerMove === 'rock') {
              result = 'You win!';
            } else {
              result = 'Tie!';
            }
        }

        if(result === 'You win!') {
          score.player += 1;
        } else if (result === 'You lose!') {
          score.computer += 1;
        } else {
          score.ties += 1;
        }

      


        localStorage.setItem('score',JSON.stringify(score)); // หลังจากที

      
       showResultMessage(playerMove, computerMove, result);
       updateScoreElement();

        
      }