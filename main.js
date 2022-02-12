const form = document.getElementById("form")
const type = document.getElementById("type")
const data = document.getElementById("data")
const callbacks = Object.freeze({ "atom": atom, "rss": rss })

form.addEventListener("submit", (event) => {
    event.preventDefault()
    callbacks[type.value]()
})

async function atom(){
    const response = await fetch("http://localhost:6464/atom")
    console.log(response)
}

async function rss(){
    const response = await fetch("http://localhost:6464/rss")
    console.log(response)
}