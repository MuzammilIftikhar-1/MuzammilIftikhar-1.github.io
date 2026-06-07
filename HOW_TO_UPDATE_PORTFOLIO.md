# How To Update The Portfolio

Most content is edited in `js/data/siteData.js`.

## How Localhost Works

`start-localhost.bat` does not upload anything to the internet. It starts a small local server that reads the files in this folder:

```txt
C:\Users\PC\Documents\Portfolio Website
```

When you change `js/data/siteData.js`, add images, add videos, or edit CSS, localhost shows the updated files after refresh.

Steps:

1. Save your changes.
2. Double-click `start-localhost.bat`.
3. Open:

```txt
http://127.0.0.1:5173/
```

4. Press `Ctrl+F5` in Chrome to hard-refresh.

If you add a new image/video and it does not show, check the file path and capitalization.

To test from your phone, your phone and computer must be on the same Wi-Fi, and the server must be reachable from your computer's LAN IP. `127.0.0.1` only works on the same computer, not on your phone.

## Add A New Category

Add the category name inside `categories`.

```js
categories: [
  "All Projects",
  "Unreal Engine Projects",
  "UEFN Projects",
  "Environments",
  "New Category Name",
],
```

Use the exact same category text in a project:

```js
category: "New Category Name",
```

This is the easiest way to create different portfolio sections, such as:

```txt
Unreal Engine Projects
UEFN Projects
Environment Work
VR Projects
Tools
Client Work
```

Each category becomes selectable from the portfolio category button.

## Add A New Text Section On About

For simple updates, edit the existing About blocks in `js/data/siteData.js`:

```js
about: {
  heading: "Developer Profile",
  text: "Main profile text here.",
  portrait: {
    opacity: 0.42,
    zoom: 1.22,
    rightOffset: "18px",
    topOffset: "38%",
    imageShiftY: "-4%",
    objectPosition: "center center",
  },
  iconSize: 34,
  sliderIconSize: 46,
  stats: [
    { value: 4, suffix: "+", label: "Years Unreal Engine" },
    { value: 12, suffix: "+", label: "Delivered Projects" },
    { value: 16, suffix: "", label: "Years Education" },
  ],
  intro: "Write your creative toolkit intro here.",
  sections: [
    {
      title: "Experience",
      text: "Experience text here.",
      bullets: ["First highlight.", "Second highlight."],
      work: [
        {
          role: "Unreal Engine Developer",
          company: "Company or Client Name",
          period: "2021 - Present",
          project: "Project name or project type",
          description: "Short work description.",
          videoPath: "assets/videos/work-demo.mp4",
          link: "https://your-project-link.com",
        },
      ],
      open: true,
    },
    {
      title: "Creative Toolkit",
      text: "Toolkit text here.",
      showToolkit: true,
      open: false,
    },
  ],
  toolkit: [
    { key: "unreal", label: "Unreal Engine", iconPath: "assets/icons/Unreal Engine.jpg" },
    { key: "blender", label: "Blender", icon: "BL" },
  ],
}
```

The visible About page currently uses:

```txt
heading
text
portrait
stats
sections
toolkit
profileImage
```

## Adjust The About Profile Picture

The About profile picture path is here:

```js
assets: {
  profileImage: "assets/images/Muzammil Iftikhar.png",
}
```

The About profile picture placement is controlled here:

```js
about: {
  portrait: {
    opacity: 0.42,
    zoom: 1.22,
    rightOffset: "18px",
    topOffset: "38%",
    imageShiftY: "-4%",
    objectPosition: "center center",
  },
  iconSize: 34,
  sliderIconSize: 56,
}
```

Use these values:

```txt
opacity        Lower number = more transparent, higher number = more visible.
zoom           Higher number = zoom in, lower number = zoom out.
rightOffset    More negative = move right, less negative or positive = move left.
topOffset      Lower percentage = move up, higher percentage = move down.
imageShiftY    Negative = move the person up inside the image area, positive = move down.
objectPosition Fine-tune the visible part of the image, for example "center top" or "60% center".
sliderIconSize Larger number = larger moving toolkit icons, smaller number = smaller icons.
```

