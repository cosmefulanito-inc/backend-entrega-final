import * as repository from "../repositories/bookings.repository.js"

export async function getBookings() {
    return repository.getAll()
}

export async function getBookingById(id) {
    return repository.getById(id)
}

export async function createBooking(data) {
    const newBooking = {
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        date: data.date,
        time: data.time,
        status: "pending",
        services: []
    }

    return repository.create(newBooking)
}

export async function addServiceToBooking(bookingId, serviceId, quantity = 1) {
    const booking = await repository.getRawById(bookingId)
    if (!booking) return null

    const services = [...booking.services]
    const existing = services.find((item) => String(item.service) === serviceId)

    if (existing) {
        existing.quantity += quantity // si ya está en la reserva, suma la cantidad
    } else {
        services.push({ service: serviceId, quantity }) // si no está, lo agrega
    }

    return repository.update(bookingId, { services })
}

export async function deleteBooking(id) {
    return repository.remove(id)
}