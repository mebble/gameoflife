<script lang="ts">
    import { onMount } from 'svelte';
    import p5 from 'p5';
    import { Generation, Cell } from './models';

	export let name: string;

    let generation = new Generation([]);

    onMount(() => {
        generation = new Generation([
            new Cell(2, 1, 'alive'),
            new Cell(3, 2, 'alive'),
            new Cell(1, 3, 'alive'),
            new Cell(2, 3, 'alive'),
            new Cell(3, 3, 'alive'),
        ]);
        new p5((sketch) => {
            sketch.setup = () => {
                const canvas = sketch.createCanvas(200, 200);
                canvas.parent('canvas-container');
            };

            sketch.draw = () => {
                sketch.background('white');
                generation.draw(sketch, (cellX, cellY) => [cellX * 10, cellY * 10]);
            };
        });
    });

    setInterval(() => {
        generation = generation.play();
    }, 200);
</script>

<main>
	<h1>Hello {name}!</h1>
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
