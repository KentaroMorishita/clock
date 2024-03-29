
const offset = { x: 200, y: 200 }
const radius = 200

const clock = document.getElementById("clock")
const dials = document.getElementById("dials")

const rad = (angle) => (angle * Math.PI) / 180

const createDial = () => {
  for (let i = 1; i <= 12; i++) {
    const dial = document.createElement("div")
    dial.setAttribute("class", `dial`)
    dial.textContent = i
    dials.appendChild(dial)

    const angle = -90 + (i % 12) * 30
    const x = offset.x + (radius - 30) * Math.cos(rad(angle))
    const y = offset.y + (radius - 30) * Math.sin(rad(angle))

    dial.setAttribute("style", `top: ${y}px; left: ${x}px`)
  }
}

const createScale = () => {
  for (let i = 1; i <= 60; i++) {
    const scale = document.createElement("div")
    scale.setAttribute("class", `dial`)
    dials.appendChild(scale)

    const angle = -90 + i * 6
    const x = offset.x + radius * Math.cos(rad(angle))
    const y = offset.y + radius * Math.sin(rad(angle))

    const tick = document.createElement("div")
    tick.setAttribute("class", `tick`)

    if (angle % 30 === 0) {
      tick.setAttribute("class", `tick tick-long`)
    }

    scale.appendChild(tick)
    scale.setAttribute(
      "style",
      `top: ${y}px; left: ${x}px; transform: rotate(${angle + 90}deg)`
    )
  }
}

const ticktack = () => {
  const hourHand = document.getElementById("hour-hand")
  const minuteHand = document.getElementById("minute-hand")
  const secondHand = document.getElementById("second-hand")


  setInterval(() => {
    const now = new Date()
    let hour = Math.floor(now.getHours()) % 12 * 30
    let minute = Math.floor(now.getMinutes()) * 6
    let second = Math.floor(now.getSeconds()) * 6
    console.log(hour, minute, second)

    hourHand.setAttribute("style", `transform: rotate(${hour-90}deg)`)
    minuteHand.setAttribute("style", `transform: rotate(${minute-90}deg)`)
    secondHand.setAttribute("style", `transform: rotate(${second-90}deg)`)
    clock.textContent = new Date().toLocaleTimeString()
  }, 1000)
}

createScale()
createDial()
ticktack()
