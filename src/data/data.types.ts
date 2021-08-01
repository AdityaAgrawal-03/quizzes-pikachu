export type Options = {
  _id: string
  text: string,
  isRight: boolean
}

export type Question = {
  _id: string,
  question: string,
  points: number,
  negativePoints: number,
  options: Options[]
}

export type Quiz = {
  _id: string,
  name: string,
  coverImage: string
  questions: Question[],
  totalQuestions: number,
  totalPoints: number
}

export type UserScore = {
  user: string,
  score: number
}

export type QuizScores = {
  quiz: string,
  scores: UserScore[]
}

export type Dashboard = {
  quizScores: QuizScores[]
}

export type QuizDB = {
  quizzes: Quiz[],
  name: string
}