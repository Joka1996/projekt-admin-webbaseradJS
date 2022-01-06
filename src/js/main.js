"use strict";

//variabler
let filmOutput = document.getElementById("filmOutput");
let filmOptionsOutput = document.getElementById("film-options-output");
//variabler lägga tillsss
let inputCategory = document.getElementById("category");
let inputDescription = document.getElementById("Description");
let inputDesPic = document.getElementById("describingPic");

let inputOpt1 = document.getElementById("Option1");
let inputTrue1 = document.getElementById("True/false");
let inputPic1 = document.getElementById("picture");

let inputOpt2 = document.getElementById("Option2");
let inputPic2 = document.getElementById("picture2");
let inputTrue2 = document.getElementById("True/false2");

let inputOpt3 = document.getElementById("Option3");
let inputPic3 = document.getElementById("picture3");
let inputTrue3 = document.getElementById("True/false3");

let inputOpt4 = document.getElementById("Option4");
let inputPic4 = document.getElementById("picture4");
let inputTrue4 = document.getElementById("True/false4");

let addFilmBTN = document.getElementById("addFilmBtn");

//variabler för uppdatera
let input_FILMID = document.getElementById("FILM_id");
let inputCategoryUP = document.getElementById("categoryUP");
let inputDescriptionUP = document.getElementById("DescriptionUP");
let inputDesPicUP = document.getElementById("describingPicUP");

let inputOpt1UP = document.getElementById("Option1UP");
let inputTrue1UP = document.getElementById("True/falseUP");
let inputPic1UP = document.getElementById("pictureUP");

let inputOpt2UP = document.getElementById("Option2UP");
let inputPic2UP = document.getElementById("picture2UP");
let inputTrue2UP = document.getElementById("True/false2UP");

let inputOpt3UP = document.getElementById("Option3UP");
let inputPic3UP = document.getElementById("picture3UP");
let inputTrue3UP = document.getElementById("True/false3UP");

let inputOpt4UP = document.getElementById("Option4UP");
let inputPic4UP = document.getElementById("picture4UP");
let inputTrue4UP = document.getElementById("True/false4UP");

let UPFilmBtn = document.getElementById("UPFilmBtn");

//eventhanterare
window.addEventListener("load", getFilmQuiz);
window.addEventListener("load", getUsers);

addFilmBTN.addEventListener("click", function (e) {
  e.preventDefault();
  addFilm();
});
UPFilmBtn.addEventListener("click", function (e) {
  e.preventDefault();
  updateFilm();
});
// funktion för att ladda om sidan.
function reload() {
  location.reload();
  return false;
}

