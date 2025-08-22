import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
import Wrapper from "../assets/wrappers/PageBtnContainer"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { useAllJobsContext } from "../pages/AllJobs"

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext()
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set("page", pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButton = () => {
    const pageButtons = []
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    )

    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      )
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      )
    }

    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      )
    }

    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      )
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      )
    }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    )
    return pageButtons
  }

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let page = currentPage - 1
          if (page < 1) page = numOfPages
          handlePageChange(page)
        }}
      >
        <HiChevronDoubleLeft />
      </button>
      <div className="btn-container">{renderPageButton()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let page = currentPage + 1
          if (page < 1) page = numOfPages
          handlePageChange(page)
        }}
      >
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
export default PageBtnContainer
