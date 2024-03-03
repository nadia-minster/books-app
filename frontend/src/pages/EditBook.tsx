import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import CreateBookForm from "../forms/CreateBookForm/CreateBookForm"
import { useAppContext } from "../context/AppContext"


const EditBook = () => {
    const { bookId } = useParams()
    const { showToast } = useAppContext()

    const { data: book } = useQuery("fetchMyBookById", () => apiClient.fetchMyBookById(bookId || ""), {
        enabled: !!bookId
    })

    const { mutate, isLoading } = useMutation(apiClient.updateMyBookById, {
        onSuccess: () => {
            showToast({ message: "Book Saved", type: "SUCCESS" })
        },
        onError: () => {
            showToast({ message: "Error saving Book", type: "ERROR" })
        }
    })

    const handleSave = (bookFormData: FormData) => {
        mutate(bookFormData)
    }

    return <CreateBookForm book={book} onSave={handleSave} isLoading={isLoading} />

}

export default EditBook