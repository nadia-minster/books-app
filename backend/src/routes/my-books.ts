import express, { Request, Response } from 'express'
import cloudinary from 'cloudinary'
import multer from 'multer'
import Book from '../models/book'
import { BookType } from '../shared/types'
import verifyToken from '../middleware/auth'
import { body } from 'express-validator'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

router.post("/", verifyToken, [
    body("title").notEmpty().withMessage('Title is required'),
    body("author").notEmpty().withMessage('Author is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("genre").notEmpty().isArray().withMessage('Genre is required'),
    body("price").notEmpty().isNumeric().withMessage('Price is required and needs to be a number'),
], upload.array("imageFiles", 3), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[]
        const newBook: BookType = req.body;


        const imageUrls = await uploadImages(imageFiles)

        newBook.imageUrls = imageUrls;
        newBook.lastUpdated = new Date();
        newBook.userId = req.userId;

        const book = new Book(newBook)
        await book.save()
        res.status(201).send(book)
    } catch (error) {
        console.log("Error creating book: ", error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const books = await Book.find({ userId: req.userId })
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" })
    }
})

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString()
    try {
        const book = await Book.findOne({
            _id: id,
            userId: req.userId
        })
        res.json(book)
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" })
    }
})

router.put("/:bookId", verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {
    try {
        const updatedBook: BookType = req.body;
        updatedBook.lastUpdated = new Date()
        const book = await Book.findOneAndUpdate({
            _id: req.params.bookId,
            userId: req.userId,
        }, updatedBook, { new: true })
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        const files = req.files as Express.Multer.File[]
        const updatedImageUrls = await uploadImages(files)

        book.imageUrls = [...updatedImageUrls, ...(updatedBook.imageUrls || [])]

        await book.save()
        res.status(201).json(book)

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64")
        let dataURI = "data:" + image.mimetype + ";base64," + b64
        const res = await cloudinary.v2.uploader.upload(dataURI)
        return res.url
    })

    const imageUrls = await Promise.all(uploadPromises)
    return imageUrls
}

export default router
