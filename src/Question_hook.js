import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)
  const [contents, setContents] = useState([])
  const [ans, setAns] = useState([])
  const [score, setScore] = useState(0)
  const [current, setCurrent] = useState(0)

  const next = () => {
    // implement here
  }

  const choose = () => {
    // implement here
  }

  const getQuestions = () => {
    // implement here
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

            </div>
          </div>

          <div id="question-title">
            
          </div>

          <div id="options">
            
          </div>
          
          <div id="actions" onClick={next}>
            NEXT
          </div>
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question