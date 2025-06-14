
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuContent = document.querySelector('.mobile-menu-content');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  mobileMenuBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    mobileMenuContent.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  mobileMenuClose.addEventListener('click', function () {
    mobileMenuBtn.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    mobileMenuContent.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  mobileMenuOverlay.addEventListener('click', function () {
    mobileMenuBtn.classList.remove('active');
    this.classList.remove('active');
    mobileMenuContent.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const phoneForm = document.getElementById('phoneForm');
  const phoneInput = document.getElementById('phone');
  const phoneError = document.getElementById('phoneError');

  // Маска для телефона
  phoneInput.addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : '+' + x[1] + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
  });

  // Валидация формы
  phoneForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Российские номера: +7 и начинается с 9, 10 цифр после +7
    const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

    if (!phoneRegex.test(phoneInput.value)) {
      phoneError.style.display = 'block';
      phoneInput.style.borderColor = '#dc3545';
    } else {
      phoneError.style.display = 'none';
      phoneInput.style.borderColor = '#28a745';

      // Здесь можно отправить форму на сервер
      console.log('Номер телефона принят:', phoneInput.value);
      alert('Спасибо! Ваша скидка 5% активирована. Мы скоро свяжемся с вами по номеру ' + phoneInput.value);

      // Очистка формы
      phoneForm.reset();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.dots');

  let currentIndex = 0;
  let slidesToShow = getSlidesToShow();

  // Создаем точки навигации
  function createDots() {
    dotsContainer.innerHTML = '';
    const dotsCount = slides.length - slidesToShow + 1;

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function getSlidesToShow() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function updateSlider() {
    slidesToShow = getSlidesToShow();
    const slideWidth = 100 / slidesToShow;
    const maxIndex = Math.max(slides.length - slidesToShow, 0);

    // Ограничиваем currentIndex
    currentIndex = Math.min(currentIndex, maxIndex);
    currentIndex = Math.max(currentIndex, 0);

    slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    // Обновляем точки
    createDots();
  }

  function nextSlide() {
    const maxIndex = Math.max(slides.length - slidesToShow, 0);
    currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
    updateSlider();
  }

  function prevSlide() {
    const maxIndex = Math.max(slides.length - slidesToShow, 0);
    currentIndex = (currentIndex <= 0) ? maxIndex : currentIndex - 1;
    updateSlider();
  }

  // Обработчики событий
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Ресайз
  window.addEventListener('resize', function () {
    const newSlidesToShow = getSlidesToShow();
    if (newSlidesToShow !== slidesToShow) {
      slidesToShow = newSlidesToShow;
      updateSlider();
    }
  });

  // Инициализация
  updateSlider();
});
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.compositions__card');
  const priceFromInput = document.getElementById('price-from');
  const priceToInput = document.getElementById('price-to');
  const discountCheckbox = document.getElementById('discount-only');
  const sortSelect = document.getElementById('sort-options');

  // Предположим, что цена у карточек хранится в data-price
  // Обновим HTML карточек, добавив data-price
  // Например:
  // <div class="categories__card compositions__card" data-price="1450">

  function filterCards() {
    const minPrice = parseFloat(priceFromInput.value) || 0;
    const maxPrice = parseFloat(priceToInput.value) || Infinity;
    const discountOnly = discountCheckbox.checked;

    cards.forEach(card => {
      const priceStr = card.querySelector('.card__price').textContent.trim();
      const priceNum = parseFloat(priceStr.replace(/[^\d]/g, ''));
      const hasDiscount = card.querySelector('.card__discount').textContent.trim() !== '';

      // Фильтр по цене
      const inPriceRange = priceNum >= minPrice && priceNum <= maxPrice;

      // Фильтр по скидке
      const showDiscountOnly = discountOnly ? hasDiscount : true;

      if (inPriceRange && showDiscountOnly) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function sortCards() {
    const option = sortSelect.value;
    const container = document.querySelector('.categories__cards');

    // Создаем массив карточек для сортировки
    const cardsArray = Array.from(cards);

    switch (option) {
      case 'price-asc':
        cardsArray.sort((a, b) => {
          return parseFloat(a.querySelector('.card__price').textContent.replace(/[^\d]/g, '')) -
            parseFloat(b.querySelector('.card__price').textContent.replace(/[^\d]/g, ''));
        });
        break;
      case 'price-desc':
        cardsArray.sort((a, b) => {
          return parseFloat(b.querySelector('.card__price').textContent.replace(/[^\d]/g, '')) -
            parseFloat(a.querySelector('.card__price').textContent.replace(/[^\d]/g, ''));
        });
        break;
      case 'popularity':
        // Предположим, есть атрибут data-popularity или подобное
        // Для примера сортируем по убыванию или возрастанию
        // Если данных нет — оставить без сортировки
        break;
      default:
        // по умолчанию — исходный порядок
        break;
    }

    // Очистка контейнера и вставка отсортированных карточек
    container.innerHTML = '';
    cardsArray.forEach(card => container.appendChild(card));
  }

  // Обработчики событий
  priceFromInput.addEventListener('input', filterCards);
  priceToInput.addEventListener('input', filterCards);
  discountCheckbox.addEventListener('change', filterCards);
  sortSelect.addEventListener('change', () => {
    filterCards(); // сначала фильтруем, потом сортируем
    sortCards();
  });

});

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.compositions__card');

  cards.forEach(card => {
    const notification = card.querySelector('.cart-notification');

    card.addEventListener('click', function () {
      notification.classList.add('show');

      setTimeout(() => {
        notification.classList.remove('show');
      }, 2000);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // 1. Инициализация элементов
  const cartCard = document.querySelector('.cart__card');
  const quantityInput = document.querySelector('.quantity-input');
  const minusBtn = document.querySelector('.minus');
  const plusBtn = document.querySelector('.plus');
  const removeBtn = document.querySelector('.remove-btn');
  const totalQuantityEl = document.querySelector('.total-quantity');
  const totalSumEl = document.querySelector('.cart__summary-sum_total');
  const orderForm = document.getElementById('order-form');
  const phoneInput = document.querySelector('.phone-input');

  // 2. Проверка существования элементов
  if (!cartCard || !quantityInput || !totalSumEl) {
    console.error("Не найдены необходимые элементы DOM");
    return;
  }

  // 3. Основные переменные
  const itemPrice = parseInt(cartCard.dataset.price) || 1450;
  let quantity = parseInt(quantityInput.value) || 1;

  // 4. Функция обновления корзины
  const updateCart = () => {
    quantity = Math.max(1, quantity); // Не меньше 1
    quantityInput.value = quantity;

    const totalSum = quantity * itemPrice;
    totalQuantityEl.innerHTML = `${quantity}<span>шт</span>`;
    totalSumEl.innerHTML = `${formatPrice(totalSum)}<span>₽</span>`;
  };

  // 5. Обработчики событий
  minusBtn?.addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    updateCart();
  });

  plusBtn?.addEventListener('click', () => {
    quantity += 1;
    updateCart();
  });

  quantityInput.addEventListener('change', () => {
    quantity = parseInt(quantityInput.value) || 1;
    updateCart();
  });

  removeBtn?.addEventListener('click', () => {
    cartCard.remove();
    document.querySelector('.cart__wrapper').innerHTML = `
            <div class="cart-empty">
                <p>Ваша корзина пуста</p>
                <a href="catalog.html" class="btn">Вернуться в каталог</a>
            </div>
        `;
    updateHeaderCartCounter(0);
  });

  // 6. Валидация формы
  orderForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Удаляем все нецифровые символы для проверки
    const cleanPhone = phoneInput.value.replace(/\D/g, '');

    // Проверяем: начинается с 8 и 11 цифр
    if (!/^8\d{10}$/.test(cleanPhone)) {
      alert('Пожалуйста, введите корректный номер телефона в формате 8XXXXXXXXXX (11 цифр)');
      phoneInput.focus();
      return;
    }

    alert(`Заказ оформлен! Сумма: ${totalSumEl.textContent}\nНомер телефона: ${cleanPhone}`);
    // Здесь должна быть реальная отправка формы
  });

  // 7. Вспомогательные функции
  function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
  }

  function updateHeaderCartCounter(count) {
    const counter = document.querySelector('.header__cart-counter');
    if (counter) counter.textContent = count;
  }

  // 8. Инициализация маски телефона
  phoneInput?.addEventListener('input', function (e) {
    // Удаляем все нецифровые символы
    let value = this.value.replace(/\D/g, '');

    // Если номер не начинается с 8, добавляем 8
    if (value.length > 0 && !value.startsWith('8')) {
      value = '8' + value.replace(/^8/, '');
    }

    // Ограничиваем длину 11 символами
    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    this.value = value;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Получаем все элементы
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainImage');
  const productTitle = document.getElementById('productTitle');
  const productArticul = document.getElementById('productArticul');
  const productPrice = document.querySelector('.compositions__birthday-price');
  const productLastPrice = document.querySelector('.compositions__birthday-last-price');
  const productDiscount = document.querySelector('.compositions__birthday-discount');
  const compositionContainer = document.querySelector('.composition__birthday-compound');
  const addToCartBtn = document.querySelector('.compositions__birthday-btn');
  const choiceButtons = document.querySelectorAll('.choice__btn');

  // Функция для расчета скидки
  function calculateDiscount(price, lastPrice) {
    return Math.round((1 - price / lastPrice) * 100);
  }

  // Функция обновления состава товара
  function updateComposition(compositionData) {
    try {
      const composition = JSON.parse(compositionData);
      let html = '<h4 class="compound__title">Состав</h4>';
      
      composition.forEach(item => {
        html += `
          <p>${item.name}<span>${item.count}</span></p>
        `;
      });
      
      compositionContainer.innerHTML = html;
    } catch (e) {
      console.error('Ошибка при обновлении состава:', e);
      compositionContainer.innerHTML = `
        <h4 class="compound__title">Состав</h4>
        <p>Информация о составе временно недоступна</p>
      `;
    }
  }

  // Функция обновления всей информации о товаре
  function updateProductInfo(thumbnail) {
    // Анимация исчезновения
    productTitle.classList.add('fade-out');
    
    setTimeout(() => {
      // Обновляем основную информацию
      productTitle.textContent = thumbnail.dataset.title || 'Название товара';
      productArticul.textContent = thumbnail.dataset.articul || 'Артикул не указан';
      
      // Обновляем цены и скидку
      const price = thumbnail.dataset.price || '0';
      const lastPrice = thumbnail.dataset.lastprice || price;
      const discount = calculateDiscount(price, lastPrice);
      
      productPrice.innerHTML = `${price}<span class="currency">р</span>`;
      productLastPrice.innerHTML = `${lastPrice}<span class="currency">р</span>`;
      productDiscount.innerHTML = `-${discount}<span class="percent">%</span>`;
      
      // Обновляем состав, если есть данные
      if (thumbnail.dataset.composition) {
        updateComposition(thumbnail.dataset.composition);
      }
      
      // Возвращаем видимость
      productTitle.classList.remove('fade-out');
    }, 200);
  }

  // Обработчик кликов на миниатюры
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      // Удаляем активный класс у всех превью
      thumbnails.forEach(t => t.classList.remove('active'));
      
      // Добавляем активный класс текущему превью
      this.classList.add('active');
      
      // Меняем большое изображение
      mainImage.src = this.dataset.large;
      mainImage.alt = this.dataset.title || 'Изображение товара';
      
      // Обновляем информацию о товаре
      updateProductInfo(this);
    });
  });

  // Обработчики для кнопок выбора типа надува
  choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
      choiceButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Обработчик кнопки "В корзину"
  addToCartBtn.addEventListener('click', function() {
    const activeThumbnail = document.querySelector('.thumbnail.active');
    const selectedInflate = document.querySelector('.choice__btn.active')?.textContent || 'Не указано';
    
    const productData = {
      title: activeThumbnail.dataset.title,
      articul: activeThumbnail.dataset.articul,
      price: activeThumbnail.dataset.price,
      image: activeThumbnail.dataset.large,
      inflate: selectedInflate,
      composition: activeThumbnail.dataset.composition ? 
                  JSON.parse(activeThumbnail.dataset.composition) : []
    };
    
    // Здесь можно добавить логику добавления в корзину
    console.log('Добавлено в корзину:', productData);
    alert(`Товар "${productData.title}" (${selectedInflate}) добавлен в корзину!`);
  });

  // Инициализация первого товара
  const firstThumbnail = document.querySelector('.thumbnail.active');
  if (firstThumbnail) {
    updateProductInfo(firstThumbnail);
    
    // Активируем первую кнопку надува по умолчанию
    if (choiceButtons.length > 0) {
      choiceButtons[0].classList.add('active');
    }
  }
});