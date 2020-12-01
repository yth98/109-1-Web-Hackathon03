import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question

  const next = async () => {
    if (ans[ans.length-1] === -1) return
    if (current_question < contents.length-1) {
      setCurrentQuestion(current_question+1)
      setAns([...ans, -1])
    }
    else {
      const {
        data: { score }
      } = await instance.post('/checkAns', ans)
      setScore(score)
      setComplete(true)
    }
  }

  const choose = (idx) => {
    setAns([...ans.slice(0,-1), idx])
  }

  const getQuestions = async () => {
    const {
      data: { contents }
    } = await instance.get('/getContents')

    setContents(contents)
    if (contents.length) {
      setCurrentQuestion(0)
      setAns([-1])
    }
  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {current_question+1} of {contents.length}
            </div>
          </div>

          <div id="question-title">
            { complete
              ? `Your Score : ${score} / ${contents.length}`
              : contents.length ? contents[current_question].question : ''
            }
          </div>

          { complete ? <div /> :
          <>
          <div id="options">
            {contents[current_question].options.map((option, idx) =>
              <div key={`q${current_question+1}_${idx+1}`} onClick={()=>choose(idx+1)} className="each-option">
                <input type="radio" name={current_question} id={`q${current_question+1}_${idx+1}`} checked={ans[ans.length-1]===idx+1} onChange={()=>choose(idx+1)} />
                <span>{option}</span>
              </div>
              )}
          </div>
          
          <div id="actions" onClick={next}>
            NEXT
          </div>
          </>
          }
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
