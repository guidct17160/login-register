function reset() {
  fetch('http://localhost:3000/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: document.getElementById('token').value,
      newPassword: document.getElementById('password').value
    })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => {
        throw new Error(err.message)
      })
    }
    return res.json()
  })
  .then(data => {
    alert(data.message)
    window.location.href = 'login.html'
  })
  .catch(err => {
    alert(err.message)
    window.location.href = 'reset.html'
  })
}