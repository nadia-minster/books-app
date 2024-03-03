import { test, expect } from "@playwright/test"
import path from 'path'

const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In" }).click()
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible()

    await page.locator("[name=email]").fill("test@test.com")
    await page.locator("[name=password]").fill("password")

    await page.getByRole("button", { name: "Login" }).click()

    await expect(page.getByText("Sign In Successful!")).toBeVisible()
})

test("should allow user to add a book", async ({ page }) => {
    await page.goto(`${UI_URL}add-book`)

    await page.locator('[name="title"]').fill("Test Book")
    await page.locator('[name="author"]').fill("Test Author")
    await page.locator('[name="description"]').fill("Test description")
    await page.locator('[name="description"]').fill("Test description for the test book.")
    await page.locator('[name="price"]').fill("100")
    await page.getByText("Mystery").click()

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, 'files', "1.jpg"),
        path.join(__dirname, 'files', "2.jpeg"),
    ])

    await page.getByRole('button', { name: "Save" }).click()
    await expect(page.getByText("Book Saved")).toBeVisible()
})

test("should display books", async ({ page }) => {
    await page.goto(`${UI_URL}my-books`)

    await expect(page.getByText("testTitle")).toBeVisible()
    await expect(page.getByText("testAuthor")).toBeVisible()

    await expect(page.getByText("testDescription")).toBeVisible()
    await expect(page.getByText("$95")).toBeVisible()
    await expect(page.getByText("Thriller")).toBeVisible()

    await expect(page.getByRole("link", { name: "View Details" }).nth(1)).toBeVisible()
    await expect(page.getByRole("link", { name: "Add Book" })).toBeVisible()

})


test("should edit book", async ({ page }) => {
    await page.goto(`${UI_URL}my-books`)
    await page.getByRole("link", { name: "View Details" }).first().click()

    await page.waitForSelector('[name=title]', { state: "attached" })
    await expect(page.locator('[name=title]')).toHaveValue("testTitle")
    await page.locator('[name=title]').fill("testTitle UPDATED")
    await page.getByRole("button", { name: "Save" }).click()

    await expect(page.getByText("Book Saved")).toBeVisible()

    await page.reload()
    await expect(page.locator('[name=title]')).toHaveValue("testTitle UPDATED")
    await page.locator('[name=title]').fill("testTitle")
    await page.getByRole("button", { name: "Save" }).click()

})