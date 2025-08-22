import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import { Link } from "react-router-dom"
import { Logo } from "../components"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="continer page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby portland four loko, banh mi kale chips humblebrag banjo.
            Poutine brooklyn humblebrag, four loko sartorial skateboard. Poutine
            brooklyn humblebrag, four loko sartorial
          </p>
          <Link to={"/register"} className="btn register-link">
            Register
          </Link>
          <Link to={"/login"} className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
