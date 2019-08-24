let zoomIn = document.getElementById("zoomin")
let zoomOut = document.getElementById("zoomout")
let img = document.getElementById("img")
let num = 0.5


    zoomIn.addEventListener("click", ()=>{
        if (num < 3){
          num+= 0.30
        } 
        img.setAttribute('style', `transform: scale(${num})`)
    })

    zoomOut.addEventListener("click",()=>{
      if(num > 0.30){
         num -= 0.30
      }
       img.setAttribute('style', `transform: scale(${num})`)
    })