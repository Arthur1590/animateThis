var windowWidth = $(window).width()

$('.header__icon').on('click', function () {
	gsap.to($('.header__menu'), {
		right: -40,
		duration: 0.5,
		opacity: 1,
		delay: 0.6,
		ease: 'power2.inOut',
	})

	gsap.to($('.header__icon svg'), {
		left: 20,
		duration: 0.4,
		opacity: 0,
		ease: 'power2.inOut',
	})

	gsap.to($('.header__background'), {
		left: 60,
		duration: 1,
		width: 600,
		ease: 'power2.inOut',
	})

	gsap.to($('.header__blur'), {
		left: 60,
		duration: 1,
		width: 600,
		ease: 'power2.inOut',
	})

	$('.header__menu').css({
		visibility: 'visible',
	})
	$('.header__back').css({
		visibility: 'visible',
	})
})

let windowWidth2 = windowWidth * 2
let windowWidth3 = windowWidth * 3
let windowWidth4 = windowWidth * 4

$('.gsap_container').css({
	width: windowWidth4 + 'px',
})

$('.section-page').css({
	'min-width': windowWidth + 'px',
	'max-width': windowWidth + 'px',
})

// ? Использование sessionStorage для хранения и проверки состояния, после завершения анимации от Гсап сбрасывается/запускается видео

$(document).ready(function () {
	var video = $('.section-main__img')[0]

	function resetAndPauseVideo() {
		video.pause()
		video.currentTime = 0
		sessionStorage.setItem('videoPaused', 'true')
	}

	function playVideoIfPaused() {
		if (sessionStorage.getItem('videoPaused') === 'true') {
			video.play()
			sessionStorage.removeItem('videoPaused')
		}
	}

	// Обработчики кликов для элементов меню
	$('.link_main, .link_project, .link_contcts, .link_about').on(
		'click',
		function () {
			resetAndPauseVideo()

			var targetX = 0

			if ($(this).hasClass('link_project')) {
				targetX = -windowWidth
			} else if ($(this).hasClass('link_contcts')) {
				targetX = -windowWidth2
			} else if ($(this).hasClass('link_about')) {
				targetX = -windowWidth3
			}

			gsap.to($('.gsap_container'), {
				x: targetX,
				duration: 1,
				ease: 'power2.inOut',
				onComplete: playVideoIfPaused,
			})

			setTimeout(function () {
				$('.header').removeClass('project')
			}, 400)

			gsap.to('.main-logo', {
				y: 0,
				delay: 0,
				duration: 0.7,
				ease: 'power1.in',
			})
		}
	)

	// Проверка, был ли установлен флаг в сессионном хранилище
	if (sessionStorage.getItem('videoPaused') === 'true') {
		video.currentTime = 0
		video.pause()
	} else {
		video.play()
	}
})

// ! $('.link_main').on('click', function() {

// 	gsap.to($('.gsap_container'), {
// 		x: 0,
// 		duration: 1,
// 		ease: "power2.inOut"
// 	});

// 	setTimeout(function () {
// 		$('.header').removeClass('project');
// 	}, 400);

// 	gsap.to(".main-logo", {
// 		y: 0,
// 		delay: 0,
// 		duration: 0.7,
// 		ease: "power1.in",
// 	});
// });

// $('.link_project').on('click', function() {
// 	gsap.to($('.gsap_container'), {
// 		x: -windowWidth,
// 		duration: 1,
// 		ease: "power2.inOut"
// 	});

// 	setTimeout(function () {
// 		$('.header').addClass('project');
// 	}, 500);

// 	gsap.to(".main-logo", {
// 		y: -200,
// 		delay: 0,
// 		duration: 0.6,
// 		ease: "power1.in",
// 	});
// });

// $('.link_contcts').on('click', function() {
// 	gsap.to($('.gsap_container'), {
// 		x: -windowWidth2,
// 		duration: 1,
// 		ease: "power2.inOut"
// 	});

// 	setTimeout(function () {
// 		$('.header').removeClass('project');
// 	}, 400);

// 	gsap.to(".main-logo", {
// 		y: 0,
// 		delay: 0,
// 		duration: 0.7,
// 		ease: "power1.in",
// 	});
// });

