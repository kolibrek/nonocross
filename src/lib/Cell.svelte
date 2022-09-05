<script lang="ts">
import type { Coord, Guess } from '../js/nonocross'
import { createEventDispatcher } from 'svelte'

export let position: Coord
export let guess: Guess = 'EMPTY'

const dispatch = createEventDispatcher()

const handleClick = () => {
  if (guess === 'EMPTY')
    guess = 'FULL'
  else if (guess === 'FULL')
    guess = 'CROSS'
  else
    guess = 'EMPTY'
  dispatch('change', guess)
}
</script>

<button class="cell"
  class:full={guess === 'FULL'}
  class:cross={guess === 'CROSS'}
  on:click={handleClick}
  title={`(${position.i}, ${position.j})`}
/>

<style>
.cell {
  border: 1px solid #fff;
  border-radius: 0;
  cursor: pointer;
  background-color: transparent;
}
.cell:hover {
  outline: 6px solid #23a282;
  z-index: 5;
}
.cell.full {
  background-color: #7fd;
}
.cell.cross::after {
  display: flex;
  align-items: center;
  justify-content: center;
  content: '⛌';
  color: #f66;
  width: 100%;
  height: 100%;
  font-size: 2em;
}
</style>