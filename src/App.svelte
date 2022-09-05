<script lang="ts">
import Nonocross from './lib/Nonocross.svelte'
import Modal from './lib/Modal.svelte'

let games = 0
let hasWon = false

const reset = () => {
  hasWon = false
  games++
}
</script>

<main>
  <h1>Nonocross</h1>
  {#key games}
    <Nonocross on:win={() => hasWon = true} />
  {/key}
  {#if hasWon}
    <Modal on:click={reset} />
  {/if}
</main>
