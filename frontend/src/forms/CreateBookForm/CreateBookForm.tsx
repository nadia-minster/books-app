import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import GenreSection from "./GenreSection";
import ImagesSection from './ImagesSection'
import { BookType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type BookFormData = {
    title: string;
    author: string;
    description: string;
    pages: number;
    genre: string;
    price: number;
    imageFiles: FileList;
    imageUrls: string[];
}

type Props = {
    onSave: (bookFormData: FormData) => void
    isLoading: boolean
    book?: BookType
}

const CreateBookForm = ({ onSave, isLoading, book }: Props) => {
    const formMethods = useForm<BookFormData>()
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(book)
    }, [book, reset])

    const onSubmit = handleSubmit((formDataJson: BookFormData) => {
        const formData = new FormData()
        if (book) {
            formData.append("bookId", book._id)
        }

        formData.append("title", formDataJson.title)
        formData.append("author", formDataJson.author)
        formData.append("description", formDataJson.description)
        formData.append("price", formDataJson.price.toString())
        formData.append("genre", formDataJson.genre)

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url)
            })
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile)
        })

        onSave(formData)
    })
    return <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection />
            <GenreSection />
            <ImagesSection />
            <span className="flex justify-end">
                <button
                    disabled={isLoading} className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-xl disabled:bg-gray-500" type="submit">
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </span>
        </form>
    </FormProvider>
}

export default CreateBookForm