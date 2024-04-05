import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryParams } from '../../hooks/useQuery'
import { fetchProducts, fetchProductsByCategory } from '../../reducers/product.reducer'
import { Pagination, ProductCard } from '../../components'

import './CataloguePage.scss'

const CataloguePage = () => {
    const dispatch = useDispatch()
    const { category } = useParams()
    const { products, count, status, error } = useSelector(state => state.product)

    const [searchTerm, setSearchTerm] = useState('')
    const [queryParams, setQueryParams] = useQueryParams()

    const handleSortChange = (e) => setQueryParams(`/catalogue/${category || ''}`, { ...queryParams, sort: e.target.value })
    const handleOrderChange = (e) => setQueryParams(`/catalogue/${category || ''}`, { ...queryParams, order: e.target.value })
    const handleSearchTermChange = (e) => setSearchTerm(e.target.value)

    const filteredProducts = products.filter((product) => 
        searchTerm.length < 3 || product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const { page, sort, order} = queryParams

        if (category) {
            dispatch(fetchProductsByCategory({ category, page, sort, order }))
        }
        else {
            dispatch(fetchProducts({ page, sort, order }))
        }
    }, [dispatch, queryParams, category])

    return <div className='catalogue-page'>
        <div className='filter-bar'>
            <select className='filter-bar__selector' value={queryParams.sort} onChange={handleSortChange} data-test='select-sort'>
                <option value='name'>Name</option>
                <option value='price'>Price</option>
                <option value='created'>Date</option>
            </select>
            <select className='filter-bar__selector' value={queryParams.order} onChange={handleOrderChange} data-test='select-order'>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
            <input className='filter-bar__input' type='text' value={searchTerm}
                placeholder='Search...' onChange={handleSearchTermChange} data-test='input-search'/>
        </div>
        <div className='product-grid'>
            {filteredProducts.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
        <Pagination basePath={`/catalogue/${category || ''}`} totalCount={count}/>
        </div>
}

export default CataloguePage