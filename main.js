const HOST = "http://localhost:6464"
const form = document.getElementById("form")
const type = document.getElementById("type")
const data = document.getElementById("data")
const title = document.getElementById("title")
const description = document.getElementById("description")
const callbacks = Object.freeze({ "atom": atom, "rss": rss })
const parser = new DOMParser()

window.onload = callbacks["atom"]

form.addEventListener("submit", (event) => {
    event.preventDefault()
    data.innerHTML = ""
    callbacks[type.value]()
})

async function atom() {
    const response = await fetch(`${HOST}/atom`)
    const text = await response.text()
    const xml = parser.parseFromString(text, "text/xml");
    title.innerText = xml.getElementsByTagName("title")[0].textContent
    description.innerText = xml.getElementsByTagName("subtitle")[0].textContent
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

async function rss() {
    const response = await fetch(`${HOST}/rss`)
    const text = await response.text()
    const xml = parser.parseFromString(text, "text/xml");

    title.innerText = xml.getElementsByTagName("title")[0].textContent
    description.innerText = xml.getElementsByTagName("description")[0].textContent
    Array.from(xml.getElementsByTagName('item')).forEach(item => {
        const tr = document.createElement("tr")

        let td = document.createElement("td")
        td.innerText = item.getElementsByTagName("title")[0].textContent
        tr.appendChild(td)

        td = document.createElement("td")
        let a = document.createElement("a")
        a.innerText = "Github repo"
        a.target = "blank"
        a.href = item.getElementsByTagName("link")[0].textContent
        td.appendChild(a)
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = item.getElementsByTagName("author")[0].textContent
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = item.getElementsByTagName("description")[0].textContent
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = item.getElementsByTagName("category")[0].textContent
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = new Date(item.getElementsByTagName("pubDate")[0].textContent).toLocaleString("FR-fr")
        tr.appendChild(td)

        data.appendChild(tr)

    })
}