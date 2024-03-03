import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from '../api-client'
import { BsBook } from "react-icons/bs"
import { BiMoney } from "react-icons/bi"

const MyBooks = () => {
    const { data: bookData } = useQuery("fetchMyBooks", apiClient.fetchMyBooks, {
        onError: () => {

        }
    })

    if (!bookData) {
        return <span>No Books Found</span>
    }

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Books</h1>
                <Link to="/add-book" className="flex bg-green-600 text-white text-xl font-bold p-2 hover:bg-green-500">Add Book</Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {bookData.map((book) => (
                    <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-3">
                        <h2 className="text-2xl font-bold">{book.title}</h2>
                        <h3 className="text-sm font-bold">{book.author}</h3>
                        <div className="whitespace-pre-line">{book.description}</div>
                        <div className="flex items-center ">
                            <div className="p-3 flex items-center">
                                <BiMoney className="mr-2" />
                                ${book.price}
                            </div>
                            <div className="p-3 flex items-center">
                                <BsBook className="mr-2" />
                                {book.genre}
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link className="flex bg-green-600 text-white text-xl font-bold p-2 hover:bg-green-500" to={`/edit-book/${book._id}`}>View Details</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default MyBooks