// $('.link_about').on('click', function() {
// 	gsap.to($('.gsap_container'), {
// 		x: -windowWidth3,
// 		duration: 1,
// 		ease: "power2.inOut"
// 	});

// 	setTimeout(function () {
// 		$('.header').removeClass('project');
// 	}, 400);

// 	gsap.to(".main-logo", {
// 		y: -200,
// 		delay: 0,
// 		duration: 0.6,
// 		ease: "power1.in",
// 	});
// });
// !

$(document).ready(function () {
	// Главная
	gsap.to('.main-logo', {
		y: 0,
		scale: 1,
		delay: 2.7,
		duration: 0.8,
		ease: 'power3.in',
		onComplete: function () {},
	})

	var windowHeight = $(window).height()
	gsap.to('.preloader_white', {
		y: -windowHeight,
		duration: 1.5,
		delay: 0,
		ease: 'power3.inOut',
		onComplete: function () {
			$('.site-content').fadeIn()
			loader()
		},
	})

	gsap.to('.preloader_black', {
		y: -windowHeight,
		duration: 0.6,
		delay: 2.1,
		ease: 'power1.in',
		onComplete: function () {},
	})
})

function loader() {
	/* SLIDER */
	const ticketPrev = document.querySelector('.section-slider')
	const tickets = document.querySelectorAll('.section-slider__ticket')
	const paginationContainer = document.querySelector('.pagination')

	let current = 0

	tickets.forEach((ticket, index) => {
		let ticketOrder = (current + index) % tickets.length
		gsap.set(ticket, {
			zIndex: ticketOrder,
			opacity: 1 - 0.4 * (tickets.length - ticketOrder - 1),
			scale: 1 - 0.08 * (tickets.length - ticketOrder - 1),
			yPercent: 0 + 7 * (tickets.length - ticketOrder - 1),
		})
	})

	const animation = function (ticketNumber) {
		current_ticket = 5 - ticketNumber
		if (ticketNumber == 0) {
			current_ticket = 0
		}
		const activeTicket = tickets[current_ticket]
		gsap.set(activeTicket, {
			zIndex: 10,
		})
		gsap.to(activeTicket, {
			duration: 0.65,
			yPercent: -100,
			opacity: 0,
			ease: 'power1.in',
		})

		tickets.forEach((ticket, index) => {
			let ticketOrder = (ticketNumber + index) % tickets.length
			if (current_ticket != index) {
				gsap.to(ticket, {
					zIndex: ticketOrder,
					opacity: 1 - 0.4 * (tickets.length - ticketOrder - 1),
					scale: 1 - 0.08 * (tickets.length - ticketOrder - 1),
					yPercent: 0 + 7 * (tickets.length - ticketOrder - 1),
				})
			} else {
				setTimeout(() => {
					gsap.to(ticket, {
						zIndex: ticketOrder,
						scale: 1 - 0.08 * (tickets.length - ticketOrder - 1),
						yPercent: 0 + 7 * (tickets.length - ticketOrder - 1),
					})
				}, 1000)

				setTimeout(() => {
					gsap.to(ticket, {
						opacity: 1 - 0.4 * (tickets.length - ticketOrder - 1),
					})
				}, 1500)
			}
		})
	}

	tickets.forEach((ticket, index) => {
		const button = document.createElement('div')
		button.classList.add('pagination__button')
		button.dataset.index = index
		button.addEventListener('click', event => {
			event.stopPropagation()
			current = index
			animation(current)
			updatePagination()
		})
		paginationContainer.appendChild(button)
	})

	const updatePagination = () => {
		document
			.querySelectorAll('.pagination__button')
			.forEach((button, index) => {
				button.classList.toggle('active', index === current)
			})
	}

	tickets.forEach(ticket => {
		ticket.addEventListener('click', function () {
			current = (current + 1) % tickets.length
			animation(current)
			updatePagination()
		})
	})

	updatePagination()

	/* SCROLL */
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

	const sections = gsap.utils.toArray('.section')
	const $container = $('.container_gsap')
	let currentIndex = 0
	let isAnimating = false

	function goToSection(index) {
		if (isAnimating || index === currentIndex) return

		let perem = -index * innerHeight
		let perem_count = -5 * innerHeight
		if (perem > perem_count && 0 >= perem) {
			isAnimating = true

			index = Math.max(0, Math.min(index, sections.length - 1))
			currentIndex = index

			gsap.to($container, {
				y: perem,
				duration: 1,
				ease: 'power1.out',
				onComplete: () => {
					isAnimating = false
				},
			})

			if (index != 0) {
				gsap.to('.main-logo', {
					y: -150,
					duration: 0.6,
					ease: 'power3.out',
				})
			} else {
				gsap.to('.main-logo', {
					y: 0,
					duration: 0.6,
					ease: 'power3.out',
				})
			}
		}
	}

	ScrollTrigger.create({
		trigger: $container[0],
		start: 'top top',
		end: () => '+=' + sections.length * innerHeight,
		pin: true,
		pinSpacing: false,
		scrub: 1,
		onUpdate: self => {
			if (!isAnimating) {
				const newIndex = Math.round(self.scroll() / innerHeight)
				console.log(newIndex)
				if (newIndex !== currentIndex) {
					currentIndex = newIndex
					console.log('Current Index:', currentIndex)
				}
			}
		},
	})

	function handleWheel(event) {
		if (isAnimating) return

		const delta = Math.sign(event.deltaY)
		if (delta > 0) {
			goToSection(currentIndex + 1)
		} else if (delta < 0) {
			goToSection(currentIndex - 1)
		}
	}

	window.addEventListener('wheel', event => {
		if (isAnimating) return

		handleWheel(event)
		setTimeout(() => {
			isAnimating = false
		}, 1000)
	})
}
// prj scroll
function smoothScrollToProject(index) {
	const sections = gsap.utils.toArray('.projects-item')
	const $container = $('.section-projects')
	let currentIndex = 0
	let isAnimating = false

	function goToProject(index) {
		if (isAnimating || index === currentIndex) return

		const perem = -index * window.innerHeight
		const perem_count = -5 * window.innerHeight
		if (perem > perem_count && 0 >= perem) {
			isAnimating = true

			index = Math.max(0, Math.min(index, sections.length - 1))
			currentIndex = index

			gsap.to($container, {
				y: perem,
				duration: 1,
				ease: 'power1.out',
				onComplete: () => {
					isAnimating = false
				},
			})

			gsap.to('.main-logo', {
				y: index !== 0 ? -150 : 0,
				duration: 0.6,
				ease: 'power3.out',
			})
		}
	}

	ScrollTrigger.create({
		trigger: $container[0],
		start: 'top top',
		end: () => `+=${sections.length * window.innerHeight}`,
		pin: true,
		pinSpacing: false,
		scrub: 1,
		onUpdate: self => {
			if (!isAnimating) {
				const newIndex = Math.round(self.scroll() / window.innerHeight)
				console.log('Current Index:', newIndex)
				if (newIndex !== currentIndex) {
					currentIndex = newIndex
				}
			}
		},
	})

	function handleWheel(event) {
		if (isAnimating) return

		const delta = Math.sign(event.deltaY)
		if (delta > 0) {
			goToProject(currentIndex + 0.75)
		} else if (delta <= 0) {
			goToProject(currentIndex - 0.75)
		}
	}

	window.addEventListener('wheel', event => {
		if (isAnimating) return

		handleWheel(event)
		setTimeout(() => {
			isAnimating = false
		}, 200)
	})
}
smoothScrollToProject()
// about

