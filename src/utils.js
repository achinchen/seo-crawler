function validUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

module.exports = {
  validUrl,
}
