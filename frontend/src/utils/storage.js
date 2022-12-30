function createStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function readStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

function removeStorage(key) {
    localStorage.removeItem(key)
}

function storageExists(key) {
  let storage = localStorage.getItem(key)
  if (storage) return true
  return false
}

export { createStorage, readStorage, storageExists, removeStorage }