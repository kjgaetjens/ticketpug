//dom manipulation for checkout info and what not

var stripe = Stripe('pk_test_5ilmqKs9fDWBuZyRuN52gAjN00SWGmSXqC');
var elements = stripe.elements();

const eventDiv = document.getElementById('event-container')
const orderDiv = document.getElementById('order-info')
const emailDiv = document.getElementById('email')
const phoneDiv = document.getElementById('phone')
const orderinfoDiv = document.getElementById('order-info')
const eventinfoDiv = document.getElementById('event-info')

let url = window.location.href
let parsedUrl
if (url.charAt(url.length-1) == '/') {
  parsedUrl = url.substring(0,url.length-1)
} else {
  parsedUrl = url
}

let strStart = url.indexOf('checkout')+9
let strEnd = url.indexOf('/billing')
let orderId = url.substring(strStart,strEnd)


async function fetchOrder(orderId) {
  let response = await fetch(`${parsedUrl}/getorder`)
  let orderObj = await response.json()

  let eventName = orderObj.event_name
  let eventDate = orderObj.event_date
  let eventLocation = orderObj.event_location

  let ticketPrice = orderObj.ticket_price
  let ticketQty = orderObj.ticket_qty
  let preTaxTotal = orderObj.pre_tax_total
  let postTaxTotal = orderObj.post_tax_total
  let tax = orderObj.tax

  let userEmail = orderObj.username

  eventDiv.innerHTML =
    `<h3>${eventName}</h3>
    <span>${eventDate} - ${eventLocation}</span>`
  emailDiv.innerHTML =
    `<label for="email-input">Email Address</label>
    <input id="email-input" type="text" placeholder=${userEmail} name="emailInput" value=${userEmail}>`
  phoneDiv.innerHTML =
    `<label for="phone-input">Phone Number</label>
    <input id="phone-input" type="text" name="phoneInput">`

  orderinfoDiv.innerHTML = 
    `<h4>Order Summary</h4>
    <div id="priceandfees">
      <div class="orderinfo-row">
        <span>Price</span>
        <span>$${ticketPrice.toFixed(2)} x ${ticketQty}</span>
      </div>
      <div class="orderinfo-row">
        <span>Fees</span>
        <span>$0.00 x ${ticketQty}</span>
      </div>
    </div>
    <div class="orderinfo-row">
      <span>Total</span>
      <span>$${postTaxTotal.toFixed(2)}</span>
    </div>`
    eventinfoDiv.innerHTML =
      `<h4>${eventName}</h4>
      ${eventDate}
      <br>
      ${eventLocation}`
    
    
    

}

fetchOrder(orderId)


var card = elements.create('card')
card.mount('#card-element')

card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });


// Create a token or display an error when the form is submitted.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
  
    // Submit the form
    form.submit();
  }
