function forgot(){
    fetch('http://localhost:3000/forgot-password',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            username:document.getElementById('username').value
        })
    })
    .then(res => res.json())
    .then(data => {
        alert('Reset Token:'+data.resetToken)
        window.location.href = 'reset.html'
    })
}