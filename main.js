const clockElem = document.getElementById("clock")

// time pointer
const hourElem = document.createElement("div")
const minuteElem = document.createElement("div")
const secondElem = document.createElement("div")
hourElem.classList.add("hour")
minuteElem.classList.add("minute")
secondElem.classList.add("second")

// append to clock element
clockElem.append(hourElem, minuteElem, secondElem)


// light & dark mode button
const lightModeElem = document.getElementById("light")
const darkModeElem = document.getElementById("dark")

/**
 * 添加表盘
 */
function drawFace() {
  const faceElem = document.createElement("div")
  faceElem.classList.add("face")

  for (let i = 1; i <= 12; i++) {
    const scaleElem = document.createElement("div")
    scaleElem.classList.add("scale")
    scaleElem.style.transform = `rotate(${i * 30}deg)`
    if (i % 3 === 0) {
      const clockNumElem = document.createElement("div")
      clockNumElem.textContent = i + ''
      clockNumElem.style.width = '30px'
      clockNumElem.style.height = '30px'
      clockNumElem.style.transform = `rotate(${-1 * i * 30}deg)`
      scaleElem.append(clockNumElem)
    }
    faceElem.append(scaleElem)
  }

  clockElem.append(faceElem)
}

/**
 * 角度计算
 * 时针: 时针角度为 hours * 30 + minutes * 0.5.
 *  时针转一圈为12小时, 即每小时30度, 60 分钟为一小时, 即每分钟对应时针转动 30 / 60 = 0.5 度
 * 分针: 分针角度为 minutes * 6 + seconds * 0.1
 *  分针转一圈为60分钟, 即每分钟6度, 60 秒为一分钟, 即每秒对应分针转动 6 / 60 = 0.1 度
 * 秒针: 秒针转动角度为 seconds * 6
 *  秒针转一圈为60秒, 即每秒6度
 */
function drawPointer() {
  let date = new Date()
  let hours = date.getHours() % 12
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  hourElem.style.transform = `rotate(${(hours * 30) + (0.5 * minutes)}deg)`
  minuteElem.style.transform = `rotate(${(6 * minutes) + (0.1 * seconds)}deg)`
  secondElem.style.transform = `rotate(${6 * seconds}deg)`
}

function changeDarkMode() {
  lightModeElem.style.display = 'block'
  darkModeElem.style.display = 'none'
  document.body.classList.add("dark")
  document.body.classList.remove("light")
}

function changeLightMode() {
  darkModeElem.style.display = 'block'
  lightModeElem.style.display = 'none'
  document.body.classList.add("light")
  document.body.classList.remove("dark")
}

/**
 * 绑定主题切换按钮事件
 */
function initThemeModeChangeBtn() {
  lightModeElem.addEventListener("click", changeLightMode)
  darkModeElem.addEventListener("click", changeDarkMode)
}

function initThemeMode() {
  if (window.matchMedia("(prefers-color-scheme)").media === 'not all') {
    console.log("Browser does not support dark mode")
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    changeDarkMode()
  }

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    changeLightMode()
  }

  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function (mediaQueryList) {
    if (mediaQueryList.matches) {
      changeLightMode()
    }
  })
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (mediaQueryList) {
    if (mediaQueryList.matches) {
      changeDarkMode()
    }
  })
}

initThemeModeChangeBtn()
drawFace()
drawPointer()
setInterval(drawPointer, 1000)
initThemeMode()
