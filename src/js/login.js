// simpel inloggning

function checkLogin() {
  let username = "joelAdmin";
  let password = "joelPassword";
  let loginU = document.getElementById("loginU");
  let loginP = document.getElementById("loginP");

  let messageERROR = document.getElementById("messageERROR");

  if (loginU.value == username && loginP.value == password) {
    window.location = "https://admin-quiz.netlify.app/quiz.html";
  } else {
    messageERROR.innerHTML = "<h3>Fel lösenord/användarnamn</h3>";
  }
}
