// incremento
import Booking from "../../models/bookings.model.js"

export async function getAll() {
  try {
    const data = await Booking.find().lean()
    return data
  } catch (error) {
        console.error("Error al obtener reservas de MongoDB", error)
        throw error
  }
}

export async function getById(id) {
    try {
        const foundBooking = await Booking.findById(id)
        .populate("services.service") // agrego populate para traer los servicios usando el id de mongo
        .lean()
        
        return foundBooking ?? null

    } catch (error) {
        console.error("Error al obtener reserva por id de MongoDB", error)
        throw error        
    }  
}

export async function create(bookingData) {
    try {
        const newBooking = await Booking.create(bookingData)
        return newBooking.toObject()
    } catch (error) {
        console.error("Error al crear nueva reserva en MongoDB", error)
        throw error        
    }  
}

export async function getRawById(id) {
    try {
        const foundBooking = await Booking.findById(id).lean()
        return foundBooking ?? null
    } catch (error) {
        console.error("Error al obtener reserva por id de MongoDB", error)
        throw error
    }
}

export async function update(id, changes) {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            changes,
            { new: true, runValidators: true }
        ).lean()
        return updatedBooking ?? null
    } catch (error) {
        console.error("Error al modificar reserva en MongoDB", error)
        throw error
    }
}

export async function remove(id) {
    try {
        const removedBooking = await Booking.findByIdAndDelete(id).lean()
         return removedBooking !== null // devuelve true si se pudo eliminar el servicio        
    } catch (error) {
        console.error("Error al internar eliminar reserva en MongoDB", error)
        throw error        
    }
}
