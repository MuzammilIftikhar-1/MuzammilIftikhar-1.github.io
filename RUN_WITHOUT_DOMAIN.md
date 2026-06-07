# Run The Portfolio Without Buying A Domain

You do not need to buy a domain right now. This portfolio is a static website, so it can run in three simple ways.

## Option 1: Show It On Your PC And Phone On The Same Wi-Fi

Use this when you want to test the site on your own phone.

1. Double-click:

```txt
start-localhost.bat
```

2. Keep that black server window open.
3. On your PC or phone, open the `Share URL for PC and Phone`.

Example:

```txt
PC URL: http://127.0.0.1:5173/
Share URL for PC and Phone: http://192.168.1.25:5173/
```

Important:

```txt
127.0.0.1 only works on your own PC.
The Share URL works on your PC and phone.
Your phone and PC must be on the same Wi-Fi.
```

If the Share URL does not open, allow Python through Windows Firewall.

This link is not limited to 1 hour. It works as long as:

```txt
Your PC is turned on.
start-localhost.bat is still running.
Your phone is on the same Wi-Fi.
Your PC IP address has not changed.
```

## Option 2: Give Anyone A Free Public Link

Use this when someone is not on your Wi-Fi.

You can publish without buying a domain by using a free hosting URL:

```txt
GitHub Pages: yourname.github.io/portfolio
Netlify: your-site-name.netlify.app
Vercel: your-site-name.vercel.app
```

Recommended for this project:

```txt
Netlify drag-and-drop
```

Why: this site is already plain HTML, CSS, JavaScript, images, and videos. You can upload the folder and Netlify gives you a free `.netlify.app` link.

What to upload:

```txt
index.html
css/
js/
assets/
```

Do not upload only `index.html`. Upload the whole website folder contents.

## Option 3: Send The Website As A Folder

Use this when someone wants to run it on their own PC without internet hosting.

Send them the full folder:

```txt
C:\Users\PC\Documents\Portfolio Website
```

They can open:

```txt
index.html
```

Some browser features work better through a server, so the better method is:

```txt
Double-click start-localhost.bat
```

Then open:

```txt
http://127.0.0.1:5173/
```

## Best Next Step

For now:

```txt
Use start-localhost.bat for PC and phone testing.
Use Netlify later for a free public URL.
```

You can buy a custom domain later and attach it to the same free-hosted site.
