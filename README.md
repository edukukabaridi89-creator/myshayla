# Shylaaa Love Website ❤️

A cinematic interactive relationship keepsake designed for Vercel.

## 1. Images

Put your eight pictures inside `/images` with these exact names:

1. `01-introduction.jpg`
2. `02-bible.jpg`
3. `03-partnership.jpg`
4. `04-money.jpg`
5. `05-home-car.jpg`
6. `06-both-keys.jpg`
7. `07-future.jpg`
8. `08-wedding.jpg`

PNG also works because the JavaScript falls back to `.png`.

## 2. GitHub

Create a GitHub repository and upload:

- `index.html`
- `style.css`
- `script.js`
- `vercel.json`
- `api/submit.js`
- `images/`

Do NOT upload a Telegram bot token.

## 3. Vercel

Import the GitHub repository into Vercel.

Add these Environment Variables in Vercel:

`TELEGRAM_BOT_TOKEN` = your Telegram bot token

`TELEGRAM_CHAT_ID` = your private/group/channel chat ID

Then redeploy.

## 4. Telegram

Create your bot with BotFather, add the bot to the target chat, and make sure it has permission to send messages.

The website sends the answers through `/api/submit`, so the bot token stays on the server and is never placed in browser JavaScript.

## Important privacy note

The Telegram endpoint receives the answers and the signature. Anyone who can access the Telegram chat can see what the bot sends there. Only use a chat you trust.

## Customization

Edit the `message` variable and the `questions` array near the top of `script.js`.

The gallery captions are also in `script.js`.

The relationship promises are deliberately written as mutual, healthy commitments rather than ownership rules. You can edit them to reflect agreements you both genuinely choose.
