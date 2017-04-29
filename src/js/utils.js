/* eslint-disable no-undef */
import md5 from 'js-md5'

const __idKey = 'code-reviewer-id'

export function getId () {
  const cachedId = window.localStorage.getItem(__idKey)
  if (cachedId) return cachedId
  const id = md5(String(Math.random() + new Date().getTime()))
  window.localStorage.setItem(__idKey, id)
  return id
}

export function setStorage (name, value) {
  chrome.storage.local.set({ [name]: value })
}

export function getStorage (name) {
  return new Promise((resolve) => {
    chrome.storage.local.get(name, function (items) {
      resolve(items)
    })
  })
}

export function addListener (fn) {
  chrome.storage.onChanged.addListener(fn)
}

export function clearStorage (names) {
  const store = {}
  names.forEach(name => { store[name] = '' })
  chrome.storage.local.set(store)
}
