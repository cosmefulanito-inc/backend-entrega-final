const socket = io();

socket.on('service:created', (service) => {
  const tbody = document.getElementById('services-list');
  if (!tbody) return; // no estamos en la página de servicios

  document.getElementById('empty-row')?.remove();

  const row = document.createElement('tr');
  const cells = [
    service.name,
    service.description,
    `${service.duration} min`,
    `$${service.price}`,
    service.category,
    service.available ? 'Disponible' : 'No disponible',
  ];

  cells.forEach((text) => {
    const td = document.createElement('td');
    td.textContent = text;
    row.appendChild(td);
  });

  tbody.appendChild(row);
});
const renderBooking = (article, booking) => {
  article.dataset.id = booking._id;
  article.replaceChildren();

  const title = document.createElement('h2');
  title.textContent = booking.clientName;
  article.appendChild(title);

  const lines = [
    `Email: ${booking.clientEmail}`,
    `Fecha: ${booking.date}`,
    `Hora: ${booking.time}`,
    `Estado: ${booking.status}`,
  ];

  lines.forEach((text) => {
    const p = document.createElement('p');
    p.textContent = text;
    article.appendChild(p);
  });
};

socket.on('booking:created', (booking) => {
  const list = document.getElementById('bookings-list');
  if (!list) return; // no estamos en la página de reservas

  document.getElementById('empty-bookings')?.remove();

  const article = document.createElement('article');
  renderBooking(article, booking);
  list.appendChild(article);
});

socket.on('booking:updated', (booking) => {
  const list = document.getElementById('bookings-list');
  if (!list) return; // no estamos en la página de reservas

  const article = list.querySelector(`article[data-id="${booking._id}"]`);
  if (article) renderBooking(article, booking);
});
