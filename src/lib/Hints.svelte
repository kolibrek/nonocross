<script lang="ts">
export let hints: number[][]
export let type: 'row' | 'col'
</script>

<ul class={type}>
  {#each hints as line}
    <li>
      <ul>
        {#each line as hint}
          <li class="hint">{hint}</li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

<style>
.row,
.col {
  display: grid;
  list-style-type: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  user-select: none;
}
.row ul,
.col ul {
  list-style-type: none;
}
.row {
  grid-area: left;
  grid-template-rows: repeat(var(--length), 48px);
  margin-right: 8px;
}
.col {
  grid-area: top;
  grid-template-columns: repeat(var(--length), 48px);
  align-items: flex-end;
  margin-bottom: 8px;
}
.row ul {
  display: flex;
  justify-content: flex-end;
  gap: 1ch;
  margin: 12px 0;
}
.col ul {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
}
</style>