const form = document.getElementById("form")
const type = document.getElementById("type")
const data = document.getElementById("data")
const callbacks = Object.freeze({ "atom": atom, "rss": rss })
const parser = new DOMParser()

form.addEventListener("submit", (event) => {
    data.innerHTML = ""
    event.preventDefault()
    callbacks[type.value]()
})

async function atom(){
    const response = await fetch("http://localhost:6464/atom")
    const text = await response.text()
    const xml = parser.parseFromString(text, "text/xml");
    Array.from(xml.getElementsByTagName('entry')).forEach(entry => {
        const tr = document.createElement("tr")
        
        let td = document.createElement("td")
        td.innerText = entry.getElementsByTagName("title")[0].textContent
        tr.appendChild(td)

        td = document.createElement("td")
        let a = document.createElement("a")
        a.innerText = "Github repo"
        a.target = "blank"
        a.href = entry.getElementsByTagName("link")[0].getAttribute("href")
        td.appendChild(a)
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = entry.getElementsByTagName("author")[0].textContent
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = entry.getElementsByTagName("summary")[0].textContent
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = entry.getElementsByTagName("category")[0].getAttribute("term")
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = new Date(entry.getElementsByTagName("updated")[0].textContent).toLocaleString("FR-fr")
        tr.appendChild(td)

        data.appendChild(tr)
    })
}

async function rss(){
    const response = await fetch("http://localhost:6464/rss")
    const text = await response.text()
    const xml = parser.parseFromString(text, "text/xml");
    console.log(xml)
}