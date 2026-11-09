import { Router } from "express"
import { validateBody } from "../middlewares/validateBody.js"
import { createBookingSchema, addServiceToBookingSchema } from "../validation/booking.validation.js"

import {
  ControllerGetAll,
  ControllerCreateBooking,
  ControllerGetBookingById,
  ControllerBookingUpdate,
  ControllerDeleteBooking
} from "../controllers/bookings.controller.js"

const router = Router()

router.get("/", ControllerGetAll)
router.get("/:bid", ControllerGetBookingById)

router.post("/", validateBody(createBookingSchema), ControllerCreateBooking)
router.post("/:bid/services/:sid", validateBody(addServiceToBookingSchema), ControllerBookingUpdate)
router.delete("/:bid", ControllerDeleteBooking)




export default router