/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('DOMContentLoaded', () => {
  // Modal
  const modal = document.querySelector('.modal'),
        modalBlock = document.querySelector('.modal__block'),
        form = document.querySelector('form'),
        modalOverlay = document.querySelector('.modal__overlay'),
        triggerModal = document.querySelectorAll('.button'),
        cross = document.querySelector('.modal__close');

  function showModal() {
    modal.classList.add('modal__active');
    document.body.style.overflow = 'hidden';
  }

  triggerModal.forEach(item => {
    item.addEventListener('click', showModal);
  });

  function closeModal() {
    modal.classList.remove('modal__active');
    document.body.style.overflow = '';
  }

  cross.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('modal__active')) {
      closeModal();
    }
  }); // function showThxModal() {
  //   modal.classList.add('modal__active');
  //   modalBlock.style.display = 'none';
  //   modalThx.style.display = 'block';
  //   document.body.style.overflow = 'hidden';
  // }
  // subtitle of card

  $('.button').each(function (i) {
    $(this).on('click', function () {
      $('#form .modal__descr').text($('.catalog__item-subtitle').eq(i).text());
    });
  }); // form.addEventListener('onSubmit', (e) => {
  //   e.preventDefault();
  //   showThxModal();
  // })

  function showThxModal() {
    modalBlock.classList.add('hide');
    showModal();
    const thxModal = document.createElement('div');
    thxModal.classList.add('modal__thanks');
    thxModal.innerHTML = `
          <div class="modal__subtitle">Спасибо за вашу заявку!</div>
          <div class="modal__descr modal__descr_mini">Наш менеджер свяжется с вами в  ближайшее время!
          </div>
      `;
    modal.append(thxModal);
    setTimeout(() => {
      thxModal.remove();
      modalBlock.classList.add('show');
      modalBlock.classList.remove('hide');
      closeModal();
    }, 2500);
  } //form


  $('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "../mailer/smart.php",
      //выбираем обработчика
      data: $(this).serialize() //данные которые хотим отправить на сервер

    }).done(function () {
      $(this).find("input").val(""); //устанавливаем value у input'ов в пустую строку

      $('#form').fadeOut();
      $(' #thanks').fadeIn('slow');
      setTimeout(() => {
        $('#form').fadeIn();
        $(' #thanks').fadeOut('slow');
      }, 2500);
      $('form').trigger('reset');
    });
    return false;
  }); //valid

  $("form").validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста, введите свое имя",
        minlength: jQuery.validator.format("Введите {0} символа!")
      },
      phone: "Пожалуйста, введите свой номер телефона",
      email: {
        required: "Пожалуйста, введите свой e-mail",
        email: "Неправильно введен адрес почты"
      }
    }
  }); //   function valideForms(form) {
  //     $(form).validate({
  //       rules:{
  //         name: "required",
  //         phone: "required",
  //         email: {
  //           required: true,
  //           email:true
  //         }
  //       },
  //       messages: {
  //         name: "Пожалуйста, введите свое имя",
  //         phone: "Пожалуйста, введите свой номер телефона",
  //         email: {
  //           required: "Пожалуйста, введите свой e-mail",
  //           email: "Неправильно введен адрес почты"
  //         }
  //       }
  //     });
  //   };
  //   valideForms('#consultation-form');
  //   valideForms('#consultation form');
  //   valideForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-9999"); // //hamburger
  // const burger = document.querySelector('.hamburger'),
  //     right = document.querySelector('.navigation__links'),
  //     itemRight = document.querySelectorAll('.navigation__link');
  // burger.addEventListener('click', () => {
  //     burger.classList.toggle('hamburger_active');
  //     right.classList.toggle('navigation__links_active');
  // });
  // itemRight.forEach(item => {
  //     item.addEventListener('click', () => {
  //         burger.classList.toggle('hamburger_active');
  //         right.classList.toggle('navigation__right_active')
  //     });
  // })
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map