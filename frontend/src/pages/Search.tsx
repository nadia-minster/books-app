import { useQuery } from "react-query"
import { useSearchContext } from "../context/SearchContext"
import * as apiClient from '../api-client'
import { useState } from "react"
import SearchResultCard from "../components/SearchResultsCard"
import Pagination from "../components/Pagination"
import BookGenreFilter from "../components/BookGenreFilter"
import PriceFilter from "../components/PriceFilter"

const Search = () => {
    const search = useSearchContext()
    const [page, setPage] = useState<number>(1)
    const [selectedBookGenres, setSelectedBookGenres] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
    const [sortOptions, setSortOptions] = useState<string>("")

    const searchParams = {
        author: search.author,
        title: search.title,
        page: page.toString(),
        genre: selectedBookGenres,
        maxPrice: selectedPrice?.toString(),
        sortOptions
    }

    const { data: bookData } = useQuery(["searchBooks", searchParams], () => apiClient.searchBooks(searchParams))

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const genre = event.target.value;
        setSelectedBookGenres((prevGenres) => event.target.checked ? [...prevGenres, genre] : prevGenres.filter((g) => genre !== g))

    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
                    <BookGenreFilter selectedGenres={selectedBookGenres} onChange={handleGenreChange} />
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{bookData?.pagination.total} Books Found</span>
                    <select value={sortOptions} onChange={(event) => setSortOptions(event.target.value)} className="p-2 border rounded-md">
                        <option value="">Sort By</option>
                        <option value="priceAsc">Price (low to high)</option>
                        <option value="priceDesc">Price (high to low)</option>
                    </select>
                </div>
                {bookData?.data.map((book) => (
                    <SearchResultCard book={book} />
                ))}
                <div>
                    <Pagination page={bookData?.pagination.page || 1} pages={bookData?.pagination.pages || 1} onPageChange={(page) => setPage(page)} />
                </div>
            </div>
        </div>
    )

}

export default Search