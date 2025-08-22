import { Router } from "express"
import { login, logout, register } from "../controllers/authController.js"
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/ValidationMiddleware.js"
import rateLimiter from "express-rate-limit"

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: {
    message: "IP rate limit exceeded, retry in 15 minutes.",
  },
})

const router = Router()

router.post("/login", apiLimiter, validateLoginInput, login)

router.post("/register", apiLimiter, validateRegisterInput, register)
router.get("/logout", logout)

export default router
