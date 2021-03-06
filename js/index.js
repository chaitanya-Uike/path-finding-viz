const row = 21
const col = 59


let g = []
let from = new Array(row * col)
let path = []
let walls = []

// variable used in maze generation
let visited = []



let startFlag = false
let loading = false
let animation = false



const algoSelect = document.querySelector("#algo-select")


// starting the program
createAdjacencyMatrix()
createGrid(row, col)
initWallsArray()

// default source and dest
document.getElementById(`${10}x${10}`).classList.add("source")
document.getElementById(`${10}x${49}`).classList.add("dest")


// start the visualizer
const vizStart = document.getElementById("viz_start")

vizStart.addEventListener("click", async event => {

    // after clicking pause button
    if (startFlag && loading == false) {
        startFlag = false

        clearPath()

        clearVisitedNodes()

        vizStart.innerHTML = `<i style="color: #92D050; font-size: 60px;" class="material-icons" title="start">play_arrow</i>`
    }

    // after clicking forward button
    else if (startFlag && loading) {
        animation = false
    }

    // after clicking play button
    else {
        startFlag = true
        loading = true
        animation = true

        // dont let users change nodes, change the cursor to reflect it
        document.querySelector(".source").style.cursor = "not-allowed"
        document.querySelector(".dest").style.cursor = "not-allowed"

        vizStart.innerHTML = `<i style="color: #EB5D1D; font-size: 60px;" class="material-icons" title="fast-forward">fast_forward</i>`

        let srcNode = document.querySelector(".source")
        let destNode = document.querySelector(".dest")

        let src = srcNode.id.split("x")[0] * col + srcNode.id.split("x")[1] * 1
        let dest = destNode.id.split("x")[0] * col + destNode.id.split("x")[1] * 1

        if (algoSelect.value == "djikstra")
            await djikstra(src, dest)
        else
            await aStar(src, dest)
        await showPath(src, dest)

        loading = false
        animation = false

        vizStart.innerHTML = `<i style="color: #BDD7EE; font-size: 60px;" class="material-icons" title="stop">pause</i>`

        // allow users to change the nodes
        document.querySelector(".source").style.cursor = ""
        document.querySelector(".dest").style.cursor = ""
    }
})



document.getElementById("clear-board").addEventListener("click", event => {
    if (!loading)
        clearBoard()
})


// on changing algo
algoSelect.addEventListener("change", event => {
    startFlag = false

    clearPath()

    clearVisitedNodes()

    vizStart.innerHTML = `<i style="color: #92D050; font-size: 60px;" class="material-icons">play_arrow</i>`
})


document.getElementById("generate-maze-button").addEventListener("click", async event => {

    clearBoard()

    // change source, dest location to first and last cell

    document.querySelector(".source").classList.remove("source")
    document.querySelector(".dest").classList.remove("dest")

    document.getElementById("1x1").classList.add("source")
    document.getElementById("19x57").classList.add("dest")

    initMaze()
    await recursiveBacktracker()
})

const infoCarousel = document.querySelector(".info-carousel")

document.getElementById("close-info-carousel").addEventListener("click", () => {
    infoCarousel.style.display = "none"

})

document.getElementById("info-btn").addEventListener("click", () => {
    infoCarousel.style.display = "block"
})