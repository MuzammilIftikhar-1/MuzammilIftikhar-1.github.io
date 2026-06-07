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
    text: [
      "I am a Game Developer and Designer with a strong focus on Unreal Engine. I enjoy building gameplay systems that feel responsive, structured, and enjoyable for players. ",
      "My work is mainly focused on gameplay mechanics, AI behavior, multiplayer systems, VR interactions, UI systems, and player-focused features. I like taking an idea from a rough concept and turning it into something playable, polished, and functional inside the engine. ",
      "My work is mainly focused on gameplay mechanics, AI behavior, multiplayer systems, VR interactions, UI systems, and player-focused features. I like taking an idea from a rough concept and turning it into something playable, polished, and functional inside the engine.",
      "As a developer, I care about both the technical side and the player experience. A mechanic should not only work; it should feel right, respond clearly, and support the overall game experience.",
      "I am continuously improving my skills as a gameplay and systems developer, with a long-term goal of working on immersive, engaging, and technically strong games.",
    ].join(" "),
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
          "I design and implement gameplay mechanics, ability systems, interaction logic, combat features, and reusable gameplay frameworks.",
          "I create enemy behavior using Behavior Trees, Blackboards, movement logic, attack selection, and responsive combat systems.",
          "I work on replicated gameplay systems, weapon behavior, loadouts, player data, and server-client consistency.",
          "I build VR interaction systems, weapon handling, attachment logic, and immersive gameplay features with performance in mind.",
          "I focus on clean, modular, and scalable Blueprint systems that are easier to debug, extend, and reuse.",
        ],
        work: [
          {
            role: "Unreal Engine Developer",
            company: "Acedia",
            period: "Dec 2025 - Present",
            project: "Bloodsmith",
            description:
              "At Acedia, I work on gameplay systems using Unreal Engine 5, focusing on Blueprint architecture, ability systems, UI selection mechanics, player interaction logic, and performance-aware implementation. I design modular systems that can be reused and extended across different gameplay features.",
            videoPath: "https://www.youtube.com/watch?v=bxva1wKf99s",
            link: "https://store.steampowered.com/app/3113350/Bloodsmith/",
          },
          {
            role: "Junior Unreal Engine Developer",
            company: "Intelgency IT Solution",
            period: "Feb 2025 - Mar 2026",
            project: "VR Simulator, Multiplayer",
            description:
              "At Intelgency IT Solution, I worked on advanced Unreal Engine systems with a focus on AI, multiplayer replication, VR weapons, and scalable loadout systems. This role helped me understand the importance of clean replication logic, reliable gameplay state, and stable interaction systems in multiplayer VR projects.",
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
      title: "Cinematic Environment",
      category: "Environments",
      tags: "Unreal Engine | Lighting | Environment Art",
      description:
        "A cinematic environment showcase focused on mood, composition, lighting, and world-building presentation.",
      videoPath: "Unreal Engine Enviornment.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/environment-study.svg",
      imagePaths: ["assets/images/project-thumbnails/environment-study.svg"],
      links: [],
    },
    {
      title: "Snowy Mountain Outpost Environment",
      category: "Environments",
      tags: "Unreal Engine Fortnite Editor | Lighting | Environment Art",
      description:
        "A snowy mountain village environment built in Unreal Engine, featuring wooden cabins, watchtowers, frozen terrain, pine forests, rocky cliffs, bridges, fences, and environmental props. The scene focuses on atmosphere, scale, exploration, and strong visual composition, creating the feeling of an isolated winter outpost deep in the mountains..",
      videoPath: "assets/videos/gameplay-tools.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/project-thumbnails/Base2.png",
      imagePaths: ["assets/images/project-thumbnails/Base1.png"],
      imagePaths: ["assets/images/project-thumbnails/Base2.png"],
      imagePaths: ["assets/images/project-thumbnails/Base3.png"],
      imagePaths: ["assets/images/project-thumbnails/Base4.png"],
      imagePaths: ["assets/images/project-thumbnails/Base5.png"],
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
