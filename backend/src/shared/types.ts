export type BookType = {
    _id: string;
    userId: string;
    title: string;
    author: string;
    description: string;
    price: number;
    genre: string;
    imageUrls: string[];
    lastUpdated: Date;
}

export type BookSearchResponse = {
    data: BookType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}