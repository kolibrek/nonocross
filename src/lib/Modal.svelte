<script>
import { fade, scale } from 'svelte/transition'
</script>

<div transition:fade class="backdrop">
  <div transition:scale class="card">
    <h1>You Win!</h1>
    <button on:click>Play Again</button>
  </div>
</div>

<style>
.backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0008;
}
.card {
  background-color: #333a;
  backdrop-filter: blur(6px);
  border: 1px solid #888a;
  border-radius: 8px;
  padding: 4rem;
}
</style>