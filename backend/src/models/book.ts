import mongoose from "mongoose";
import { BookType } from "../shared/types";

const bookSchema = new mongoose.Schema<BookType>({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true }
})

const Book = mongoose.model<BookType>("Book", bookSchema);
export default Book