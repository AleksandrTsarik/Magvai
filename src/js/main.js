'use strict'


const burgerMenu = document.querySelector('.burger-menu');
const overlay = document.querySelector('.header-strip__menu');
const openMenu = document.querySelector('.header-strip__menu-list');
const menuPhone = document.querySelector('.header-strip__right');
burgerMenu.addEventListener('click',function(){
  this.classList.toggle('close');
  overlay.classList.toggle('overlay-menu');
  openMenu.classList.toggle('open-menu');
  menuPhone.classList.toggle('open-menu');
  document.body.classList.toggle('is-hidden');
});

const btnsModal = document.querySelectorAll('.js-form');
const modal = document.querySelector('.modal');
const modalOverlay = modal.querySelector('.overlay');
const btnCloseModal = modal.querySelector('.modal__close');

const openModal = () => {
	modal.classList.add('is-open');
	document.body.classList.add('is-hidden');
}

const closeModal = () => {
	modal.classList.remove('is-open');
	document.body.classList.remove('is-hidden');
}

btnsModal.forEach(element => {
	element.addEventListener('click', openModal);
});

modalOverlay.addEventListener('click', closeModal);
btnCloseModal.addEventListener('click', closeModal);


const btnMore = document.querySelector('.offer__more-btn');
const itemsWrap = document.querySelector('.offer__list');

const queryItems = (start, limit) => {
	fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
		.then(response => response.json())
		.then(data => {
			data.forEach(element => {
				itemsWrap.insertAdjacentHTML('beforeend', `
					<div class="offer-item">
						<div class="offer-item__inner">
							<div class="offer-item__img">
								<img src="/img/cards/item${element.id}.webp" alt="...">
							</div>
							<div class="offer-item__info">
								<div class="offer-item__name">no name</div>
								<div class="offer-item__title">${element.title}</div>
								<div class="offer-item__text">${element.body}</div>
								<div class="offer-item__post">Posted by<strong> Eugenia,</strong> on July  24, 2019</div>
								<div class="offer-item__btn">
									<button>Continue reading</button>
								</div>
							</div>
						</div>
					</div>
				`)
			});
		})
}

btnMore.addEventListener('click', function() {
	const items = itemsWrap.querySelectorAll('.offer-item');
	let btn = this;
	if(items.length === 30) return;
	if(items.length === 25) btn.classList.add('disabled');
	queryItems(items.length, 5)
});


const form = document.querySelector('.modal-form form');
const inputs = form.querySelectorAll('input');
form.addEventListener('submit', function(e) {
	e.preventDefault();
	let submit = true;
	let form = this;
	let mail = form.querySelector('.js-mail');
	let phone = form.querySelector('.js-phone');

	form.querySelectorAll('input').forEach(element => {
		if(!element.value) {
			element.classList.add('field-error');
			submit = false;
		}
	});

	if (mail.value.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)< 0) {
		mail.classList.add('field-error');
		submit = false;
	}

	if (phone.value.search(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)< 0) {
		phone.classList.add('field-error');
		submit = false;
	}

	if (!submit) return false;

	//--обработчик формы
	form.reset();
});

inputs.forEach(element => {
	element.addEventListener('focus', function() {
		element.classList.remove('field-error')
	})
})

//--маска
let phoneInput = document.querySelector(".js-phone");
const phoneMask = new IMask(phoneInput, {
  mask: "+{7}(000)000-00-00",
});
