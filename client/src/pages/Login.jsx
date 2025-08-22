import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from "../components"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post("/auth/login", data)
    toast.success("Login Successful")
    return redirect("/dashboard")
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

const Login = () => {
  const navigation = useNavigate()
  const loginDemoUser = async () => {
    const data = {
      email: "test@gmail.com",
      password: "secret123",
    }
    try {
      await customFetch.post("/auth/login", data)
      toast.success("Login Successful")
      navigation("/dashboard")
    } catch (error) {
      toast.error(error?.response?.data?.message)
      return error
    }
  }

  const navigate = useNavigation()
  const isSubmitting = navigate.state === "submitting"
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type={"email"} name="email" />
        <FormRow type={"password"} name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
export default Login
