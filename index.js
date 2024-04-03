const display = document.querySelector(".display")
const date = document.querySelector("#date")
const week = document.querySelector("#week")
const time = document.querySelector("#time")
const dials = document.querySelector("#dials")

const getDisplaySize = () =>
  Math.min(display.clientWidth, display.clientHeight) / 2

const offset = {
  x: getDisplaySize(),
  y: getDisplaySize(),
  radius: getDisplaySize(),
}

const rad = (angle) => (angle * Math.PI) / 180

const createDial = () => {
  for (let i = 1; i <= 12; i++) {
    const dial = document.createElement("div")
    dial.setAttribute("class", `dial`)
    dial.textContent = i
    dials.appendChild(dial)

    const angle = -90 + i * (360 / 12)
    const x = offset.x + offset.radius * 0.8 * Math.cos(rad(angle))
    const y = offset.y + offset.radius * 0.8 * Math.sin(rad(angle))

    dial.setAttribute("style", `top: ${y}px; left: ${x}px`)
  }
}

const createScale = () => {
  for (let i = 1; i <= 60; i++) {
    const scale = document.createElement("div")
    scale.setAttribute("class", `dial`)
    dials.appendChild(scale)

    const angle = -90 + i * (360 / 60)
    const x = offset.x + offset.radius * Math.cos(rad(angle))
    const y = offset.y + offset.radius * Math.sin(rad(angle))

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
  const hourHand = document.querySelector("#hour-hand")
  const minuteHand = document.querySelector("#minute-hand")
  const secondHand = document.querySelector("#second-hand")
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  setInterval(() => {
    const now = new Date()
    const [h, m, s, ms] = [
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds(),
    ]

    const f = (a, b) => (Math.floor(a) * (360 / b)) % 360
    const [hour, minute, second] = [
      f(h, 12) + f(m, 60) / 12,
      f(m, 60) + f(s, 60) / 60,
      f(s, 60) + f(ms, 1000) / 60,
    ].map((v) => v - 90)

    hourHand.setAttribute("style", `transform: rotate(${hour}deg)`)
    minuteHand.setAttribute("style", `transform: rotate(${minute}deg)`)
    secondHand.setAttribute("style", `transform: rotate(${second}deg)`)
    date.textContent = now.toLocaleDateString()
    week.textContent = weeks[now.getDay()]
    time.textContent = now.toLocaleTimeString()
  }, 1)
}

createScale()
createDial()
ticktack()

window.addEventListener("resize", () => {
  offset.x = getDisplaySize()
  offset.y = getDisplaySize()
  offset.radius = getDisplaySize()

  dials.innerHTML = ""
  createScale()
  createDial()
})
