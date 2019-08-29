let loginModal = document.getElementsByClassName('modal')[0]
let loginBtn = document.getElementById('login')
let closeBtn = document.getElementsByClassName("close")[0];
let backBtn = document.getElementsByClassName('back')[0]
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

backBtn.addEventListener('click', ()=>{
    console.log("clicked")
    window.history.back()
 })