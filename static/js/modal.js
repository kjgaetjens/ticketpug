let loginModal = document.getElementsByClassName('modal')[0]
let loginBtn = document.getElementById('login')
let closeBtn = document.getElementsByClassName("close")[0];

loginBtn.addEventListener('click', ()=>{
    loginModal.style.display = "block"
})

if (closeBtn) {
    closeBtn.onclick = function(){
        loginModal.style.display = "none";
    }
}


window.onclick = function(event){
    if(event.target == loginModal){
        loginModal.style.display ="none";
    }
}

login.addEventListener('click', ()=>{
    loginModal.style.display = "block";
})