import ReactPaginate from 'react-paginate'
import { useQueryParams } from '../../hooks/useQueryParams'

import './Pagination.scss'

const Pagination = ({ basePath, totalCount }) => {

    const [queryParams, setQueryParams] = useQueryParams()
    const currentPage = parseInt(queryParams.page || '1')
    const pageCount = Math.ceil(totalCount / 12)

    const handlePageChange = (data) => setQueryParams(basePath, { ...queryParams, page: data.selected + 1 })

    return <ReactPaginate className='pagination' onPageChange={handlePageChange} pageCount={pageCount} forcePage={currentPage - 1}
        pageClassName='pagination__link' nextClassName='pagination__link' previousClassName='pagination__link'/>
}

export default Pagination