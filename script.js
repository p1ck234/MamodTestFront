"use strict";
const fetchPromisePost = async () => {
  const fetchPromise = await fetch("", {
    method: "post",
    body: JSON.stringify({
      public: boolean,
      username: string,
      role: number,
      email: string,
      password: string,
      password_repeat: string,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response;
      } else if (response.status === 400) {
        throw new Error("ошибка 400");
      } else if (response.status === 500) {
        throw new Error("ошибка 500");
      }
    })
    .catch((error) => {
      if (error.message === "ошибка 400") {
        alert("Имя и комментарий должны быть не короче 3 символов");
      } else if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
      } else if (error.message === "ошибка 500") {
        alert("Что-то пошло не так, мы пытаемся переотправить ваш запрос");
        fetchPromisePost(textValue);
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    });
};

const buttonElement = document.getElementById("btn");
const nameInputElement = document.getElementById("input-name");
const passwordInputElement = document.getElementById("password");
const emailInputElement = document.getElementById("email");
const rePasswordInputElement = document.getElementById("repassword");
function updateButtonState() {
  buttonElement.classList.remove("error__button");
  buttonElement.disabled =
    nameInputElement.value.trim() === "" ||
    passwordInputElement.value.trim() === "";
  nameInputElement.classList.remove("error");
  passwordInputElement.classList.remove("error");
}
const regestration = () => {
  nameInputElement.classList.remove("error");
  passwordInputElement.classList.remove("error");
  buttonElement.classList.remove("error__button");

  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    buttonElement.classList.add("error__button");
    nameInputElement.addEventListener("input", updateButtonState);
    return;
  } else if (passwordInputElement.value === "") {
    passwordInputElement.classList.add("error");
    buttonElement.classList.add("error__button");
    passwordInputElement.addEventListener("input", updateButtonState);
  } else {
    fetchPromisePost().then(() => {
      passwordInputElement.value = "";
    });
  }
};
