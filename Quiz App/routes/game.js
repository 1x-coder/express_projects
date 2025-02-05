function gameRoutes(app) {
  
let goodAnswers = 0;
let isGameOver = false;
let callAFriendUsed = false;
let askTheAudienceUsed = false;
let fiftyFiftyUsed = false;

const questions = [
  {
    question: 'What is the best JavaScript framework for front-end?',
    answers: ['React', 'Angular', 'Vue', 'VanillaJS'],
    correctAnswer: 3
  },
  {
    question: 'What is the best JavaScript framework for back-end?',
    answers: ['Meteor', 'Next', 'Express', 'Koa'],
    correctAnswer: 2
  },
  {
    question: 'Which one of this is a JavaScript package manager?',
    answers: ['Node.js', 'TypeScript', 'npm', 'none'],
    correctAnswer: 2
  },
  {
    question: 'Who invented JavaScript?',
    answers: ['Brendan Eich', 'Bjarne Stroustrup', 'James Gosling', 'Graydon Hoare'],
    correctAnswer: 0
  },
]

app.get('/question', (req,res) => {
  if(goodAnswers === questions.length){
    res.json({
      winner: true,
    })
  }
   else if (isGameOver){
    res.json({
      looser: true,
    })
  } 
  else {

    const nextQuestion = questions[goodAnswers];

    const {question, answers} = nextQuestion

    res.json({
      question, answers
    })
  }
})
app.post('/answer/:index', (req,res) =>{

  if(isGameOver){
    res.json({
      looser: true,
    })
  }

  const { index } = req.params;
  const question = questions[goodAnswers];

  const isGoodAnswer = question.correctAnswer === Number(index)

  if(isGoodAnswer){
    goodAnswers++;
  }else{
    isGameOver = true;
  }


  res.json({
    correct: isGoodAnswer,
    goodAnswers,
  })
})

 
app.get('/help/friend', (req, res) => {

  if(callAFriendUsed) {
   return res.json({
     text: 'This lifeline has been used already.'
   })
  }

  callAFriendUsed = true;

  const doesFriendKnowAnswer = Math.random() < 0.75;
  const question = questions[goodAnswers];

  res.json({
    text: doesFriendKnowAnswer ? `Hmmm i think correct answer is ${question.answers[question.correctAnswer]}` : `Hmmm i can't help You, do it on Your own risk mate...`
  })
})

 
app.get('/help/fiftyfifty', (req, res) => {

  if(fiftyFiftyUsed) {
   return res.json({
     text: 'This lifeline has been used already.'
   })
  }

  fiftyFiftyUsed = true;

  const question = questions[goodAnswers];


  const answersCopy = question.answers.filter((s, index) => (
    index !== question.correctAnswer
));

answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

  res.json({
   answersToRemove: answersCopy,
  })
})

app.get('/help/audience', (req, res) => {

  if(askTheAudienceUsed) {
    return res.json({
      text: 'This lifeline has been used already.'
    })
   }
 
   askTheAudienceUsed = true;


  const chart = [9,21,25,45];

  for(let i = chart.length -1; i > 0; i--){
     const change = Math.floor(Math.random() * 20 - 10);

     chart[i] += change;
     chart[i -1] -= change;
  }

  const question = questions[goodAnswers];
  const {correctAnswer} = question;

  [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

  res.json({
      chart,
  });
})



}


module.exports = gameRoutes;