function smoothScrollToAbout(index) {
	const sections = gsap.utils.toArray('.test')
	const $container = $('.about__container')
	let currentIndex = 0
	let isAnimating = false

	function goToAbout(index) {
		if (isAnimating || index === currentIndex) return

		const perem = -index * window.innerHeight
		const perem_count = -6 * window.innerHeight
		if (perem > perem_count && 0 >= perem) {
			isAnimating = true

			index = Math.max(0, Math.min(index, sections.length - 1))
			currentIndex = index

			gsap.to($container, {
				y: perem,
				duration: 1,
				ease: 'power1.out',
				onComplete: () => {
					isAnimating = false
				},
			})

			gsap.to('.main-logo', {
				y: index !== 0 ? -150 : 0,
				duration: 0.6,
				ease: 'power3.out',
			})
		}
	}

	ScrollTrigger.create({
		trigger: $container[0],
		start: 'top top',
		end: () => `+=${sections.length * window.innerHeight}`,
		pin: true,
		pinSpacing: false,
		scrub: 1,
		onUpdate: self => {
			if (!isAnimating) {
				const newIndex = Math.round(self.scroll() / window.innerHeight)
				if (newIndex !== currentIndex) {
					currentIndex = newIndex
				}
			}
		},
	})

	function handleWheel(event) {
		if (isAnimating) return

		const delta = Math.sign(event.deltaY)
		if (delta > 0) {
			goToAbout(currentIndex + 1)
		} else if (delta <= 0) {
			goToAbout(currentIndex - 1)
		}
	}

	window.addEventListener('wheel', event => {
		if (isAnimating) return

		handleWheel(event)
		setTimeout(() => {
			isAnimating = false
		}, 1000)
	})
}
smoothScrollToAbout()

