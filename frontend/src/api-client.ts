import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { BookSearchResponse, BookType } from '../../backend/src/shared/types'


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json()

    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message)
    }
    return body;
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Token invalid")
    }
    return response.json()
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })
    if (!response.ok) {
        throw new Error("Error during sign out")
    }
}

export const addBook = async (bookFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-books`, {
        method: "POST",
        credentials: "include",
        body: bookFormData
    })

    if (!response.ok) {
        throw new Error("Failed to add hotel")
    }
    return response.json()
}

export const fetchMyBooks = async (): Promise<BookType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-books`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Error fetching books")
    }
    return response.json()
}

export const fetchMyBookById = async (bookId: string): Promise<BookType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-books/${bookId}`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Error fetching books")
    }
    return response.json()
}

export const updateMyBookById = async (bookFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-books/${bookFormData.get(`bookId`)}`, {
        method: "PUT",
        body: bookFormData,
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("Failed to update book")
    }
    return response.json()
}

export type SearchParams = {
    title?: string;
    author?: string;
    page?: string;
    genre?: string[];
    maxPrice?: string;
    sortOptions?: string
}

export const searchBooks = async (searchParams: SearchParams): Promise<BookSearchResponse> => {

    const queryParams = new URLSearchParams()

    queryParams.append("title", searchParams.title || "")
    queryParams.append("author", searchParams.author || "")
    queryParams.append("page", searchParams.page || "")

    queryParams.append("maxPrice", searchParams.maxPrice || "")
    queryParams.append("sortOptions", searchParams.sortOptions || "")

    searchParams.genre?.forEach((g) => queryParams.append("genre", g))

    const response = await fetch(`${API_BASE_URL}/api/books/search?${queryParams}`)


    if (!response.ok) {
        throw new Error("Error fetching books")
    }
    return response.json()
}