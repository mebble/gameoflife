<script lang="ts">
    import { onMount } from 'svelte';
    import p5 from 'p5';
    import Cell from './Cell';
    import Generation from './Generation';
    import seeds from './seed';
    import { getTickStore } from './stores';

    let scaling = 5;
    let withIntermediates = false;
    let withStrokes = false;
    let generation = new Generation([]);
    let selectedSeed = seeds[0];
    let gameTickMs = 100;
    let gameTick = getTickStore(gameTickMs);

    $: generation = new Generation(selectedSeed.value);
    $: gameTick = getTickStore(gameTickMs);
    $: {
        $gameTick
        generation = generation.play();
    }

    onMount(() => {
        new p5((sketch) => {
            sketch.setup = () => {
                const canvas = sketch.createCanvas(sketch.windowWidth - 20, sketch.windowHeight - 30);
                canvas.parent('canvas-container');
            };

            sketch.draw = () => {
                sketch.background('white');
                generation.draw(sketch, (cellX, cellY) => [coordToPixel(cellX), coordToPixel(cellY), scaling], withIntermediates, withStrokes);
            };

            sketch.mouseDragged = () => {
                const [mouseXCoord, mouseYCoord] = [pixelToCoord(sketch.mouseX), pixelToCoord(sketch.mouseY)];
                [
                    [mouseXCoord,     mouseYCoord],
                    [mouseXCoord + 1, mouseYCoord],
                    [mouseXCoord,     mouseYCoord + 1],
                    [mouseXCoord + 1, mouseYCoord + 1],
                ].forEach(([x, y]) => {
                    const cell = new Cell(x, y, 'alive');
                    generation.appendCell(cell);
                });
                if (isWithin(sketch.mouseX, sketch.mouseY, sketch.width, sketch.height)) {
                    return false;
                }
            };
        });
    });

    function pixelToCoord(pixel: number): number {
        return Math.floor(pixel / scaling);
    }
    function coordToPixel(coord: number): number {
        return coord * scaling;
    }
    function isWithin(x: number, y: number, w: number, h: number): boolean {
        return (0 < x && x < w) && (0 < y && y < h);
    }
    function handleClear() {
        generation = new Generation([]);
    }
</script>

<main>
    <header>
        <h1>Conway's Game of Life</h1>
        <a href="https://www.conwaylife.com/wiki/Conway's_Game_of_Life">What is the Game of Life</a> | <a href="https://github.com/mebble/gameoflife">This project's code</a>
        <div id="inputs">
            <div class="parameters">
                <label class="range">Scale: {scaling}x<input type="range" step="1" min="3" max="15" bind:value={scaling}></label>
                <label class="range">Tick: {gameTickMs} ms<input type="range" step="100" min="50" max="1000" bind:value={gameTickMs}></label>
            </div>
            <div class="parameters">
                <label>Intermediate states: <input type="checkbox" bind:checked={withIntermediates}></label>
                <label>Strokes: <input type="checkbox" bind:checked={withStrokes}></label>
            </div>
            <div class="parameters">
                <select name="seed" bind:value={selectedSeed}>
                    {#each seeds as seed}
                        <option value={seed}>{seed.name}</option>
                    {/each}
                </select>
                <button type="button" on:click={handleClear}>Clear</button>
            </div>
        </div>
        {#if selectedSeed && selectedSeed.info}
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

    #inputs {
        margin: 1rem 0;
    }

    .parameters {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
    }
    .parameters > * {
        height: max-content;
        margin: 0;
    }
    .parameters > * + * {
        margin-left: .5rem;
    }

    label.range {
        display: flex;
        flex-direction: column;
    }

    #canvas-container {
        margin-top: 1.5rem;
    }

    :global(canvas) {
        border: solid 1px black;
    }

	@media (min-width: 640px) {
        .parameters > * + * {
            margin-left: 1rem;
        }
	}
</style>
