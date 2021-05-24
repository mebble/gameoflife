<script lang="ts">
    import { onMount } from 'svelte';
    import p5 from 'p5';
    import Cell from './Cell';
    import Generation from './Generation';
    import seeds from './seed';

    let withIntermediates = false;
    let withStrokes = false;
    let generation = new Generation([]);
    let selectedSeed = seeds[0];
    $: generation = new Generation(selectedSeed.value);

    onMount(() => {
        new p5((sketch) => {
            sketch.setup = () => {
                const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                canvas.parent('canvas-container');
            };

            sketch.draw = () => {
                sketch.background('white');
                generation.draw(sketch, (cellX, cellY) => [coordToPixel(cellX), coordToPixel(cellY)], withIntermediates, withStrokes);
            };

            sketch.mouseDragged = () => {
                const [cellX, cellY] = [pixelToCoord(sketch.mouseX), pixelToCoord(sketch.mouseY)];
                const cell = new Cell(cellX, cellY, 'alive');
                generation.appendCell(cell);
            };
        });
    });

    setInterval(() => {
        generation = generation.play();
    }, 100);

    function pixelToCoord(pixel: number): number {
        return Math.floor(pixel / 10);
    }
    function coordToPixel(coord: number): number {
        return coord * 10;
    }
</script>

<main>
    <header>
        <h1>Conway's Game of Life</h1>
        <a href="https://www.conwaylife.com/wiki/Conway's_Game_of_Life">Conway's Game of Life Wiki</a>
        <div id="parameters">
            <select name="seed" bind:value={selectedSeed}>
                {#each seeds as seed}
                    <option value={seed}>{seed.name}</option>
                {/each}
            </select>
            <label>Intermediate states: <input type="checkbox" bind:checked={withIntermediates}></label>
            <label>Strokes: <input type="checkbox" bind:checked={withStrokes}></label>
        </div>
        {#if selectedSeed}
            <a href={selectedSeed.info}>{selectedSeed.name} Wiki</a>
        {/if}
    </header>
    <div id="canvas-container"></div>
</main>

<style>
    :global(body) {
		padding: 0;
        margin: 0;
	}

	main {
		text-align: center;
        padding: 0;
        margin: 0;
        margin-top: 2rem;
	}

    header {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

	h1 {
		font-weight: 100;
	}

    #parameters {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
    }
    #parameters > * {
        height: max-content;
        margin: 0;
    }
    #parameters > * + * {
        margin-left: .5rem;
    }

    #canvas-container {
        margin-top: 1.5rem;
    }

	@media (min-width: 640px) {
        #parameters > * + * {
            margin-left: 1rem;
        }
	}
</style>
