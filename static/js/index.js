let backgroundContainer = document.getElementById('backgroundContainer')
let backgroundContainerHeight = backgroundContainer.clientHeight
console.log(backgroundContainerHeight)
let indexSearchContainer = document.getElementById('index-search-container')
indexSearchContainer.style.transform = `translate(0px, ${backgroundContainerHeight/3}px)`