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
          "Blender, C++, C#, Unity, Unreal Engine, UEFN, Figma, Adobe Photoshop, and Adobe Illustrator.",
        showToolkit: true,
        open: false,
      },
    ],
    toolkit: [
      { key: "blender", label: "Blender", iconPath: "assets/icons/blender.svg" },
      { key: "cpp", label: "C++", iconPath: "assets/icons/cplusplus.svg" },
      { key: "csharp", label: "C#", iconPath: "assets/icons/csharp.svg" },
      { key: "unity", label: "Unity", iconPath: "assets/icons/unity.svg" },
      { key: "unreal", label: "Unreal Engine", iconPath: "assets/icons/unreal-engine.svg" },
      { key: "uefn", label: "UEFN", iconPath: "assets/icons/uefn.svg" },
      { key: "figma", label: "Figma", iconPath: "assets/icons/figma.svg" },
      { key: "photoshop", label: "Adobe Photoshop", iconPath: "assets/icons/photoshop.svg" },
      { key: "illustrator", label: "Adobe Illustrator", iconPath: "assets/icons/illustrator.svg" },
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
      title: "VR Shooting Range",
      category: "Unreal Engine Projects",
      featured: true,
      tags: "Unreal Engine | Blueprint | VR",
      description:
        "A VR shooting range project made in Unreal Engine 5.4. It includes basic weapon handling, shooting mechanics, grenades, and smoke grenades. I focused on making the weapon interaction feel responsive in VR, along with aiming, throwing, and practicing inside a simple shooting range environment using Blueprints.",
      videoPath: "assets/videos/VR Shooting.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/vr_shooting_1.png",
      imagePaths: ["assets/images/project-thumbnails/vr_shooting_1.png"],
      links: [],
    },

      {
      title: "VR Drone Destruction Prototype",
      category: "Unreal Engine Projects",
      tags: "Unreal Engine 5.4 | Blueprints | VR Prototype | Drone Controller | Collision System | Destruction Mechanic | Keyboard Input",
      description:
        "A Kamikaze Drone VR prototype built in Unreal Engine 5.4 using Blueprints. The drone can be controlled through a VR headset and motion controllers or with keyboard keybinds. The core mechanic focuses on drone movement, collision detection, and self-destruction on impact, creating a functional prototype for impact-based drone gameplay.",
      videoPath: "assets/videos/Drone VR Game.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/drone_vr_game_1.png",
      imagePaths: ["assets/images/project-thumbnails/drone_vr_game_1.png"],
      links: [],
    },

    {
      title: "Jump Spirit",
      category: "Unreal Engine Projects",
      tags: "Unreal Engine | Blueprint | Multiplayer | Parkour",
      description:
        "A multiplayer parkour project focused on traversal, movement flow, responsive gameplay, and player interaction.",
      videoPath: "assets/videos/parkour (2).mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/parkour_2_1.png",
      imagePaths: ["assets/images/project-thumbnails/parkour_2_1.png"],
      links: [],
    },
    {
      title: "Dungeon Scape",
      category: "Unreal Engine Projects",
      tags: "Unreal Engine | C++ | Dungeon Gameplay",
      description:
        "A C++ Unreal Engine project focused on dungeon-style gameplay, gameplay programming, and code-based system implementation.",
      videoPath: "assets/videos/Dungeon Escape.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/dungeon_escape_1.png",
      imagePaths: ["assets/images/project-thumbnails/dungeon_escape_1.png"],
      links: [],
    },

     {
      title: "Bot Fight Game",
      category: "Unreal Engine Projects",
      tags: "Unreal Engine | Blueprints | Projectile Combat | Damage System | Enemy Spawning | Dynamic Crosshair | MetaSounds",
      description:
        "A third-person bot fight prototype built in Unreal Engine 5.4, featuring projectile combat, flying enemies, trigger-based enemy spawning, dynamic crosshair feedback, damage logic, impact emitters, and MetaSound experimentation. The project focused on improving gameplay fundamentals, combat pacing, visual feedback, and cleaner Blueprint implementation.",
      videoPath: "assets/videos/Drone .mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/drone__1.png",
      imagePaths: ["assets/images/project-thumbnails/drone__1.png"],
      links: [],
    },

    {
      title: "UEFN Racing",
      category: "UEFN Projects",
      featured: true,
      tags: "UEFN | Racing | Multiplayer",
      description:
        "A racing experience built in UEFN with custom tracks, checkpoints, competitive flow, and multiplayer gameplay structure.",
      videoPath: "assets/videos/uefn-racing.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/uefn-racing_1.png",
      imagePaths: ["assets/images/project-thumbnails/uefn-racing_1.png"],
      links: [],
    },

    {
      title: "UEFN 1v1 Ability Arena",
      category: "UEFN Projects",
      tags: "UEFN | Multiplayer | Abilities | In Progress",
      description:
        "A 1v1 ability-based arena project where players use different abilities in a competitive multiplayer environment.",
      videoPath: "assets/videos/uefn1-1v.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/uefn1-1v_1.png",
      imagePaths: ["assets/images/project-thumbnails/uefn1-1v_1.png"],
      links: [],
    },

    {
      title: "4v4 Box Fight Game",
      category: "UEFN Projects",
      tags: "UEFN | Fortnite Creative | Box Fight | Multiplayer | Level Design | Item Spawners | Timers | Barrier System",
      description:
        "A competitive 4v4 box fight game built in UEFN, featuring team-based gameplay, arena barriers, item spawners, hub controllers, start timers, and structured match flow. The project focused on multiplayer level design, device-based logic, player flow, and creating a complete competitive Fortnite Creative experience.",
      videoPath: "assets/videos/UEFN 4V4.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/uefn_4v4_1.png",
      imagePaths: ["assets/images/project-thumbnails/uefn_4v4_1.png"],
      links: [],
    },

     {
      title: "Fall Guys Style Obstacle Game",
      category: "UEFN Projects",
      tags: "UEFN | Fortnite Creative | Level Design | Obstacle Course | Platforming | Player Flow | Gameplay Prototype",
      description:
        "A Fall Guys-inspired obstacle course game built in UEFN, featuring timing-based challenges, platforming obstacles, player navigation, and competitive race-style gameplay. The project focused on level design, player flow, obstacle placement, pacing, and creating a fun playable experience.",
      videoPath: "assets/videos/fallguys.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/fallguys_1.png",
      imagePaths: ["assets/images/project-thumbnails/fallguys_1.png"],
      links: [],
    },

    {
      title: "Cinematic Environment",
      category: "Environments",
      featured: true,
      tags: "Unreal Engine | Lighting | Environment Art",
      description:
        "A cinematic environment showcase focused on mood, composition, lighting, and world-building presentation.",
      videoPath: "assets/videos/dungeon-scape.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/dungeon-scape_1.png",
      imagePaths: ["assets/images/project-thumbnails/dungeon-scape_1.png"],
      links: [],
    },
     {
      title: "Forest River Valley",
      category: "Environments",
      tags: "Unreal Engine Fortnite Editor | Lighting | Environment Art",
      description:
        "A stylized riverside forest environment built in Unreal Engine, featuring a turquoise river, rocky cliffs, dense foliage, trees, a wooden cabin, and waterfall elements. The scene focuses on natural composition, exploration, atmosphere, and a clean playable layout.",
      videoPath: "assets/videos/UEFN Enivornment.mp4",
      videoAvailable: true,
      thumbnailPath: "assets/images/project-thumbnails/uefn_enivornment_1.png",
      imagePaths: ["assets/images/project-thumbnails/uefn_enivornment_1.png"],
      links: [],
    },

    {
      title: "Snowy Mountain Outpost",
      category: "Environments",
      tags: "Unreal Engine Fortnite Editor | Lighting | Environment Art",
      description:
        "A snowy mountain village environment built in Unreal Engine, featuring wooden cabins, watchtowers, frozen terrain, pine forests, rocky cliffs, bridges, fences, and environmental props. The scene focuses on atmosphere, scale, exploration, and strong visual composition, creating the feeling of an isolated winter outpost deep in the mountains..",
      videoPath: "assets/videos/gameplay-tools.mp4",
      videoAvailable: false,
      thumbnailPath: "assets/images/Base2.png",
      imagePaths: [
        "assets/images/Base1.png",
        "assets/images/Base2.png",
        "assets/images/Base3.png",
        "assets/images/Base4.png",
        "assets/images/Base5.png",
      ],
      links: [],
    },
  ],

  // Update your contact links here.
  contact: {
    email: "immuzammil1999@gmail.com",
    linkedin: "https://www.linkedin.com/in/muzammili1/",
    github: "https://github.com/MuzammilIftikhar-1",
    resumePath: "assets/docs/Muzammil Iftikhar CV_Resume.pdf",
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
