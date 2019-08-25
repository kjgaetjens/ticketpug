// console.log('client side is working');


// document.querySelectorAll('.fa-heart').forEach(function(e) {
//     e.addEventListener('click', function() {
//       this.style.color = "red";
//     })
//   });



function myFunction(){
  var x = document.getElementById("accountMenu");
  if (x.className === "accountMenu"){
    x.className += " responsive";
  } else {
    x.className = "accountMenu";
  }
}