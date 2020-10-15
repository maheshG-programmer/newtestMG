window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}
let deferredPrompt;
var div = document.querySelector(".add-to");
//div.style.display = 'none';
window.addEventListener('beforeinstallprompt', function(e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  div.style.display = 'block'
});
  var btnAdd = document.querySelector(".add-to-btn");
  btnAdd.click();
    // Installation must be done by a user gesture! Here, the button click
  btnAdd.addEventListener('click', (e) => {
    alert("click")
    // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});