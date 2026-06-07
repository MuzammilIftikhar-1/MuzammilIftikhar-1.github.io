window.siteData = {
  // Change your name, short logo text, and main title here.
  person: {
    name: "Muzammil Iftikhar",
    logoText: "MI",
    title: "Game Designer and Developer",
    profileLabel: "Developer Profile",
  },

  // Change fonts here. Use fonts already installed on your system, or a web-safe font stack.
  fonts: {
    body: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'Georgia, "Times New Roman", serif',
  },

  // Main copy shown on the About page.
  about: {
    heading: "Muzammil Iftikhar",
    text:
      "I'm an Unreal Engine developer and designer passionate about creating immersive gameplay and interactive experiences. I specialize in gameplay systems, Blueprint, C++, VR, and UEFN - blending technical depth with creative design to build meaningful worlds players remember.",
    // About portrait controls.
    // Change these values when your real transparent image needs different placement.
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
    intro:
      "My work combines Unreal Engine gameplay development, interaction design, VR systems, multiplayer prototypes, and cinematic presentation into playable experiences that feel clear, responsive, and memorable.",
    sections: [
      {
        title: "Experience",
        text:
          "Almost four years working as an Unreal Engine developer across prototypes, VR experiences, UEFN gameplay loops, interaction systems, and polished portfolio-ready project builds.",
        bullets: [
          "Gameplay systems, prototypes, and interaction design for Unreal Engine projects.",
          "VR-focused development with attention to player comfort, responsiveness, and believable interactions.",
          "UEFN and multiplayer experience design for competitive and social gameplay loops.",
        ],
        work: [
          {
            role: "Unreal Engine Developer",
            company: "Portfolio / Client Projects",
            period: "2021 - Present",
            project: "VR simulator, multiplayer prototypes, UEFN gameplay systems",
            description:
              "Built gameplay features, VR interactions, prototype systems, and cinematic presentation for Unreal Engine portfolio and client-style projects.",
            videoPath: "",
            link: "",
          },
        ],
        open: true,
      },
      {
        title: "Creative Toolkit",
        text:
          "Unreal Engine, Blueprint, C++, C#, Blender, MetaHuman, Photoshop, Illustrator, and Figma.",
        showToolkit: true,
        open: false,
      },
    ],
    toolkit: [
      { key: "unreal", label: "Unreal Engine", iconPath: "assets/icons/Unreal Engine.jpg" },
      { key: "blueprint", label: "Blueprint", iconPath: "assets/icons/blueprint.svg" },
      { key: "cpp", label: "C++", iconPath: "assets/icons/cplusplus.svg" },
      { key: "csharp", label: "C#", icon: "C#" },
      { key: "blender", label: "Blender", icon: "BL" },
      { key: "metahuman", label: "MetaHuman", icon: "MH" },
      { key: "photoshop", label: "Photoshop", icon: "PS" },
      { key: "illustrator", label: "Illustrator", icon: "AI" },
      { key: "figma", label: "Figma", icon: "FG" },
    ],
  },

  // Swap these paths when you add your real image, video, or sound files.
  assets: {
    backgrounds: {
      home: "assets/images/background-home.png",
      about: "assets/images/background-about.png",
      portfolio: "assets/images/background-home.png",
      contact: "assets/images/background-contact.png",
    },
    profileImage: "assets/images/Muzammil Iftikhar.png",
    clickSound: "assets/sounds/click.wav",
  },

  // Edit theme colors here if you want a different palette later.
  theme: {
    defaultTheme: "84cc16",
    colors: {
      blue: "#4d79ff",
      purple: "#8a5cf6",
      amber: "#d99a2b",
      teal: "#18b7a6",
      rose: "#d64f73",
      lime: "#84cc16",
    },
  },

  // Portfolio categories. Add a category here, then use the exact same text in a project's category.
  categories: [
    "All Projects",
    "Unreal Engine Projects",
    "UEFN Projects",
    "Environments",
    "Other Work",
  ],
  defaultCategory: "Unreal Engine Projects",

  // Add your projects here.
  // Use imagePaths for full-screen image slides.
  // Use videoPath + videoAvailable: true when a video file is ready.
  // Optional links can be stored here for your notes, but the current design does not show them.
  projects: [
    {
      title: "VR Simulator",
      category: "Unreal Engine Projects",
      tags: "Unreal Engine | Blueprint | VR",
      description:
        "An immersive VR training simulator built in Unreal Engine, designed for realistic interaction, weapon handling, performance, and next-gen virtual experiences.",
      videoPath: "assets/videos/vr-simulator.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/project-thumbnails/vr-simulator.svg",
      imagePaths: ["assets/images/project-thumbnails/vr-simulator.svg"],
      links: [],
    },
    {
      title: "Multiplayer Parkour Game",
      category: "Unreal Engine Projects",
      tags: "Unreal Engine | Blueprint | Multiplayer | Parkour",
      description:
        "A multiplayer parkour project focused on traversal, movement flow, responsive gameplay, and player interaction.",
      videoPath: "assets/videos/parkour.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/project-thumbnails/parkour.svg",
      imagePaths: ["assets/images/project-thumbnails/parkour.svg"],
      links: [],
    },
    {
      title: "Dungeon Scape",
      category: "Unreal Engine Projects",
      tags: "Unreal Engine | C++ | Dungeon Gameplay",
      description:
        "A C++ Unreal Engine project focused on dungeon-style gameplay, gameplay programming, and code-based system implementation.",
      videoPath: "assets/videos/dungeon-scape.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/project-thumbnails/dungeon-scape.svg",
      imagePaths: ["assets/images/project-thumbnails/dungeon-scape.svg"],
      links: [],
    },
    {
      title: "UEFN Racing",
      category: "UEFN Projects",
      tags: "UEFN | Racing | Multiplayer",
      description:
        "A racing experience built in UEFN with custom tracks, checkpoints, competitive flow, and multiplayer gameplay structure.",
      videoPath: "assets/videos/uefn-racing.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/project-thumbnails/uefn-racing.svg",
      imagePaths: ["assets/images/project-thumbnails/uefn-racing.svg"],
      links: [],
    },
    {
      title: "UEFN 1v1 Ability Arena",
      category: "UEFN Projects",
      tags: "UEFN | Multiplayer | Abilities | In Progress",
      description:
        "A 1v1 ability-based arena project where players use different abilities in a competitive multiplayer environment.",
      videoPath: "assets/videos/uefn-1v1.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/project-thumbnails/uefn-1v1.svg",
      imagePaths: ["assets/images/project-thumbnails/uefn-1v1.svg"],
      links: [],
    },
    {
      title: "Cinematic Environment Study",
      category: "Environments",
      tags: "Unreal Engine | Lighting | Environment Art",
      description:
        "A cinematic environment showcase focused on mood, composition, lighting, and world-building presentation.",
      videoPath: "assets/videos/environment-study.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/project-thumbnails/environment-study.svg",
      imagePaths: ["assets/images/project-thumbnails/environment-study.svg"],
      links: [],
    },
    {
      title: "Gameplay Tools Prototype",
      category: "Other Work",
      tags: "Tools | Systems | Prototype",
      description:
        "A supporting gameplay and tools prototype area for experiments, utilities, and additional technical work.",
      videoPath: "assets/videos/gameplay-tools.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/project-thumbnails/gameplay-tools.svg",
      imagePaths: ["assets/images/project-thumbnails/gameplay-tools.svg"],
      links: [],
    },
  ],

  // Update your contact links here.
  contact: {
    email: "muzammiliftikhar24@gmail.com",
    linkedin: "https://www.linkedin.com/in/muzammili1/",
    github: "https://github.com/MuzammilIftikhar-1",
    links: [
      {
        key: "linkedin",
        icon: "in",
        title: "LinkedIn",
        text: "Connect with me professionally.",
        action: "View Profile",
      },
      {
        key: "github",
        icon: "GH",
        title: "GitHub",
        text: "Explore my code and projects.",
        action: "View Profile",
      },
      {
        key: "email",
        icon: "@",
        title: "Email",
        text: "Get in touch directly.",
        action: "Send Message",
      },
    ],
  },
};
