import React, { useContext, useState } from "react";

type SearchContext = {
    bookId: string;
    title: string;
    author: string;
    saveSearchValues: (title: string, author: string) => void
}

const SearchContext = React.createContext<SearchContext | undefined>(undefined)

type SearchContextProviderProps = {
    children: React.ReactNode
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {

    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [bookId, setBookId] = useState<string>("")

    const saveSearchValues = (title: string, author: string, bookId?: string) => {
        setTitle(title);
        setAuthor(author)
        if (bookId) {
            setBookId(bookId)
        }
    }

    return (
        <SearchContext.Provider value={{ title, author, bookId, saveSearchValues }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext)
    return context as SearchContext
}