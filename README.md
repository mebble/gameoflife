# Conway's Game of Life

[![Netlify Status](https://api.netlify.com/api/v1/badges/4609e07a-c0c1-4746-8e93-09913ed64fed/deploy-status)](https://app.netlify.com/sites/cgof/deploys)

Live at [cgof.netlify.app](https://cgof.netlify.app/)

![Screenshot of the Game of Life demo](/docs/screenshot.png)

## Challenges

- Stateful DOM inputs such as seed selection and and toggle checkboxes retain their state after navigating forward and back from another page, but then fail to sync the svelte app state to the DOM state. Hence we end up with inconsistencies such as the seed being selected is different from the one being displayed in the canvas. Fix: Remove input autocomplete. Make a form element and apply this autocomplete=off to the entire form instead of applying it individually to each input. src: [SO](https://stackoverflow.com/questions/2699284/make-page-to-tell-browser-not-to-cache-preserve-input-values) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion).
- Getting a memory leak on the build tool:
    ```bash
    FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
    ...
    error Command failed with signal "SIGABRT".
    ```
    Node: v12.14.1
    Rollup: v^2.3.4

    Fix: Don't know. But when process gets `SIGABRT`, it doesn't let go of the port 5000. We can make it do so using:
    ```
    lsof -i:5000
    kill -INT <process-id>
    ```
