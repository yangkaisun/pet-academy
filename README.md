# Pet Academy

A tiny, cozy learning game built with Phaser. This first playable version lets a child choose a storybook-realistic dog, cat, or bunny in one of three colors; complete five-question Math and Gym classes; progress through five math levels; earn and spend stars in a prize shop; collect stickers and outfits; and save progress in the browser.

## Play locally

Because this is a static site, serve the folder with any small web server. For example, if Python 3 is installed:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

The Phaser game engine is loaded from a pinned CDN URL, so the first load requires an internet connection.

## Deploy to GitHub Pages

1. Create a GitHub repository and push these files to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. GitHub will show the public game URL after deployment finishes.

No build command, server, database, account, or secret is needed.

## Project files

- `index.html` loads the game.
- `game.js` contains the game state, math class, progression, saving, and Phaser scene.
- `styles.css` contains the interface and responsive layout.
- `PRODUCT_SPEC.md` contains the product direction and planned scope.

## Reset test progress

Open **Settings** from the pet room and choose **Reset all progress**. Progress is stored under `pet-academy-save-v1` in browser `localStorage`.