// О НАС

const swiper_awards = new Swiper('.section-awards__swiper', {
	slidesPerView: 'auto',
	spaceBetween: 50,
})

// ПРОЕКТЫ

$('.projects-item__button').on('click', function () {
	let projects__y = 500
	if (windowWidth < 840) {
		projects__y = 300
	}

	let projects__img = $(this)
		.parents('.projects-item')
		.children('.projects-item__img')
	let projects__item = $(this).parents('.projects-item')
	let active = projects__item.attr('active')

	if (active == 'true') {
		projects__item.attr('active', 'false')
		gsap.to(projects__item, {
			y: 0,
			duration: 1,
			ease: 'power2.inOut',
		})
		gsap.to(projects__img, {
			opacity: 1,
			duration: 1,
			ease: 'power2.inOut',
		})
	} else {
		projects__item.attr('active', 'true')
		gsap.to(projects__item, {
			y: -projects__y,
			duration: 1,
			ease: 'power2.inOut',
		})
		gsap.to(projects__img, {
			opacity: 0,
			duration: 1,
			ease: 'power2.inOut',
		})
	}
})

var originalPosition = {}
var originalContainerSize = {}
var originalItemsPosition = []
var $animatingItem = null
var isAnimating = false

$('.projects-item').click(function () {
	if (isAnimating || $(this).hasClass('active')) return

	$('.page-project').css({
		overflow: 'hidden',
	})

	$(this).addClass('active')

	if (windowWidth > 840) {
		gsap.to($('.header__menu'), {
			right: 0,
			duration: 0.5,
			opacity: 0,
			ease: 'power2.inOut',
		})

		gsap.to($('.header__icon svg'), {
			left: 0,
			duration: 0.4,
			opacity: 1,
			delay: 0.6,
			ease: 'power2.inOut',
		})

		gsap.to($('.header__background'), {
			left: $(window).width() - 130,
			duration: .5,
			width: 70,
			ease: 'power2.inOut',
		})

		gsap.to($('.header__blur'), {
			left: $(window).width() - 130,
			duration: 1,
			width: 70,
			ease: 'power2.inOut',
		})

		$('.header__menu').css({
			visibility: 'hidden',
		})

		$('.header__back').css({
			visibility: 'hidden',
		})
	}

	isAnimating = true
	$animatingItem = $(this)

	/* Получаем контейнер */
	var $container = $animatingItem.closest('.section-projects__items')
	var $items = $container.find('.projects-item')

	/* Получаем начальные позиции и размеры относительно контейнера */
	var itemOffset = $animatingItem.position()
	var itemWidth = $animatingItem.width()
	var itemHeight = $animatingItem.height()
	var containerOffset = $container.offset()
	var containerWidth = $container.width()
	var containerHeight = $container.height()

	/* Сохраняем исходные данные */
	originalPosition = {
		top: itemOffset.top,
		left: itemOffset.left,
		width: itemWidth,
		height: itemHeight,
	}

	originalContainerSize = {
		width: containerWidth,
		height: containerHeight,
	}

	$items.each(function (index, item) {
		var $item = $(item)
		var position = $item.position()
		originalItemsPosition.push({
			top: position.top,
			left: position.left,
			width: $item.width(),
			height: $item.height(),
		})
	})

	/* Показываем прозрачный фон */
	$('.animate-background')
		.addClass('active')
		.css('background-color', 'rgba(255, 255, 255, 0.5)')

	/* Добавляем класс для z-index */
	$animatingItem.addClass('is-animating').css('z-index', 1000)

	/* Анимируем каждый элемент в новом масштабе */
	var scaleFactor = 3.5
	$items.each(function (index, item) {
		var $item = $(item)
		var newTop =
			(originalItemsPosition[index].top -
				originalPosition.top +
				(containerHeight / 2 - itemHeight / 2)) *
			scaleFactor
		var newLeft =
			originalItemsPosition[index].left * scaleFactor -
			originalPosition.left * scaleFactor +
			(containerWidth / 2 - (itemWidth / 2) * scaleFactor)

		gsap.to($item, {
			duration: 1,
			top: newTop,
			left: newLeft,
			width: originalItemsPosition[index].width * scaleFactor,
			height: originalItemsPosition[index].height * scaleFactor,
			ease: 'power2.inOut',
		})
	})

	var height_final = 500
	var width_final = originalPosition.width * scaleFactor
	var left_final =
		containerWidth / 2 - (originalPosition.width / 2) * scaleFactor

	if (windowWidth < 840) {
		height_final = 300
		width_final = 300
		left_final = (height_final - (originalPosition.width / 2) * scaleFactor) / 2
	}

	/* Анимируем выбранный элемент в центр экрана без изменения пропорций */
	gsap.to($animatingItem, {
		duration: 1,
		top: 0 /* (containerHeight / 2 - originalPosition.height / 2) * scaleFactor */,
		left: left_final,
		width: width_final,
		height: height_final,
		ease: 'power2.inOut',
		onComplete: function () {
			isAnimating = false
		},
	})

	gsap.to($animatingItem.find('.projects-item__title'), {
		scale: 1.5,
		duration: 0.6,
		ease: 'power2.inOut',
	})

	gsap.to($animatingItem.find('.projects-item__text'), {
		opacity: 1,
		duration: 0.5,
		delay: 0.5,
		ease: 'power2.inOut',
	})
})

