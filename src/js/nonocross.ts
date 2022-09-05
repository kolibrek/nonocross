export interface Coord {
  i: number
  j: number
}

export type Answer = 'EMPTY' | 'FULL'
export type Guess = Answer | 'CROSS'

export interface ICell {
  position: Coord
  answer: Answer
  guess: Guess
}
