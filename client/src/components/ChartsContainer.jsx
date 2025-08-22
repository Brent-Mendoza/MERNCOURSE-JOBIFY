import { useState } from "react"
import Wrapper from "../assets/wrappers/ChartsContainer"
import BarChart from "./BarChart"
import AreaChart from "./AreaChart"

const ChartsContainer = ({ data }) => {
  const [barChart, setBarchart] = useState(true)
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarchart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}
export default ChartsContainer
