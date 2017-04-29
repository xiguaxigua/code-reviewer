import * as wilddog from 'wilddog'
import _throttle from 'lodash/throttle'
import { getId, setStorage, addListener, clearStorage } from './utils'

let data = null
const id = getId()
console.log(id)
const idAbbr = id.slice(0, 5)
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
  console.log(data)
  if (!data.admin || data.admin.id === id) {
    ref.child('admin').set({ id })
    setStorage('type', 'admin')
    addAdminEvent()
  } else {
    ref.child('users').push({ id })
    setStorage('type', 'user')
    addPointer()
  }
}

function init (changes) {
  ref = initWilddog(changes.id.newValue)
  ref.on('value', function (snapshot) {
    data = snapshot.val()
    if (!initedUser) {
      initedUser = true
      initUser(data, id)
    }
    if (data.admin.id !== id) changeHandler(data)
  })
}

function changeHandler (data) {
  if (box && data.mouse) {
    box.style.left = data.mouse.left + 'px'
    box.style.top = data.mouse.top + 'px'
  }
  if (data.page) {
    console.log('set scroll top', data.page.top + 'px')
    document.documentElement.scrollTop = data.page.top
  }
}

function main () {
  setStorage('uid', idAbbr)
  clearStorage(['id', 'type'])
  addListener(changes => {
    console.log('contentjs', changes)
    if (changes.id && wildId !== changes.id) {
      wildId = changes.id
      init(changes)
    }
  })
}

/*
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    var val = snapshot.val()
    if (val.admin.id !== id) {
      console.log('触发鼠标位置修改')
      box.style.left = val.mouse.left + 'px'
      box.style.top = val.mouse.top + 'px'

      document.body.scrollTop = val.page && val.page.top
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('监听修改')
  console.log(changes, namespace)
})
 */
