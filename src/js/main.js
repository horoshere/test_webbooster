'use strict'

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
        item.addEventListener('click',showModal);
    })


    function closeModal() {
        modal.classList.remove('modal__active');
        document.body.style.overflow = '';
    }

    cross.addEventListener('click', closeModal);


    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('modal__active')) {
            closeModal();
        }
    });

    // function showThxModal() {
    //   modal.classList.add('modal__active');
    //   modalBlock.style.display = 'none';
    //   modalThx.style.display = 'block';
    //   document.body.style.overflow = 'hidden';
    // }

    // subtitle of card
    $('.button').each(function(i) {
      $(this).on('click', function() {
        $('#form .modal__descr').text($('.catalog__item-subtitle').eq(i).text());
      });
    });



    // form.addEventListener('onSubmit', (e) => {
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
  }



    //form
    $('form').submit(function(e) {
        e.preventDefault();
    
        if(!$(this).valid()) {
          return;
        }
    
        $.ajax({
          type: "POST",
          url: "../mailer/smart.php", //выбираем обработчика
          data: $(this).serialize()  //данные которые хотим отправить на сервер
        }).done(function() {
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
      });

      //valid

      $("form").validate({
        rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
              required: true,
              email:true
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
    })

    //   function valideForms(form) {
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
    
      $('input[name=phone]').mask("+7 (999) 999-9999");
    

    
    
    
    // //hamburger
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