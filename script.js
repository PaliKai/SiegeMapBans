var mainJson
fetch('./maps.json')
    .then((response) => response.json())
    .then(json => loadMaps(json));

ranked = null
other = null


var mapsDiv = document.getElementById("maps")

var resetButton = document.getElementById("reset")

function loadMaps(json) {
    mainJson = json;

    ranked = json.ranked
    other = json.other

    for (let map of ranked) {
        addMap(map)
    }
}

function addMap(map) {
    let mapElement = new MapElement(map)
    mapsDiv.appendChild(mapElement.mainDiv)
}

function clearMaps() {
    while (mapsDiv.firstElementChild) {
        mapsDiv.removeChild(mapsDiv.firstElementChild)
    }
}

function random5() {
    clearMaps();

    resetButton.style.display = "block"

    let unchosenMaps = [...ranked]

    for (let i = 0; i < 5; i++) {
        let chosenMap = unchosenMaps.splice(Math.floor(Math.random()*unchosenMaps.length), 1)[0];

        addMap(chosenMap);
    }

    var audio = new Audio("Sounds/BanMap.wav");
    audio.volume = 0.2;
    audio.play()
}

function reset() {
    resetButton.style.display = "none"

    clearMaps()

    loadMaps(mainJson)

    var audio = new Audio("Sounds/BanMap.wav");
    audio.volume = 0.2;
    audio.play()
}

class MapElement {
    /** @type {HTMLElement} */
    mainDiv = null;
    /** @type {HTMLElement} */
    innerDiv = null;
    /** @type {HTMLElement} */
    pictureDiv = null;
    /** @type {HTMLElement} */
    overlayDiv = null;
    /** @type {HTMLElement} */
    labelH1 = null;

    constructor(map) {

        this.mainDiv = document.createElement("div");
        this.mainDiv.classList.add("map");

        this.mainDiv.onclick = () => toggleBan(this);

        this.innerDiv = document.createElement("div");
        this.innerDiv.classList.add("inner");

        this.mainDiv.appendChild(this.innerDiv)

        this.pictureDiv = document.createElement("div");
        this.pictureDiv.classList.add("picture");
        this.pictureDiv.style.backgroundImage = `url('${map.picture}')`;

        this.overlayDiv = document.createElement("div");
        this.overlayDiv.classList.add("overlay");
        this.pictureDiv.appendChild(this.overlayDiv);

        this.innerDiv.appendChild(this.pictureDiv);

        this.labelH1 = document.createElement("h1");
        this.labelH1.classList.add("label");
        this.labelH1.innerText = map.name.toUpperCase();

        this.innerDiv.appendChild(this.labelH1);

    }
}

function toggleBan(map) {
    map.mainDiv.classList.toggle("banned");
    var audio = new Audio("Sounds/BanMap.wav");
    audio.volume = 0.2;
    audio.play()
}