<script lang="ts">
    import { onMount } from 'svelte';
    import p5 from 'p5';
    import Cell from './Cell';
    import Generation from './Generation';
    import seeds from './seed';

	export let name: string;

    let generation = new Generation([]);

    onMount(() => {
        generation = new Generation(seeds[0].value);
        new p5((sketch) => {
            sketch.setup = () => {
                const canvas = sketch.createCanvas(500, 500);
                canvas.parent('canvas-container');
            };

            sketch.draw = () => {
                sketch.background('white');
                generation.draw(sketch, (cellX, cellY) => [cellX * 10, cellY * 10]);
            };

            sketch.mouseDragged = () => {
                const [cellX, cellY] = [Math.floor(sketch.mouseX / 10), Math.floor(sketch.mouseY / 10)];
                const cell = new Cell(cellX, cellY, 'alive');
                generation.appendCell(cell);
            };
        });
    });

    setInterval(() => {
        generation = generation.play();
    }, 100);
</script>

<main>
	<h1>Hello {name}!</h1>
    <select name="seed">
        {#each seeds as seed}
            <option value={seed}>{seed.name}</option>
        {/each}
    </select>
    <div id="canvas-container"></div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
