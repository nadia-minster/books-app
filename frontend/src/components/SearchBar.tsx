import { FormEvent, useState } from "react"
import { useSearchContext } from "../context/SearchContext"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
    const navigate = useNavigate()
    const search = useSearchContext()

    const [title, setTitle] = useState<string>(search.title)
    const [author, setAuthor] = useState<string>(search.author)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        search.saveSearchValues(title, author)
        navigate("/search")
    }

    return (
        <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-pink-400 rounded shadow-md grid grid-cols-3  items-center gap-5">
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <input placeholder="title" className="text-md w-full focus:outline-none" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <input placeholder="author" className="text-md w-full focus:outline-none" value={author} onChange={(event) => setAuthor(event.target.value)} />
            </div>
            <div className="flex flex-row gap-2">
                <div className="flex flex-row items-center flex-1">
                    <button className="w-full bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">Search</button>
                </div>
                <div className="flex flex-row items-center flex-1">
                    <button className="w-full bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">Clear</button>
                </div>
            </div>
        </form>
    )
}

export default SearchBar