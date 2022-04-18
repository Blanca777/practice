function register() {
  if ('serviceWorker' in navigator) {
    // 给service worker注册，scope为工作的作用域，默认为当前目录
    // 注册返回一个Promise对象
    navigator.serviceWorker
      .register('/browser/serviceworker/sw.js', {
        scope: '/browser/serviceworker/'
      })
      .then((reg) => {
        if (reg.installing) {
          console.log('Service worker installing')
        } else if (reg.waiting) {
          console.log('Service worker installed')
        } else if (reg.active) {
          console.log('Service worker active')
        }
      })
      .catch((err) => {
        console.log('register failed with: ' + err)
      })
  }
}

const music = document.querySelector('#tmusic')
const btn = document.querySelector('#sbtn')
const showContain = document.querySelector('#restxt')
const historyContain = document.querySelector('#history')
const player = document.querySelector('#player')

window.addEventListener('load', () => {
  // 等页面加载完后再来注册 sw，这样就不会占用页面加载渲染时的资源
  register()

  // 设置历史记录搜索数据
  const arr = JSON.parse(window.localStorage.getItem('history'))
  if (arr) {
    arr.map((item) => {
      const p = document.createElement('p')
      p.innerText = 'history: ' + item
      historyContain.append(p)
    })
  } else {
    const temp = []
    window.localStorage.setItem('history', JSON.stringify(temp))
  }
})

btn.addEventListener('click', () => {
  // 搜索数据并简单渲染页面
  const name = music.value
  const temp = JSON.parse(window.localStorage.getItem('history'))
  temp.push(name)
  window.localStorage.setItem('history', JSON.stringify(temp))
  showContain.innerText = ''
  fetch(`https://asaki-m.com:3000/search?keywords=${name}`)
    .then((r) => r.json())
    .then((res) => {
      for (let i = 0; i < res.result.songs.length; i++) {
        const p = document.createElement('p')
        const btn = document.createElement('button')
        const div = document.createElement('div')
        p.innerText = res.result.songs[i].id
        btn.setAttribute('data-id', res.result.songs[i].id)
        btn.innerText = '播放'
        div.setAttribute('class', 'box')
        div.append(p)
        div.append(btn)
        showContain.append(div)
      }
    })
})

showContain.addEventListener('click', function (evt) {
  // 设置音乐播放url
  const id = evt.target.dataset.id
  fetch(`https://asaki-m.com:3000/song/url?id=${id}`)
    .then((r) => r.json())
    .then((data) => {
      const url = data.data[0].url
      player.src = url
    })
})
