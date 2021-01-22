/** @format */

import $ from "jquery";
// import wow from "wowjs";
import inputmask from "inputmask";
import loadingAttributePolyfill from "loading-attribute-polyfill";
// const WOW = require("wowjs");
// window.wow = new wow.WOW();
// window.wow.init();
window.jQuery = $;
window.$ = $;
// require("./vendor/mail.js");

// import module example (npm i -D jquery)

document.addEventListener("DOMContentLoaded", () => {
  const phone = document.querySelectorAll(".telephone");
  const popupForm = document.querySelector("#popup__form");
  const formPopup = document.querySelector(".form__popup");
  const popupLeave = document.querySelector("#popup__leave");
  const leaveMessage = document.querySelector(".leave__message");
  const complexProject = document.querySelector(".complex_project");
  const popupBg = document.querySelectorAll(".popup__overlay");
  const showForm = document.querySelectorAll(".show__form");
  const closePopup = document.querySelectorAll(".close");
  const sendForms = document.querySelectorAll(".send__form");
  const quizNavigation = document.querySelectorAll(".quiz__navigation");
  const burgerMenu = document.querySelector(".burger__menu");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");
  const questions = document.querySelector(".questions");

  let phoneMask = new inputmask({
    mask: "+375-99-999-99-99",
    clearIncomplete: true,
    greedy: false,
  });
  if (questions) {
    const questionsHeight = document.querySelector("#question-01").offsetHeight;
    questions.style.height = questionsHeight + "px";
  }
  if (quizNavigation.length > 0) {
    quizNavigation.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const questionIndex = this.dataset.index;
        const question = document.querySelector("#question-" + questionIndex);
        const questionHeight = question.offsetHeight;
        if (this.classList.contains("_check")) {
          const answers = this.parentNode.querySelectorAll(".answer:checked")
            .length;
          if (answers == 0) {
            alert("Пожалуйста сделайте выбор");
          } else {
            question.classList.add("__show");
            questions.style.height = questionHeight + "px";
            this.parentNode.parentNode.classList.remove("__show");
            console.log(questionIndex);
            if (this.classList.contains("show__gift")) {
              complexProject.style.width = 0;
              complexProject.style.height = 0;
              complexProject.classList.add("__hide");
              this.parentNode.parentNode.parentNode.classList.add("full-size");
            }
          }
        } else if (this.classList.contains("_check_area")) {
          const answers = this.parentNode.querySelectorAll(".answer").value;
          if (answers == 0) {
            alert("Пожалуйста заполните поле");
          } else {
            question.classList.add("__show");
            questions.style.height = questionHeight + "px";
            this.parentNode.parentNode.classList.remove("__show");
            console.log(questionIndex);
            if (this.classList.contains("show__gift")) {
              complexProject.style.width = 0;
              complexProject.style.height = 0;
              complexProject.classList.add("__hide");
              this.parentNode.parentNode.parentNode.classList.add("full-size");
            }
          }
        } else {
          question.classList.add("__show");
          questions.style.height = questionHeight + "px";
          this.parentNode.parentNode.classList.remove("__show");
          console.log(questionIndex);
          if (this.classList.contains("show__gift")) {
            complexProject.style.width = 0;
            complexProject.style.height = 0;
            complexProject.classList.add("__hide");
            this.parentNode.parentNode.parentNode.classList.add("full-size");
          }
        }
      });
    });
  }
  if (phone.length > 0) {
    for (let i = 0; i < phone.length; i++) {
      const phoneItem = phone[i];
      phoneMask.mask(phoneItem);
    }
  }
  if (burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      this.classList.toggle("__clicked");
      menu.classList.toggle("__show");
      e.preventDefault;
    });
  }
  const classRemove = (element, removeClass) => {
    const elementClass = document.querySelector("" + element + "");
    if (elementClass) {
      elementClass.classList.remove(removeClass);
    }
  };

  if (sendForms) {
    sendForms.forEach((sendForm) => {
      sendForm.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });
      // sendForm.onsubmit = () => {
      //   let th = this;
      //   $.ajax({
      //     type: "POST",
      //     url: "../assets/mail.php", //Change
      //     data: th.serialize(),
      //   }).done(function () {
      //     alert("Thank you!");
      //     setTimeout(function () {
      //       // Done Functions
      //       th.trigger("reset");
      //     }, 1000);
      //   });
      //   return false;
      // };
    });
  }
  $("form").submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "/assets/blagostroy/modx-mail.php", //Change
      data: th.serialize(),
    }).done(function () {
      alert("Thank you!");
      setTimeout(function () {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  window.addEventListener("scroll", function () {
    classRemove(".burger__menu.__clicked", "__clicked");
    classRemove(".menu.__show", "__show");
  });

  if (showForm) {
    showForm.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const subject = this.dataset.subject;
        console.log(subject);
        e.preventDefault();
        popupToggle(
          popupForm,
          formPopup,
          "animate__fadeIn",
          "animate__bounceInDown",
          "animate__fadeOut",
          "animate__bounceOutUp",
          "flex",
          100
        );
      });
      return false;
    });
  }

  const popupToggle = (
    popUp,
    popUpElement,
    el1ShowClassAdd,
    el2ShowClassAdd,
    el1HideClassRemove,
    el2HideClassRemove,
    state,
    timing
  ) => {
    popUp.classList.add(el1ShowClassAdd);
    popUp.classList.remove(el1HideClassRemove);
    popUpElement.classList.remove(el2HideClassRemove);
    popUpElement.classList.add(el2ShowClassAdd);
    body.classList.toggle("__fixed");
    setTimeout(function FormFadeIn() {
      popUp.style.display = state;
    }, timing);
  };

  const popupClose = () => {
    if (window.getComputedStyle(popupForm).display === "flex") {
      popupToggle(
        popupForm,
        formPopup,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        1000
      );
      return false;
    }
    if (window.getComputedStyle(popupLeave).display === "flex") {
      popupToggle(
        popupLeave,
        leaveMessage,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        1000
      );
      return false;
    }
  };

  if (popupBg) {
    popupBg.forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        popupClose();
      });
    });
  }

  if (closePopup) {
    closePopup.forEach(function (close) {
      close.addEventListener("click", function (e) {
        popupClose();
        e.preventDefault();
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      popupClose();
    }
  });
});
