import "express-async-errors"
import express from "express"
import morgan from "morgan"
import * as dotenv from "dotenv"
import JobRouter from "./routes/jobRouter.js"
import UserRouter from "./routes/userRouter.js"
import AuthRouter from "./routes/authRouter.js"
import mongoose from "mongoose"
import errorHandlerMiddleware from "./middleware/ErrorHandlerMiddleware.js"
import { authenticateUser } from "./middleware/AuthMiddleware.js"
import cookieParser from "cookie-parser"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import cloudinary from "cloudinary"

dotenv.config()

const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.static(path.resolve(__dirname, "./public")))
app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/jobs", authenticateUser, JobRouter)
app.use("/api/v1/users", authenticateUser, UserRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"))
})

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" })
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log("server running...")
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
