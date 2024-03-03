import { useFormContext } from "react-hook-form";
import { bookTypes } from "../../config/book-genres-config";
import { BookFormData } from "./CreateBookForm";

const GenreSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<BookFormData>()
    const genreWatch = watch("genre")
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Genre</h2>
            <div className="grid grid-cols-5 gap-2">
                {bookTypes.map((genre, index) => (
                    <label key={index} className={genreWatch === genre ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                        : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"}>
                        <input className="hidden" type="radio" value={genre} {...register("genre", {
                            required: "This field is required",
                        })} />
                        <span>
                            {genre}
                        </span>
                    </label>
                ))}
            </div>
            {errors.genre && (
                <span className="text-red-500 text-sm font-bold">{errors.genre.message}</span>
            )}
        </div>
    )
}

export default GenreSection