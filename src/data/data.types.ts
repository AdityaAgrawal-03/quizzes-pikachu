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
  questions: Question[]
}

export type QuizDB = {
  quizzes: Quiz[],
  name: string
}