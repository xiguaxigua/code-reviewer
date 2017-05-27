import * as wilddog from 'wilddog'
import _throttle from 'lodash/throttle'
import { getId, setStorage, addListener, getStorage } from './utils'

let data = null
const uid = getId()
const idAbbr = uid.slice(0, 5)
let ref = null
let wildId = null
let initedUser = false
let box = null

main()

function initWilddog (id) {
  wilddog.initializeApp({
    syncURL: `https://${id}.wilddogio.com`
  })
  return wilddog.sync().ref();
}

function addAdminEvent () {
  document.addEventListener('mousemove', _throttle(sendPosigion, 1000))
  document.addEventListener('scroll', _throttle(sendScroll, 1000))
}

function sendPosigion (event) {
  ref.child('mouse').set({
    left: event.pageX,
    top: event.pageY
  });
}

function sendScroll () {
  ref.child('page').set({
    top: document.body.scrollTop
  })
}

function addPointer () {
  box = document.createElement('div')
  box.classList.add('box')
  const style = {
    width: '10px',
    height: '10px',
    backgroundColor: 'red',
    position: 'absolute',
    left: '1px',
    top: '1px'
  }
  Object.keys(style).forEach(key => {
    box.style[key] = style[key]
  })
  setTimeout(function () {
    document.body.appendChild(box)
  }, 1000)
}

function initUser (data) {
  if (!data.admin || data.admin.uid === uid) {
    console.log('设置成员属性为admin')
    ref.child('admin').set({ uid })
    ref.child('info').update({ href: window.location.href })
    setStorage('type', 'admin')
    addAdminEvent()
  } else {
    console.log('设置成员属性为user')
    ref.child('users').push({ uid })
    setStorage('type', 'user')
    addPointer()
  }
}

function init (id) {
  ref = initWilddog(id.newValue || id)
  ref.on('value', function (snapshot) {
    data = snapshot.val()
    if (!initedUser) {
      initedUser = true
      initUser(data, uid)
    }
    if (data.admin.uid !== uid) changeHandler(data)
  })
}

function changeHandler (data) {
  if (box && data.mouse) {
    box.style.left = data.mouse.left + 'px'
    box.style.top = data.mouse.top + 'px'
  }
  if (data.page) {
    document.documentElement.scrollTop = data.page.top
  }
}

function toggleState (state) {
  if (ref) {
    ref.child('info').update({ state })
  }
}

function main () {
  setStorage('uid', idAbbr)
  setStorage('href', window.location.href)
  getStorage('id').then(res => {
    console.log('本地ID', res.id)
    if (res && res.id) {
      wildId = res.id
      init(res.id)
    }
  })
  addListener(changes => {
    if (changes.id && wildId !== changes.id) {
      wildId = changes.id
      init(changes.id)
    }
    if (changes.state) {
      toggleState(changes.state.newValue)
    }
    if (changes.jump) {
      setStorage('jump', '0')
      if (data && data.info && data.info.href) {
        window.location.href = data.info.href
      }
    }
  })
}
