import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/CustomErrors.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new UnauthenticatedError("Authentication Invalid")

  try {
    const { userId, role } = verifyJWT(token)
    const testUser = userId === "68a468265665d6e494a68821"
    req.user = { userId, role, testUser }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid")
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("Unauthorized to acces this role")

    next()
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User, Read Only!")
  next()
}
