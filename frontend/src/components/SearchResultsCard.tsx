import { Link } from "react-router-dom"
import { BookType } from "../../../backend/src/shared/types"

type Props = {
    book: BookType
}

const SearchResultCard = ({ book }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px]">
                <img src={book.imageUrls[0]} className="w-full h-full object-cover object-center" />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <Link to={`/detail/${book._id}`} className="text-2xl font-bold cursor-pointer">{book.title}</Link>
                    <h3 className="text-sm font-bold cursor-pointer text-gray-500">{book.author}</h3>
                </div>
                <div>
                    <div className="line-clamp-4">
                        {book.description}...
                    </div>
                </div>
                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                    <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap text-center">{book.genre}</span>
                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">${book.price}</span>
                        <Link to={`/detail/${book._id}`} className="bg-green-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-green-500 text-sm">View More</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SearchResultCard