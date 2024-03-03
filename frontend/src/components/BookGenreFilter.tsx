import { bookTypes } from '../config/book-genres-config'

type Props = {
    selectedGenres: string[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const BookGenreFilter = ({ selectedGenres, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Select Genre</h4>
            {bookTypes.map((genre) => (
                <label className='flex intems-center space-x-2'>
                    <input type='checkbox' className='rounded' value={genre} checked={selectedGenres.includes(genre)} onChange={onChange} />
                    <span>{genre}</span>
                </label>
            ))}
        </div>
    )
}

export default BookGenreFilter