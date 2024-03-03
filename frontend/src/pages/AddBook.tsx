import { useMutation } from "react-query";
import CreateBookForm from "../forms/CreateBookForm/CreateBookForm";
import { useAppContext } from "../context/AppContext";
import * as apiClient from '../api-client'

const AddBook = () => {
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.addBook, {
        onSuccess: () => {
            showToast({ message: "Book Saved!", type: "SUCCESS" })
        },
        onError: () => {
            showToast({ message: "Error Saving Book", type: "ERROR" })
        }
    })

    const handleSave = (bookFormData: FormData) => {
        mutate(bookFormData)
    }


    return (<CreateBookForm onSave={handleSave} isLoading={isLoading} />)
}

export default AddBook;