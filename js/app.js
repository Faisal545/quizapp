
    // console.log(quiz);  

    const questionNumber = document.querySelector(".question-number");
    const questionText = document.querySelector(".question-text");
    const optionContainer = document.querySelector(".option-container");
    const answersIndicatorContainer = document.querySelector(".answers-indicator");
    const homeBox = document.querySelector(".home-box");
    const quizBox = document.querySelector(".quiz-box");
    const resultBox = document.querySelector(".result-box");
    const questionLimit = 5;       // if we want all questions the   select quiz.length and replace in this document with  questionLimit.

    let questionCounter = 0;
    let currentQuestion;
    let availableQuestions = [];
    let availableOptions = [];
    let correctAnswers = 0;
    let attempt = 0;

// push the Questions into availableQuestions Array

        function setAvailableQuestions()
        {
            const totalQuestion = quiz.length;
            for(let i=0; i<totalQuestion; i++)
            {
                // console.log(i);
                availableQuestions.push(quiz[i]);
            }

            // console.log(availableQuestions);
        }

        // set question number and question and options
        function getNewQuestion()
        {   
            // console.log(availableQuestions);
            
            // set question number
            // console.log("hi");
                questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;   // quiz.length

                // set question text    
                // get random question
                const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
                
                currentQuestion = questionIndex;
                questionText.innerHTML = currentQuestion.q;
                    
                    // console.log(questionIndex);

                // get the position of 'questionindex' from the availableQuestion Array
                const index1 = availableQuestions.indexOf(questionIndex);
                // remove the 'questionindex' from the availableQuestion Array so that the question doesnot repeat
                availableQuestions.splice(index1,1);

                //      Show question img if 'img' property exists
                    if(currentQuestion.hasOwnProperty("img"))
                    {
                        // console.log(currentQuestion.img);
                            const img = document.createElement("img");
                            img.src = currentQuestion.img;
                            questionText.appendChild(img);
                    }

                // console.log(index1);
                // console.log(questionIndex);
                // console.log(availableQuestions);
                
                // set options     
                // get the length of options
                // console.log(currentQuestion.options);
                    const optionLen = currentQuestion.options.length;
                    for(let i=0; i<optionLen;i++)       
                    {
                        availableOptions.push(i);
                    }
                    // console.log(availableOptions);

                    //   below one line is to clear the previous options. ************
                    optionContainer.innerHTML = '';

                    let animationDelay = 0.15;

                    // create options in html
                    for(let i=0; i<optionLen;i++)       
                    {
                        // random option
                        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
                        //  get the position of 'optonIndex' from the availableOptions
                        const index2 = availableOptions.indexOf(optonIndex); 
                        //  remove the 'optonIndex' from the availableOptions so that the option doesnot repeat.
                        availableOptions.splice(index2,1);
                        // console.log(optonIndex);
                        // console.log(availableOptions);

                        const option = document.createElement("div");
                        option.innerHTML = currentQuestion.options[optonIndex];
                        option.id = optonIndex;
                        option.style.animationDelay = animationDelay + 's'; 
                        animationDelay = animationDelay + 0.15;
                        option.className = "option";
                        optionContainer.appendChild(option);
                        option.setAttribute("onclick", "getResult(this)");

                        // *********************************************************************   
                    }


                questionCounter++;
            }
                // get the result of the current attempt question.
                function getResult(element)
                {
                    const id = parseInt(element.id);
                    // console.log(typeof (id));
                    // get the answer by comparing the id of clicked option
                    if(id === currentQuestion.answer)
                    {
                        // set the green color to the correct option
                        element.classList.add("correct");
                        // console.log("Answer is Correct ");
                            // add indicator to correct mark
                            updateAnswerIndicator("correct");
                            correctAnswers++;
                            console.log("correct: "+ correctAnswers);
                    }else{
                         // set the red color to the incorrect option
                         element.classList.add("wrong");
                        // console.log("Answer is Wrong ");
                        // add the indicator to wrong mark
                        updateAnswerIndicator("wrong");

                        //  if the answer is incorrect then show the correct option by adding green color the correct option
                        const optionLen = optionContainer.children.length;
                        for(let i=0; i<optionLen; i++)
                        {
                            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                                optionContainer.children[i].classList.add("correct");
                            }
                        }
                    }
                    // console.log(optonElement.innerHTML);
                    attempt++;
                    unclickableOptions();

                }

                    // make all the options unclickable once the user select a option (Restrict the user to change the option)
                    function unclickableOptions(){
                        const optionLen = optionContainer.children.length;
                        for(let i=0; i<optionLen; i++)
                        {
                            optionContainer.children[i].classList.add("already-answered");
                        }
                    }

                    function answersIndicator(){
                        answersIndicatorContainer.innerHTML = '';
                            const totalQuestion =questionLimit ;   // quiz.length   for all questions as clickable 
                            for( let i=0; i<totalQuestion; i++)
                            {
                                const indicator = document.createElement("div");
                                answersIndicatorContainer.appendChild(indicator);
                            }
                    }

                    function updateAnswerIndicator(marktype){
                        // console.log(marktype);
                        answersIndicatorContainer.children[questionCounter-1].classList.add(marktype);
                    }

            function next(){
                if(questionCounter === questionLimit)  // quiz.length
                {
                    console.log("quiz over");
                    quizOver();
                }else{
                    getNewQuestion();
                }
            }

            function quizOver(){
                // hide quiz quizBox
                quizBox.classList.add("hide");
                // show resultBox
                resultBox.classList.remove("hide");
                quizResult();
            }

            // get the quiz result
            function quizResult(){
                resultBox.querySelector(".total-question-result").innerHTML = questionLimit;  // quiz.length
                resultBox.querySelector(".total-attempt").innerHTML = attempt;
                resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
                resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
                    const percentage = (correctAnswers/questionLimit) * 100;  // quiz.length
                    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
                    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + questionLimit ; // quiz.length
            }

            function resetQuiz(){
                questionCounter = 0;
                correctAnswers = 0;
                attempt = 0;
                availableQuestions = [];
            }

            function tryAgainQuiz(){
                // hide the resultBox
                resultBox.classList.add("hide");
                // show the quizBox
                quizBox.classList.remove("hide");
                resetQuiz();
                startQuiz()
            }

            function goToHome(){
                //  hide result box
                resultBox.classList.add("hide");
                // show home box
                homeBox.classList.remove("hide");
                resetQuiz();
            }

            //  ###########     STARTING POINT      ##########
            function startQuiz(){

                // hide home box
                homeBox.classList.add("hide");
                    // show quiz Box
                    quizBox.classList.remove("hide");

            //  first we will set all questions in availableQuestions Array
                setAvailableQuestions();
            // second we will call getNewQuestion()  function
                getNewQuestion();
            // to create indicator of answers
                answersIndicator();
            }

            window.onload = function(){
                homeBox.querySelector(".total-question").innerHTML = questionLimit;  // quiz.length
            }