After changing a value, save the file and refresh localhost with `Ctrl+F5`.

## Update About Stats And Dropdowns

The creative stat counters are controlled here:

```js
stats: [
  { value: 4, suffix: "+", label: "Years Unreal Engine" },
  { value: 12, suffix: "+", label: "Delivered Projects" },
  { value: 16, suffix: "", label: "Years Education" },
],
```

`value` must be a number because the website animates from `0` to that number.
Use `suffix: "+"` when you want the plus sign to appear at the end.

The dropdown sections are controlled here:

```js
sections: [
  {
    title: "Experience",
    text: "Write work experience details here.",
    bullets: [
      "First experience highlight.",
      "Second experience highlight.",
    ],
    work: [
      {
        role: "Unreal Engine Developer",
        company: "Company or Client Name",
        period: "2021 - Present",
        project: "Project name or project type",
        description: "Short work description.",
        videoPath: "assets/videos/work-demo.mp4",
        link: "https://your-project-link.com",
      },
    ],
    open: true,
  },
  {
    title: "Creative Toolkit",
    text: "Write toolkit details here.",
    showToolkit: true,
    open: false,
  },
]
```

Set `open: true` if you want that dropdown open when the About page loads.

The moving tool logo strip appears inside the Creative Toolkit dropdown when `showToolkit: true`.
It is controlled by `toolkit`:

```js
toolkit: [
  { key: "unreal", label: "Unreal Engine", iconPath: "assets/icons/Unreal Engine.jpg" },
  { key: "blender", label: "Blender", icon: "BL" },
  { key: "photoshop", label: "Photoshop", icon: "PS" },
]
```

Use `iconPath` when you have a real logo image. Use `icon` for a short text fallback.

## Add Work Experience Videos Or Links

Inside the `Experience` section, add items to `work`:

```js
work: [
  {
    role: "Unreal Engine Developer",
    company: "Company or Client Name",
    period: "2021 - Present",
    project: "Project name",
    description: "What you did on this project.",
    videoPath: "assets/videos/work-demo.mp4",
    link: "https://your-project-link.com",
  },
]
```

Leave `videoPath: ""` if you do not want a video.
Leave `link: ""` if you do not want a project link.

Put work videos in:

```txt
assets/videos/
```

## Update Moving Toolkit Logos

The moving toolkit slider is controlled by `toolkit`:

```js
toolkit: [
  { key: "unreal", label: "Unreal Engine", iconPath: "assets/icons/Unreal Engine.jpg" },
  { key: "blender", label: "Blender", iconPath: "assets/icons/blender.png" },
  { key: "figma", label: "Figma", icon: "FG" },
]
```

Local custom icons live in:

```txt
assets/icons/
```

Use `iconPath` for an image logo.
Use `icon` for short text when you do not have an image yet.

Change slider icon size here:

```js
sliderIconSize: 46,
```

To create a completely new visual section or page, edit `index.html` for the HTML, `css/style.css` for the design, and `js/main.js` if it needs clicking/navigation behavior.

## Change Fonts

Edit `fonts` near the top of `js/data/siteData.js`:

```js
fonts: {
  body: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: 'Georgia, "Times New Roman", serif',
},
```

`body` controls normal text.
`display` controls large headings and profile-style titles.

## Add Images To A Project

Put image files in:

```txt
assets/images/project-thumbnails/
```

Then add them to `imagePaths`:

```js
imagePaths: [
  "assets/images/project-thumbnails/my-project-01.jpg",
  "assets/images/project-thumbnails/my-project-02.jpg",
  "assets/images/project-thumbnails/my-project-03.jpg",
],
```

If `videoAvailable` is `false`, these images will automatically slide in the background.

The slideshow is already set up in `js/main.js`. You only need to add more image paths here. The play/pause button on the portfolio page pauses and resumes the image slideshow.

## Add A Video

Put the video file in:

```txt
assets/videos/
```

Then update the project:

```js
videoPath: "assets/videos/my-project.mp4",
videoAvailable: true,
```