//fetch hämta film-frågor
function getFilmQuiz() {
  fetch("https://projekt-backend-jswebb.herokuapp.com/api/movies")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (film) {
        //kontrollera med log
        //console.log(film);
        filmOutput.innerHTML += `
        <tbody>
        <td>${film.category}</td>
        <td>${film.description}</td>
          <td>
        ${film.options[0].text} = ${film.options[0].is_correct} <br /> 
          ${film.options[1].text} =${film.options[1].is_correct}<br /> 
          ${film.options[2].text} = ${film.options[2].is_correct}<br /> 
          ${film.options[3].text} = ${film.options[3].is_correct}
          </td>
          <td><a href="${film.image}" target="_blank">${film.image}</a></td>
          <td>
         <a href="${film.options[0].image}" target="_blank">${film.options[0].image}<br />
         <a href="${film.options[1].image}" target="_blank">${film.options[1].image}<br />
         <a href="${film.options[2].image}" target="_blank">${film.options[2].image}<br />
         <a href="${film.options[3].image}" target="_blank">${film.options[3].image}<br />
          </td>
          <td><button onClick="deleteFilm('${film._id}')">Delete</button</td>
          <td><button onClick="sendToForm('${film._id}')"> <a href="#section3"> Update</a></button</td>
          </tbody>
        `;
      });
    });
}
let filmMessage = document.getElementById("filmMessage");
//fetch add film
function addFilm() {
  //Hämta värden
  let category = inputCategory.value;
  let description = inputDescription.value;
  let describingPic = inputDesPic.value;
  let option1 = inputOpt1.value;
  let true1 = inputTrue1.value;
  let pic1 = inputPic1.value;

  let option2 = inputOpt2.value;
  let pic2 = inputPic2.value;
  let true2 = inputTrue2.value;

  let option3 = inputOpt3.value;
  let pic3 = inputPic3.value;
  let true3 = inputTrue3.value;

  let option4 = inputOpt4.value;
  let pic4 = inputPic4.value;
  let true4 = inputTrue4.value;

  //konventera till boolean true
  let isTrue = true1 === "true";
  let isTrue2 = true2 === "true";
  let isTrue3 = true3 === "true";
  let isTrue4 = true4 === "true";

  let film = {
    category: category,
    description: description,
    image: describingPic,
    options: [
      { text: option1, is_correct: isTrue, image: pic1 },
      { text: option2, is_correct: isTrue2, image: pic2 },
      { text: option3, is_correct: isTrue3, image: pic3 },
      { text: option4, is_correct: isTrue4, image: pic4 },
    ],
  };

  fetch("https://projekt-backend-jswebb.herokuapp.com/api/movies", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(film),
  })
    .then((res) => res.json())
    .then((data) => {
      filmMessage.innerHTML += `New quiz-film created, refresh page.`;
      //töm formuläret
      inputCategory.value = "";
      inputDescription.value = "";
      inputDesPic.value = "";
      inputOpt1.value = "";
      inputTrue1.value = "";
      inputPic1.value = "";

      inputOpt2.value = "";
      inputPic2.value = "";
      inputTrue2.value = "";

      inputOpt3.value = "";
      inputPic3.value = "";
      inputTrue3.value = "";

      inputOpt4.value = "";
      inputPic4.value = "";
      inputTrue4.value = "";
    })
    //felkod
    .catch((error) => {
      console.log("error: ", error);
    });
}
//console.log(addFilm());

//skicka informationen till formuläret
function sendToForm(_id) {
  fetch("https://projekt-backend-jswebb.herokuapp.com/api/movies/id=" + _id)
    .then((res) => res.json())
    .then((data) => {
      //fyll i fälten efter klick på update.
      input_FILMID.value = data._id;
      inputCategoryUP.value = data.category;
      inputDescriptionUP.value = data.description;
      inputDesPicUP.value = data.image;

      inputOpt1UP.value = data.options[0].text;
      inputTrue1UP.value = data.options[0].is_correct;
      inputPic1UP.value = data.options[0].image;

      inputOpt2UP.value = data.options[1].text;
      inputPic2UP.value = data.options[1].image;
      inputTrue2UP.value = data.options[1].is_correct;

      inputOpt3UP.value = data.options[2].text;
      inputPic3UP.value = data.options[2].image;
      inputTrue3UP.value = data.options[2].is_correct;

      inputOpt4UP.value = data.options[3].text;
      inputPic4UP.value = data.options[3].image;
      inputTrue4UP.value = data.options[3].is_correct;
    });
}

let filmMessageUP = document.getElementById("filmMessageUP");
// uppdatera
function updateFilm() {
  let _id = input_FILMID.value;
  let category = inputCategoryUP.value;
  let description = inputDescriptionUP.value;
  let desIMG = inputDesPicUP.value;
  let option1 = inputOpt1UP.value;
  let true1 = inputTrue1UP.value;
  let img1 = inputPic1UP.value;

  let option2 = inputOpt2UP.value;
  let img2 = inputPic2UP.value;
  let true2 = inputTrue2UP.value;

  let option3 = inputOpt3UP.value;
  let img3 = inputPic3UP.value;
  let true3 = inputTrue3UP.value;

  let option4 = inputOpt4UP.value;
  let img4 = inputPic4UP.value;
  let true4 = inputTrue4UP.value;

  // konventera true/false till boolean true
  let isTrue = true1 === "true";
  let isTrue2 = true2 === "true";
  let isTrue3 = true3 === "true";
  let isTrue4 = true4 === "true";

  let updateFilm = {
    category: category,
    description: description,
    image: desIMG,
    options: [
      { text: option1, is_correct: isTrue, image: img1 },
      { text: option2, is_correct: isTrue2, image: img2 },
      { text: option3, is_correct: isTrue3, image: img3 },
      { text: option4, is_correct: isTrue4, image: img4 },
    ],
  };

  //fetch
  fetch("https://projekt-backend-jswebb.herokuapp.com/api/movies/id=" + _id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateFilm),
  })
    .then((res) => res.json())
    .then(() => {
      filmMessageUP.innerHTML += `Quiz updated`;
      // nollställ uppdateringsformuläret.
      input_FILMID.value = "";
      inputCategoryUP.value = "";
      inputDescriptionUP.value = "";
      inputDesPicUP.value = "";

      inputOpt1UP.value = "";
      inputTrue1UP.value = "";
      inputPic1UP.value = "";

      inputOpt2UP.value = "";
      inputPic2UP.value = "";
      inputTrue2UP.value = "";

      inputOpt3UP.value = "";
      inputPic3UP.value = "";
      inputTrue3UP.value = "";

      inputOpt4UP.value = "";
      inputPic4UP.value = "";
      inputTrue4UP.value = "";
    })
    // felmeddelande till konsolen
    .catch((error) => {
      console.log("error: ", error);
    });
}

