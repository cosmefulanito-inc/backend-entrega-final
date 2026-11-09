import { Router } from "express"

import {
  ControllerGetServices,
  ControllerGetServiceById,
  ControllerCreateService,
  ControllerUpdateService,
  ControllerDeleteService
} from "../controllers/services.controller.js"

import {validateBody} from "../middlewares/validateBody.js"

import {createServiceSchema, updateServiceSchema} from "../validation/service.validations.js"

const router = Router()

router.get("/", ControllerGetServices)
router.get("/:sid", ControllerGetServiceById)
router.post("/", validateBody(createServiceSchema), ControllerCreateService)
router.put("/:sid", validateBody(updateServiceSchema), ControllerUpdateService)
router.delete("/:sid", ControllerDeleteService)

export default router