Use `.mp4` for the safest browser support.

## Store A Project Link

The current design does not show project links on the page, because the portfolio should stay clean with just the title, category/tags, and description.

You can still store links in the project data for later:

```js
links: [
  { label: "GitHub", href: "https://github.com/your-profile/project" },
  { label: "Gameplay Video", href: "https://youtube.com/your-video" },
  { label: "Play Build", href: "https://your-link.com" },
],
```

For the current clean design, use:

```js
links: [],
```

## Add A Full New Project

Copy this block inside `projects` and edit it:

```js
{
  title: "My New Project",
  category: "Unreal Engine Projects",
  tags: "Unreal Engine | Blueprint | Multiplayer",
  description:
    "Write the short project description here. Keep it direct and portfolio-ready.",
  videoPath: "assets/videos/my-new-project.mp4",
  videoAvailable: false,
  thumbnailPath: "assets/images/project-thumbnails/my-new-project-01.jpg",
  imagePaths: [
    "assets/images/project-thumbnails/my-new-project-01.jpg",
    "assets/images/project-thumbnails/my-new-project-02.jpg",
  ],
  links: [
    { label: "Project Link", href: "https://your-link.com" },
  ],
},
```

## Update Contact Links

Edit this section in `js/data/siteData.js`:

```js
contact: {
  email: "muzammiliftikhar24@gmail.com",
  linkedin: "https://www.linkedin.com/in/your-profile",
  github: "https://github.com/MuzammilIftikhar-1",
}
```

Example:

```js
contact: {
  email: "muzammiliftikhar24@gmail.com",
  linkedin: "https://www.linkedin.com/in/muzammili1/",
  github: "https://github.com/MuzammilIftikhar-1",
}
```

The LinkedIn, GitHub, and Email cards will redirect to these values automatically.

## Make The Contact Form Send To Your Email

The form currently uses `mailto:`. That means when someone clicks `[ Send Message ]`, their email app opens with:

```txt
Name
Email
Phone Number
Message
```

It will be addressed to the email you set here:

```js
contact: {
  email: "muzammiliftikhar24@gmail.com",
}
```

Important: `mailto:` depends on the visitor having an email app configured. For a fully automatic form that sends without opening an email app, you need a form service or backend after the site is live.

Common no-code services:

```txt
Formspree
Netlify Forms
EmailJS
Getform
```

When you are ready, replace the `mailto:` behavior in `js/main.js` inside:

```js
contactForm.addEventListener("submit", ...)
```

## After Uploading The Site

1. Upload the full folder, including:

```txt
index.html
css/
js/
assets/
HOW_TO_UPDATE_PORTFOLIO.md
```

2. Open the live website URL.

3. Test these things:

```txt
Home buttons
Portfolio previous/next arrows
Portfolio category selector
Image slideshow
LinkedIn link
GitHub link
Email card
Contact form send button
Mobile view
```

4. If a new image/video does not show, check that the path in `js/data/siteData.js` exactly matches the uploaded file name and folder.

## Update Your Profile Image

Put your image in:

```txt
assets/images/
```

Then update:

```js
profileImage: "assets/images/my-profile-photo.jpg",
```

The About page will automatically darken and fade it into the right side.

## Change Theme Colors

Edit the `theme.colors` section in `js/data/siteData.js`:

```js
theme: {
  defaultTheme: "blue",
  colors: {
    blue: "#4d79ff",
    purple: "#8a5cf6",
    amber: "#d99a2b",
    teal: "#18b7a6",
    rose: "#d64f73",
    lime: "#84cc16",
  },
},
```

Use normal hex colors like `#ffffff`, `#ff0055`, or `#18b7a6`.

## Change Fonts

Edit the `fonts` section near the top of `js/data/siteData.js`:

```js
fonts: {
  body: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: 'Georgia, "Times New Roman", serif',
},
```

`body` controls normal text, descriptions, buttons, and forms.
`display` controls large headings like your name and project titles.

Example:

```js
fonts: {
  body: '"Segoe UI", Arial, sans-serif',
  display: '"Times New Roman", Georgia, serif',
},
```
