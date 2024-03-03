import { test, expect } from "@playwright/test"

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

test("Should show book search results", async ({ page }) => {
    await page.goto(UI_URL)

    await page.getByPlaceholder("title").fill("testTitle")
    await page.getByRole("button", { name: "Search" }).click()

    await expect(page.getByText("1 Books Found")).toBeVisible()
})