function project() {
	if (isAnimating || !$animatingItem) return

	$('.page-project').css({
		overflow: 'scroll',
	})

	isAnimating = true
	$('.animate-background').removeClass('active').css('background-color', '')

	var $container = $animatingItem.closest('.section-projects__items')
	var $items = $container.find('.projects-item')

	$($animatingItem).removeClass('active')

	let projects__img = $($animatingItem).children('.projects-item__img')
	let active = $($animatingItem).attr('active')
	if (active == 'true') {
		$($animatingItem).attr('active', 'false')
		gsap.to($animatingItem, {
			y: 0,
			duration: 1,
			ease: 'power2.inOut',
		})
		gsap.to(projects__img, {
			opacity: 1,
			duration: 1,
			ease: 'power2.inOut',
		})
	}

	/* Анимируем элемент обратно в исходное положение */
	gsap.to($animatingItem, {
		duration: 1,
		top: originalPosition.top,
		left: originalPosition.left,
		width: originalPosition.width,
		height: originalPosition.height,
		ease: 'power2.inOut',
	})

	gsap.to($animatingItem.find('.projects-item__title'), {
		scale: 1,
		duration: 1,
		ease: 'power2.inOut',
	})

	gsap.to($animatingItem.find('.projects-item__text'), {
		opacity: 0,
		duration: 0.5,
		ease: 'power2.inOut',
	})

	/* Анимируем каждый элемент обратно в исходное положение */
	$items.each(function (index, item) {
		var $item = $(item)

		gsap.to($item, {
			duration: 1,
			top: originalItemsPosition[index].top,
			left: originalItemsPosition[index].left,
			width: originalItemsPosition[index].width,
			height: originalItemsPosition[index].height,
			ease: 'power2.inOut',
		})
	})

	/* Анимируем контейнер обратно в исходный размер */
	gsap.to($container, {
		duration: 1,
		scale: 1,
		ease: 'power2.inOut',
		onComplete: function () {
			/* Убираем абсолютное позиционирование и класс */
			$animatingItem.removeClass('is-animating').css('z-index', '')

			/* Сбрасываем переменные */
			$animatingItem = null
			isAnimating = false
		},
	})
}

