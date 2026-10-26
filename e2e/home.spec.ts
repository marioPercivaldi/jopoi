import { expect, test } from "@playwright/test";

test("the home page is in Spanish and invites people to donate", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Jopoi");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Doná lo que ya no usás");
  await expect(page.getByRole("button", { name: /Quiero donar/ })).toBeVisible();
});
