<script lang="ts">
import { createEventDispatcher } from 'svelte'
import type { Coord, ICell } from '../js/nonocross'
import Cell from './Cell.svelte'
import Hints from './Hints.svelte'

const width = 10
const height = 10
const total = width * height

const dispatch = createEventDispatcher()

const times = (num: number) => {
  return [...Array(num)]
}

const resolvePosition = (index: number): Coord => {
  return { i: (index % width), j: Math.floor(index / width) }
}

const randomAnswer = (chance: number) => {
  const r = Math.random() < chance
  return r ? 'FULL' : 'EMPTY'
}

const generateHint = (line: ICell[]): number[] => {
  let hint: number[] = []
  let run = 0
  line.forEach(cell => {
    if (cell.answer === 'EMPTY') {
      if (run > 0)
        hint.push(run)
      run = 0
    } else {
      run++
    }
  })
  if (run > 0)
    hint.push(run)
  return hint
}

let cells: ICell[] = times(total).map((_, i) => {
  const position = resolvePosition(i)
  return { position, answer: randomAnswer(0.66), guess: 'EMPTY' }
})

let rowHints: number[][] = times(height).map((_, index) => {
  const row = cells.filter(c => c.position.j === index)
  return generateHint(row)
})

let columnHints: number[][] = times(width).map((_, index) => {
  const col = cells.filter(c => c.position.i === index)
  return generateHint(col)
})

const checkWin = () => {
  const i = cells.findIndex(cell => (
    (cell.answer === 'FULL' && cell.guess !== 'FULL') ||
    (cell.answer === 'EMPTY' && cell.guess === 'FULL')
  ))
  if (i === -1)
    dispatch('win')
}
</script>

<div class="nonocross" style={`--width: ${width}`}>
  <div class="borders-horiz">
    {#each Array(Math.floor(height / 5) - 1) as _}
      <div class="horizontal" />
    {/each}
  </div>
  <div class="borders-vert">
    {#each Array(Math.floor(width / 5) - 1) as _}
      <div class="vertical" />
    {/each}
  </div>
  <div class="grid">
    {#each cells as cell}
      <Cell 
        position={cell.position}
        bind:guess={cell.guess}
        on:change={checkWin}
      />
    {/each}
  </div>
  <Hints type="row" hints={rowHints} --length={rowHints.length} />
  <Hints type="col" hints={columnHints} --length={columnHints.length} />
</div>

<style>
.nonocross {
  position: relative;
  display: grid;
  grid-template-areas: 'blank top' 'left grid';
  justify-content: flex-start;
  width: max-content;
}
.grid {
  grid-area: grid;
  display: grid;
  grid-template-columns: repeat(var(--width), 48px);
  grid-auto-rows: 48px;
  border: 3px solid #fff;
  width: fit-content;
  margin: auto;
}
.borders-horiz,
.borders-vert {
  position: absolute;
  grid-area: grid;
  inset: 0;
  display: flex;
  justify-content: space-evenly;
  user-select: none;
  z-index: -2;
}
.borders-horiz {
  flex-direction: column;
}
.vertical,
.horizontal {
  background-color: #fff;
}
.vertical {
  height: 100%;
  width: 4px;
}
.horizontal {
  height: 4px;
  width: 100%;
}
</style>