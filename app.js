let inputColor = document.getElementById("color-picker")
let inputMode = document.getElementById("mode")
let getColorBtn = document.getElementById("get-color")
let colorsDivs = document.getElementById("colors-container")
let counter = document.getElementById("count")
let clipboardAlert = document.querySelector(".clipboard-info")
let selectedColor
let selectedMode
let selectedNumber

function start() {
    selectedColor = inputColor.value.slice(1)
    selectedMode = inputMode.value
    selectedNumber = counter.value
    getData()
}

inputColor.addEventListener('change', (event) => {
    selectedColor = event.target.value.slice(1)
})

inputMode.addEventListener('change', (event) => {
    selectedMode = event.target.value
})

counter.addEventListener('change', (event) => {
    selectedNumber = event.target.value
})

getColorBtn.addEventListener('click', getData)

window.addEventListener("load", start)

function getData() {
    let url = `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=${selectedNumber}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            colorsDivs.innerHTML = data.colors.map(color => {
                let currentColor = color.hex.value
                return (
                    `
                    <div class="color-local">
                        <div style="background-color:${currentColor}; width:100%; height:100%"></div>
                        <div class="color-text">${currentColor}</div>
                    </div>
                    `
                )
            }).join("")
            let colorBoxes = document.querySelectorAll(".color-text")
            colorBoxes.forEach(element => {
                element.addEventListener("click", copyClipboard)
            })
        })
}

function copyClipboard(event) {
    navigator.clipboard.writeText(event.target.textContent)
    clipboardAlert.classList.add("clipboard-visible")    
    setTimeout(() => {
        clipboardAlert.classList.remove("clipboard-visible")
    },1000)
}

