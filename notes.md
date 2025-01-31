> [!IMPORTANT]
> All assignments must have at least 10 commits evenly spread out. Otherwise, you have to justify why before it is accepted.

> [!IMPORTANT]
> How to ssh into my server:
> ssh -i path/to/key/pair/file ubuntu@3.80.190.138

> How to deploy the website:
> ./deployFiles.sh -k path/to/key/pair -h salvoattack.click -s simon (or startup)

# CSS
- Use `<link rel="stylesheet" href="styles.css" />` in head element to link external css file to html
- Change `box-sizing` from `content-box` to `border-box` to include border and padding in size
- Use `@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');` to import font from Google - get url from font page
    - Then use 
    ```
    p {
        font-family: 'Space Mono';
    }
    ```
    to style a paragraph with the font
- Use media selectors to change html based on things like the orientation of the screen:
```
@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
```
- Dynamically change grid flow element like so:
```
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```
- To get Bootstrap CSS, include this in the head element:
```
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
    crossorigin="anonymous"
/>
```
and this at the end of the body section if you use components like buttons that use JavaScript:
```
<script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
></script>
```
- Download Bootstrap with NPM: `npm install bootstrap@5.2.3`

# React
- Start debugging in VS code by pressing F5 and selecting Node.js as the debugger. Press F5 to run again.
  - F10 for next line, F11 to step into a function, F5 to continue running, and SHIFT+F5 to stop debugging.
- Use `node --watch script.js` to have node automatically watch for changes and reload.
- Use `npx vite` to run vite (because it's a CLI).
  - Press `o` to have vite open the browser for you.
  - Stop by pressing `q`.