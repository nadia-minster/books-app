import express, { Request, Response } from 'express'
import Book from '../models/book'
import { BookSearchResponse } from '../shared/types';

const router = express.Router()

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {}

    if (queryParams.title) {
        constructedQuery.$or = [
            { title: new RegExp(queryParams.title, "i") }
        ]
    }

    if (queryParams.author) {
        constructedQuery.$or = [
            { author: new RegExp(queryParams.author, "i") }
        ]
    }

    if (queryParams.genre) {
        constructedQuery.genre = {
            $in: Array.isArray(queryParams.genre) ? queryParams.genre : [queryParams.genre]
        }
    }

    if (queryParams.maxPrice) {
        constructedQuery.price = {
            $lte: parseInt(queryParams.maxPrice).toString()
        }
    }

    return constructedQuery
}

router.get("/search", async (req: Request, res: Response) => {
    try {
        const query = constructSearchQuery(req.query);

        let sortOptions = {}

        switch (req.query.sortOptions) {
            case "priceAsc":
                sortOptions = { price: 1 }
                break;
            case "priceDesc":
                sortOptions = { price: -1 }
                break;
        }

        console.log(req.query.sortOptions);


        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1")
        const skip = (pageNumber - 1) * pageSize;
        const books = await Book.find(query).sort(sortOptions).skip(skip).limit(pageSize)

        const total = await Book.countDocuments(query)
        const response: BookSearchResponse = {
            data: books,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        }

        res.json(response)
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default router