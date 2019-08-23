console.log('client side is working');


document.querySelectorAll('.fa-heart').forEach(function(e) {
    e.addEventListener('click', function() {
      this.style.color = "red";
    })
  });

