const STORAGE_KEY = 'bookings';
const TABLES_COUNT = 5;

function loadBookings() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

const form = document.getElementById('booking-form');
const result = document.getElementById('result');
const list = document.getElementById('bookings-list');

function renderBookings() {
  const bookings = loadBookings();
  list.textContent = '';

  if (bookings.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Пока броней нет';
    list.appendChild(empty);
    return;
  }

  bookings.forEach(function (booking) {
    const item = document.createElement('li');
    item.textContent = booking.date + ' ' + booking.time + ' — ' +
      booking.name + ', ' + booking.phone + ', гостей: ' + booking.guests;
    list.appendChild(item);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const booking = {
    name: form.elements.name.value,
    phone: form.elements.phone.value,
    date: form.elements.date.value,
    time: form.elements.time.value,
    guests: form.elements.guests.value
  };

  const bookings = loadBookings();

  const sameTime = bookings.filter(function (b) {
    return b.date === booking.date && b.time === booking.time;
  });

  if (sameTime.length >= TABLES_COUNT) {
    result.textContent = 'На это время все столики заняты. Выберите другое время.';
    return;
  }

  bookings.push(booking);
  saveBookings(bookings);

  result.textContent = 'Бронь сохранена. Всего броней: ' + bookings.length;
  form.reset();
  renderBookings();
});

renderBookings();