/* Клик по прозрачному фону для возврата */
$('.animate-background').click(function () {
	project()
})

$('.project-menu__search').click(function () {
	$(this).addClass('active')
	event.stopPropagation()
})

$(document).click(function (event) {
	if (!$(event.target).closest('.project-menu__search').length) {
		$('.project-menu__search').removeClass('active')
	}
})

/* ФИЛЬТР */

$(document).ready(function () {
	const allCheckbox = $('#all')
	const filters = $('.project-menu__li')
	const items = $('.projects-item')
	const itemsContainer = $('.section-projects__items')

	function updateFilters() {
		/* Получаем выбранные категории */
		const classes = filters
			.filter('.active')
			.not('#all')
			.map(function () {
				return '.' + this.id
			})
			.get()

		/* Фильтруем элементы в соответствии с выбранными категориями */
		const matches = classes.length
			? items.filter(function () {
					return classes.some(cls => $(this).hasClass(cls.slice(1)))
			  })
			: items

		/* Получаем текущие прямоугольники элементов и контейнера */
		const currentRects = items.map(function () {
			return $(this).get(0).getBoundingClientRect()
		})
		const containerRect = itemsContainer.get(0).getBoundingClientRect()

		/* Устанавливаем позицию элементов перед анимацией */
		items.each(function (index) {
			const currentRect = currentRects[index]
			$(this).css({
				position: 'absolute',
				top: currentRect.top - containerRect.top + 'px',
				left: currentRect.left - containerRect.left + 'px',
			})
		})

		let itemsPerRow = 3
		let gapSize = 160

		if (windowWidth < 1300) {
			itemsPerRow = 2
		}

		if (windowWidth < 840) {
			itemsPerRow = 2
			gapSize = 60
		}

		/* Применяем анимацию для соответствующих элементов */
		matches.each(function (index) {
			const row = Math.floor(index / itemsPerRow)
			const col = index % itemsPerRow
			const x = col * ($(this).outerWidth() + gapSize)
			const y = row * ($(this).outerHeight() + gapSize)

			gsap.to(this, {
				top: y + 'px',
				left: x + 'px',
				opacity: 1,
				scale: 1,
				duration: 0.5,
			})
		})

		/* Применяем анимацию для неподходящих элементов */
		items.not(matches).each(function () {
			gsap.to(this, {
				opacity: 0,
				scale: 0.5,
				duration: 0.5,
				onComplete: () => {},
			})
		})
	}

	/* Обработчики событий для фильтров */
	filters.on('click', function () {
		$('.project-menu__li').removeClass('active')
		$(this).addClass('active')

		if (!$(this).is('#all')) {
			allCheckbox.removeClass('active')
		}
		updateFilters()
		project()
	})

	/* Вызываем функцию updateFilters после загрузки страницы для установки начального состояния */
	$(window).on('load', function () {
		const containerRect = itemsContainer.get(0).getBoundingClientRect()
		items.each(function () {
			const rect = $(this).get(0).getBoundingClientRect()
			$(this).css({
				position: 'absolute',
				top: rect.top - containerRect.top + 'px',
				left: rect.left - containerRect.left + 'px',
			})
		})
		updateFilters()
	})
})

// const $container_project = $(".page-project");

// gsap.to($container_project, {
// 	y: () => -(document.documentElement.scrollHeight - window.innerHeight),
// 	ease: "power1.out",
// 	scrollTrigger: {
// 		trigger: $container_project[0],
// 		start: "top top",
// 		scrub: 2,
// 		pin: true,
// 		anticipatePin: 1,
// 		pinSpacing: false,
// 	}
// });

// const $container_about = $(".page-about");

// gsap.to($container_about, {
// 	y: () => -(document.documentElement.scrollHeight - window.innerHeight),
// 	ease: "power1.out",
// 	scrollTrigger: {
// 		trigger: $container_about[0],
// 		start: "top top",
// 		scrub: 2,
// 		pin: true,
// 		anticipatePin: 1,
// 		pinSpacing: false,
// 	}
// });
