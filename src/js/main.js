'use strict'

document.addEventListener('DOMContentLoaded', () => {
    
    // Modal
    const modal = document.querySelector('.modal'),
        modalOverlay = document.querySelector('.modal__overlay'),
        triggerModal = document.querySelector('.button'),
        cross = document.querySelector('.modal__close');

    function showModal() {
        modal.classList.add('modal__active');
        document.body.style.overflow = 'hidden';
    }

    triggerModal.addEventListener('click', showModal);

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