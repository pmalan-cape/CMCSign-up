
# Cape Multisport Club — Payment Page

A simple, mobile-friendly page that lets members select products, set quantities, and redirects to your Yoco payment link with the calculated total amount.

## Features
- Four products with images
- Quantity selection (Membership limited to 1)
- Live total and itemized summary
- Optional custom payment reference
- Redirects to: `https://pay.yoco.com/cape-multisport-club?amount=...&reference=...`

## Customize
Edit `script.js` to change prices, product names, and images:
```js
const products = [
  { id: 'membership', name: 'Membership', price: 500.00, img: 'assets/membership.png', max: 1 },
  { id: 'shirt', name: 'Club Shirt', price: 200.00, img: 'assets/shirt.png' },
  { id: 'cap', name: 'Cap', price: 150.00, img: 'assets/cap.png' },
  { id: 'race', name: 'Race Entry', price: 100.00, img: 'assets/race.png' },
];
```

> **Yoco amount format:** If your Yoco link expects **cents** (e.g., 50000 for R500), change:
> ```js
> const amount = total.toFixed(2);
> ```
> to:
> ```js
> const amount = (total * 100).toFixed(0);
> ```

## Deploy on GitHub Pages (free)
1. Create a new GitHub repository (e.g., `capemultisport-payment-page`).
2. Upload the files in this folder, or drag-and-drop the ZIP into the repo.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
5. Set **Branch** to `main` and **Folder** to `/ (root)`.
6. Click **Save**. In ~1 minute you’ll get a URL like:
   `https://YOUR-USERNAME.github.io/capemultisport-payment-page/`

## Testing
- Open `index.html` locally to preview.
- Select quantities and click **Proceed to Payment** to verify redirect behavior.

## Notes
- Replace placeholder images in `assets/` with your real product photos.
- You can style the page further by editing `styles.css`.

---
Made with ❤️ for Cape Multisport Club.
