import Question from '../models/question'
import Answer from '../models/answer'

exports.GetContents = async (req, res) => {
  await Question.find().sort({ questionID: 1 }).exec((err, Qres) => {
    if (err)
      res.status(403).send({message: 'error', contents: []})
    else
      res.status(200).send({message: 'success', contents: Qres})
  })
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  await Answer.find().sort({ questionID: 1 }).exec((err, Ares) => {
    if (err || req.body.length === 0 || req.body.length !== Ares.length)
      res.status(403).send({message: 'error', score: -1})
    else {
      let score = req.body.filter((a, i) => a === Ares[i].answer).length
      res.status(200).send({message: 'success', score: score})
    }
  })
}