// ta bort film
function deleteFilm(_id) {
  // ett säkerhetsmedelande
  if (confirm("Are you sure?")) {
    fetch("https://projekt-backend-jswebb.herokuapp.com/api/movies/id=" + _id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }
}
/*
js för användare 
*/
//variabler
let userOutput = document.getElementById("user-output");
let inputUsername = document.getElementById("Username");
let inputPassword = document.getElementById("Password");
let addUserBTN = document.getElementById("addUserBTN");
//variabler uppdatera
let inputUsernameUP = document.getElementById("UsernameUP");
let inputPasswordUP = document.getElementById("PasswordUP");
let userID = document.getElementById("userID");
let UPUserBTN = document.getElementById("UPUserBTN");
//händelsehanterare
addUserBTN.addEventListener("click", function (e) {
  e.preventDefault();
  addUser();
});
UPUserBTN.addEventListener("click", function (e) {
  e.preventDefault();
  updateUser();
});

//fetch hämta
function getUsers() {
  fetch("https://projekt-backend-jswebb.herokuapp.com/api/user")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (user) {
        userOutput.innerHTML += `
        <td>${user.user_name}</td>
        <td>${user.password}</td>
        <td><button onClick="deleteUser('${user._id}')"> Delete </button>
        <td><button onClick="sendToUpdateFilm('${user._id}')"> <a href="#messageUserUP"> Update</a> </button> </td>
        `;
      });
    });
}
let message = document.getElementById("messageUser");
//lägga till
function addUser() {
  //hämta värden
  let user_name = inputUsername.value;
  let password = inputPassword.value;

  let user = {
    user_name: user_name,
    password: password,
  };

  fetch("https://projekt-backend-jswebb.herokuapp.com/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then(() => {
      message.innerHTML += `User created, refresh page!`;
      inputUsername.value = "";
      inputPassword.value = "";
    })
    //felmeddelande
    .catch((error) => {
      console.log("Error: ", error);
    });
}

// fyll i uppdaterings-formuläret
function sendToUpdateFilm(_id) {
  fetch("https://projekt-backend-jswebb.herokuapp.com/api/user/id=" + _id)
    .then((res) => res.json())
    .then((data) => {
      userID.value = data._id;
      inputUsernameUP.value = data.user_name;
      inputPasswordUP.value = data.password;
    });
}
//uppdatera
let messageUserUP = document.getElementById("messageUserUP");
function updateUser() {
  let _id = userID.value;
  let user_name = inputUsernameUP.value;
  let password = inputPasswordUP.value;

  let updateUser = {
    user_name: user_name,
    password: password,
  };

  fetch("https://projekt-backend-jswebb.herokuapp.com/api/user/id=" + _id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => res.json())
    .then(() => {
      messageUserUP.innerHTML += `User updated, refresh page!`;
      userID.value = "";
      inputUsernameUP.value = "";
      inputPasswordUP.value = " ";
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

//radera
function deleteUser(_id) {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch("https://projekt-backend-jswebb.herokuapp.com/api/user/id=" + _id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
}
