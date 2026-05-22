const games = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: 9.99,
    originalPrice: 59.99,
    discount: 83,
    platform: "PC",
    genre: "RPG",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg",
    imageHor: "images/games/cyberpunk-g/cyberpunk-horizontal.jpg",
    imageVer: "images/games/cyberpunk-g/cyberpunk-vertical.jpg",
    description: "Cyberpunk 2077 is an immersive open-world action-RPG set in Night City, a sprawling megalopolis obsessed with power, glamour, and cutting-edge body modification technology. You play as V, a mercenary outlaw determined to acquire a one-of-a-kind implant that promises the key to immortality. Standing between you and your goal is the entire vast city of Night City, filled with shadowy corporations, dangerous gangs, and morally complex characters.",
    featured: true,
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    releaseDate: "December 10, 2020",
    reviewScore: 86,
    reviewCount: "204,000",
    reviewText: "Very Positive",
    media: [
      { type: "video", src: "images/screenshots/cyberpunk-s/cyberpunk-trailer1.mp4", thumb: "images/screenshots/cyberpunk-s/cyberpunk-thumb1.jpg" },
      { type: "video", src: "images/screenshots/cyberpunk-s/cyberpunk-trailer2.mp4", thumb: "images/screenshots/cyberpunk-s/cyberpunk-thumb2.jpg" },
      { type: "image", src: "images/screenshots/cyberpunk-s/cyberpunk-ss1.jpg", thumb: "images/screenshots/cyberpunk-s/cyberpunk-ss1.jpg" },
      { type: "image", src: "images/screenshots/cyberpunk-s/cyberpunk-ss2.jpg", thumb: "images/screenshots/cyberpunk-s/cyberpunk-ss2.jpg" },
      { type: "image", src: "images/screenshots/cyberpunk-s/cyberpunk-ss3.jpg", thumb: "images/screenshots/cyberpunk-s/cyberpunk-ss3.jpg" },
      { type: "image", src: "images/screenshots/cyberpunk-s/cyberpunk-ss4.jpg", thumb: "images/screenshots/cyberpunk-s/cyberpunk-ss4.jpg" },
      { type: "image", src: "images/screenshots/cyberpunk-s/cyberpunk-ss5.jpg", thumb: "images/screenshots/cyberpunk-s/cyberpunk-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i7-6700 / AMD Ryzen 5 1600"],
        ["RAM", "12 GB RAM"],
        ["GPU", "NVIDIA GTX 1060 6 GB / RX 580 8 GB"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "70 GB SSD"]
      ],
      rec: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i7-8700K / AMD Ryzen 5 3600"],
        ["RAM", "16 GB RAM"],
        ["GPU", "NVIDIA RTX 2060 Super / RX 5700 XT"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "70 GB SSD"]
      ]
    }
  },
  {
    id: 2,
    title: "The Witcher 3: Wild Hunt",
    price: 4.99,
    originalPrice: 29.99,
    discount: 83,
    platform: "PC",
    genre: "RPG",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/capsule_616x353.jpg",
    imageHor: "images/games/witcher-g/witcher-horizontal.jpg",
    imageVer: "images/games/witcher-g/witcher-vertical.jpg",
    description: "You are a legendary professional monster hunter embarking on an epic quest to find a child of prophecy in a vast, beautiful open fantasy world filled with danger and intrigue. Stop risen wraiths, accept contracts in the most treacherous corners of the realm, and aid those in desperate need. Explore thousands of miles of untamed wilderness and discover over 100 cities, villages, and castles.",
    featured: true,
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    releaseDate: "May 18, 2015",
    reviewScore: 97,
    reviewCount: "312,000",
    reviewText: "Overwhelmingly Positive",
    media: [
      { type: "video", src: "images/screenshots/witcher-s/witcher3-trailer1.mp4", thumb: "images/screenshots/witcher-s/witcher3-thumb1.jpg" },
      { type: "video", src: "images/screenshots/witcher-s/witcher3-trailer2.mp4", thumb: "images/screenshots/witcher-s/witcher3-thumb2.jpg" },
      { type: "image", src: "images/screenshots/witcher-s/witcher3-ss1.jpg", thumb: "images/screenshots/witcher-s/witcher3-ss1.jpg" },
      { type: "image", src: "images/screenshots/witcher-s/witcher3-ss2.jpg", thumb: "images/screenshots/witcher-s/witcher3-ss2.jpg" },
      { type: "image", src: "images/screenshots/witcher-s/witcher3-ss3.jpg", thumb: "images/screenshots/witcher-s/witcher3-ss3.jpg" },
      { type: "image", src: "images/screenshots/witcher-s/witcher3-ss4.jpg", thumb: "images/screenshots/witcher-s/witcher3-ss4.jpg" },
      { type: "image", src: "images/screenshots/witcher-s/witcher3-ss5.jpg", thumb: "images/screenshots/witcher-s/witcher3-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 7 64-bit"],
        ["CPU", "Intel Core i5-2500K / AMD Phenom II X4 940"],
        ["RAM", "6 GB RAM"],
        ["GPU", "NVIDIA GTX 660 / AMD Radeon HD 7870"],
        ["DirectX", "Version 11"],
        ["Network", "Broadband Internet"],
        ["Storage", "35 GB"]
      ],
      rec: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i7-3770 / AMD FX-8350"],
        ["RAM", "8 GB RAM"],
        ["GPU", "NVIDIA GTX 770 / AMD Radeon R9 290"],
        ["DirectX", "Version 11"],
        ["Network", "Broadband Internet"],
        ["Storage", "35 GB"]
      ]
    }
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    price: 19.99,
    originalPrice: 59.99,
    discount: 67,
    platform: "PC",
    genre: "Action",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg",
    imageHor: "images/games/redemption-g/redemption-horizontal.jpg",
    imageVer: "images/games/redemption-g/redemption-vertical.jpg",
    description: "An epic tale of honor, loyalty, and survival set at the dawn of the modern era in America, 1899. The age of outlaws and gunslingers is rapidly coming to an end, forcing Arthur Morgan and the Van der Linde gang to fight for their survival in an increasingly hostile and unforgiving world. Experience a gripping story of ambition, betrayal, and redemption set against the backdrop of the American frontier.",
    featured: true,
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "December 5, 2019",
    reviewScore: 93,
    reviewCount: "174,000",
    reviewText: "Very Positive",
    media: [
      { type: "video", src: "images/screenshots/redemption-s/rdr2-trailer1.mp4", thumb: "images/screenshots/redemption-s/rdr2-thumb1.jpg" },
      { type: "video", src: "images/screenshots/redemption-s/rdr2-trailer2.mp4", thumb: "images/screenshots/redemption-s/rdr2-thumb2.jpg" },
      { type: "image", src: "images/screenshots/redemption-s/rdr2-ss1.jpg", thumb: "images/screenshots/redemption-s/rdr2-ss1.jpg" },
      { type: "image", src: "images/screenshots/redemption-s/rdr2-ss2.jpg", thumb: "images/screenshots/redemption-s/rdr2-ss2.jpg" },
      { type: "image", src: "images/screenshots/redemption-s/rdr2-ss3.jpg", thumb: "images/screenshots/redemption-s/rdr2-ss3.jpg" },
      { type: "image", src: "images/screenshots/redemption-s/rdr2-ss4.jpg", thumb: "images/screenshots/redemption-s/rdr2-ss4.jpg" },
      { type: "image", src: "images/screenshots/redemption-s/rdr2-ss5.jpg", thumb: "images/screenshots/redemption-s/rdr2-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i5-2500K / AMD FX-6300"],
        ["RAM", "8 GB RAM"],
        ["GPU", "NVIDIA GTX 770 2 GB / AMD R9 280 3 GB"],
        ["DirectX", "Version 11"],
        ["Network", "Broadband Internet"],
        ["Storage", "150 GB SSD"]
      ],
      rec: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i7-4770K / AMD Ryzen 5 1500X"],
        ["RAM", "12 GB RAM"],
        ["GPU", "NVIDIA GTX 1060 6 GB / AMD RX 480 4 GB"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "150 GB SSD"]
      ]
    }
  },
  {
    id: 4,
    title: "God of War",
    price: 19.99,
    originalPrice: 49.99,
    discount: 60,
    platform: "PC",
    genre: "Action",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/capsule_616x353.jpg",
    imageHor: "images/games/godofwar-g/godofwar-horizontal.jpg",
    imageVer: "images/games/godofwar-g/godofwar-vertical.jpg",
    description: "Kratos and his young son Atreus embark on a dangerous and transformative journey through the mythical lands of Norse mythology. In this new world, the gods and monsters they encounter are unlike anything Kratos has ever faced before, forcing him to confront his past while protecting his son. Experience an intense action-adventure that blends brutal combat with a deeply personal father-son story.",
    featured: false,
    developer: "Santa Monica Studio",
    publisher: "PlayStation PC LLC",
    releaseDate: "January 14, 2022",
    reviewScore: 95,
    reviewCount: "89,000",
    reviewText: "Overwhelmingly Positive",
    media: [
      { type: "video", src: "images/screenshots/godofwar-s/godofwar-trailer1.mp4", thumb: "images/screenshots/godofwar-s/godofwar-thumb1.jpg" },
      { type: "video", src: "images/screenshots/godofwar-s/godofwar-trailer2.mp4", thumb: "images/screenshots/godofwar-s/godofwar-thumb2.jpg" },
      { type: "image", src: "images/screenshots/godofwar-s/godofwar-ss1.jpg", thumb: "images/screenshots/godofwar-s/godofwar-ss1.jpg" },
      { type: "image", src: "images/screenshots/godofwar-s/godofwar-ss2.jpg", thumb: "images/screenshots/godofwar-s/godofwar-ss2.jpg" },
      { type: "image", src: "images/screenshots/godofwar-s/godofwar-ss3.jpg", thumb: "images/screenshots/godofwar-s/godofwar-ss3.jpg" },
      { type: "image", src: "images/screenshots/godofwar-s/godofwar-ss4.jpg", thumb: "images/screenshots/godofwar-s/godofwar-ss4.jpg" },
      { type: "image", src: "images/screenshots/godofwar-s/godofwar-ss5.jpg", thumb: "images/screenshots/godofwar-s/godofwar-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i5-6600K / AMD Ryzen 5 2600X"],
        ["RAM", "8 GB RAM"],
        ["GPU", "NVIDIA GTX 1060 6 GB / AMD RX 5500 XT 8 GB"],
        ["DirectX", "Version 11"],
        ["Network", "Broadband Internet"],
        ["Storage", "70 GB SSD"]
      ],
      rec: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i9-9900K / AMD Ryzen 9 3900X"],
        ["RAM", "16 GB RAM"],
        ["GPU", "NVIDIA RTX 3080 / AMD RX 6800 XT"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "70 GB SSD"]
      ]
    }
  },
  {
    id: 5,
    title: "Elden Ring",
    price: 34.99,
    originalPrice: 59.99,
    discount: 42,
    platform: "PC",
    genre: "RPG",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg",
    imageHor: "images/games/elden-g/elden-horizontal.jpg",
    imageVer: "images/games/elden-g/elden-vertical.jpg",
    description: "An open-world fantasy action-RPG crafted by FromSoftware in collaboration with George R. R. Martin. Journey through a vast, breathtaking world filled with danger at every turn, encountering legendary bosses and uncovering ancient mysteries. Challenge yourself to become the Elden Lord in this masterpiece of challenging gameplay and atmospheric storytelling.",
    featured: false,
    developer: "FromSoftware",
    publisher: "Bandai Namco",
    releaseDate: "February 25, 2022",
    reviewScore: 94,
    reviewCount: "118,000",
    reviewText: "Overwhelmingly Positive",
    media: [
      { type: "video", src: "images/screenshots/elden-s/eldenring-trailer1.mp4", thumb: "images/screenshots/elden-s/eldenring-thumb1.jpg" },
      { type: "video", src: "images/screenshots/elden-s/eldenring-trailer2.mp4", thumb: "images/screenshots/elden-s/eldenring-thumb2.jpg" },
      { type: "image", src: "images/screenshots/elden-s/eldenring-ss1.jpg", thumb: "images/screenshots/elden-s/eldenring-ss1.jpg" },
      { type: "image", src: "images/screenshots/elden-s/eldenring-ss2.jpg", thumb: "images/screenshots/elden-s/eldenring-ss2.jpg" },
      { type: "image", src: "images/screenshots/elden-s/eldenring-ss3.jpg", thumb: "images/screenshots/elden-s/eldenring-ss3.jpg" },
      { type: "image", src: "images/screenshots/elden-s/eldenring-ss4.jpg", thumb: "images/screenshots/elden-s/eldenring-ss4.jpg" },
      { type: "image", src: "images/screenshots/elden-s/eldenring-ss5.jpg", thumb: "images/screenshots/elden-s/eldenring-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i5-8400 / AMD Ryzen 3 3300X"],
        ["RAM", "12 GB RAM"],
        ["GPU", "NVIDIA GTX 1060 3 GB / AMD RX 580 4 GB"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "60 GB SSD"]
      ],
      rec: [
        ["OS", "Windows 10/11 64-bit"],
        ["CPU", "Intel Core i7-8700K / AMD Ryzen 5 3600X"],
        ["RAM", "16 GB RAM"],
        ["GPU", "NVIDIA GTX 1070 8 GB / AMD RX Vega 56 8 GB"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "60 GB SSD"]
      ]
    }
  },
  {
    id: 6,
    title: "Hollow Knight",
    price: 2.99,
    originalPrice: 14.99,
    discount: 80,
    platform: "PC",
    genre: "Indie",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg",
    imageHor: "images/games/hollow-g/hollow-horizontal.jpg",
    imageVer: "images/games/hollow-g/hollow-vertical.jpg",
    description: "A challenging action-adventure that takes you through a vast, interconnected underground kingdom inhabited by bugs and mysterious creatures. Navigate treacherous caverns, solve intricate puzzles, and battle formidable enemies in this beautifully crafted Metroidvania experience. With its engaging combat and exploration, Hollow Knight offers hundreds of hours of gameplay.",
    featured: false,
    developer: "Team Cherry",
    publisher: "Team Cherry",
    releaseDate: "February 24, 2017",
    reviewScore: 98,
    reviewCount: "159,000",
    reviewText: "Overwhelmingly Positive",
    media: [
      { type: "video", src: "images/screenshots/hollow-s/hollowknight-trailer1.mp4", thumb: "images/screenshots/hollow-s/hollowknight-thumb1.jpg" },
      { type: "video", src: "images/screenshots/hollow-s/hollowknight-trailer2.mp4", thumb: "images/screenshots/hollow-s/hollowknight-thumb2.jpg" },
      { type: "image", src: "images/screenshots/hollow-s/hollowknight-ss1.jpg", thumb: "images/screenshots/hollow-s/hollowknight-ss1.jpg" },
      { type: "image", src: "images/screenshots/hollow-s/hollowknight-ss2.jpg", thumb: "images/screenshots/hollow-s/hollowknight-ss2.jpg" },
      { type: "image", src: "images/screenshots/hollow-s/hollowknight-ss3.jpg", thumb: "images/screenshots/hollow-s/hollowknight-ss3.jpg" },
      { type: "image", src: "images/screenshots/hollow-s/hollowknight-ss4.jpg", thumb: "images/screenshots/hollow-s/hollowknight-ss4.jpg" },
      { type: "image", src: "images/screenshots/hollow-s/hollowknight-ss5.jpg", thumb: "images/screenshots/hollow-s/hollowknight-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 7 64-bit"],
        ["CPU", "Intel Core 2 Duo"],
        ["RAM", "4 GB RAM"],
        ["GPU", "NVIDIA GTX 460 / AMD Radeon HD 5770"],
        ["DirectX", "Version 10"],
        ["Network", "Broadband Internet"],
        ["Storage", "2.5 GB available space"]
      ],
      rec: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i5"],
        ["RAM", "8 GB RAM"],
        ["GPU", "NVIDIA GTX 960 / AMD R9 290"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "2.5 GB available space"]
      ]
    }
  },
  {
    id: 7,
    title: "FIFA 24",
    price: 14.99,
    originalPrice: 69.99,
    discount: 79,
    platform: "PC",
    genre: "Sport",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2195250/capsule_616x353.jpg",
    imageHor: "images/games/fifa24-g/fifa24-horizontal.jpg",
    imageVer: "images/games/fifa24-g/fifa24-vertical.jpg",
    description: "The world's most popular football simulator featuring real players and teams from leagues around the globe. Build your ultimate team, compete in dynamic seasons, and experience authentic match gameplay with enhanced graphics and mechanics. Whether you're a casual fan or competitive player, FIFA 24 delivers the ultimate football experience.",
    featured: false,
    developer: "EA Sports",
    publisher: "Electronic Arts",
    releaseDate: "September 29, 2023",
    reviewScore: 51,
    reviewCount: "22,000",
    reviewText: "Mixed",
    media: [
      { type: "video", src: "images/screenshots/fifa24-trailer1.mp4", thumb: "images/screenshots/fifa24-thumb1.jpg" },
      { type: "video", src: "images/screenshots/fifa24-trailer2.mp4", thumb: "images/screenshots/fifa24-thumb2.jpg" },
      { type: "image", src: "images/screenshots/fifa24-ss1.jpg", thumb: "images/screenshots/fifa24-ss1.jpg" },
      { type: "image", src: "images/screenshots/fifa24-ss2.jpg", thumb: "images/screenshots/fifa24-ss2.jpg" },
      { type: "image", src: "images/screenshots/fifa24-ss3.jpg", thumb: "images/screenshots/fifa24-ss3.jpg" },
      { type: "image", src: "images/screenshots/fifa24-ss4.jpg", thumb: "images/screenshots/fifa24-ss4.jpg" },
      { type: "image", src: "images/screenshots/fifa24-ss5.jpg", thumb: "images/screenshots/fifa24-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i3-9100F / AMD Ryzen 3 3100F"],
        ["RAM", "8 GB RAM"],
        ["GPU", "NVIDIA GTX 750 Ti / AMD R7 260"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "50 GB SSD"]
      ],
      rec: [
        ["OS", "Windows 10/11 64-bit"],
        ["CPU", "Intel Core i5-9600K / AMD Ryzen 5 3600"],
        ["RAM", "16 GB RAM"],
        ["GPU", "NVIDIA RTX 2070 / AMD RX 5700 XT"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "50 GB SSD"]
      ]
    }
  },
  {
    id: 8,
    title: "Stardew Valley",
    price: 6.99,
    originalPrice: 13.99,
    discount: 50,
    platform: "PC",
    genre: "Indie",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg",
    imageHor: "images/games/stardew-g/stardew-horizontal.jpg",
    imageVer: "images/games/stardew-g/stardew-vertical.jpg",
    description: "You've inherited your grandfather's abandoned farm plot and must restore it to its former glory. Build up your farm, cultivate crops, raise animals, and make meaningful connections with the townspeople. Experience a relaxing yet rewarding life simulation game that encourages creativity, exploration, and personal growth.",
    featured: false,
    developer: "ConcernedApe",
    publisher: "ConcernedApe",
    releaseDate: "February 26, 2016",
    reviewScore: 98,
    reviewCount: "280,000",
    reviewText: "Overwhelmingly Positive",
    media: [
      { type: "video", src: "images/screenshots/stardewvalley-trailer1.mp4", thumb: "images/screenshots/stardewvalley-thumb1.jpg" },
      { type: "video", src: "images/screenshots/stardewvalley-trailer2.mp4", thumb: "images/screenshots/stardewvalley-thumb2.jpg" },
      { type: "image", src: "images/screenshots/stardewvalley-ss1.jpg", thumb: "images/screenshots/stardewvalley-ss1.jpg" },
      { type: "image", src: "images/screenshots/stardewvalley-ss2.jpg", thumb: "images/screenshots/stardewvalley-ss2.jpg" },
      { type: "image", src: "images/screenshots/stardewvalley-ss3.jpg", thumb: "images/screenshots/stardewvalley-ss3.jpg" },
      { type: "image", src: "images/screenshots/stardewvalley-ss4.jpg", thumb: "images/screenshots/stardewvalley-ss4.jpg" },
      { type: "image", src: "images/screenshots/stardewvalley-ss5.jpg", thumb: "images/screenshots/stardewvalley-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows XP or later"],
        ["CPU", "Intel Core 2 Duo 1.8 GHz"],
        ["RAM", "512 MB RAM"],
        ["GPU", "Integrated graphics"],
        ["DirectX", "Version 9"],
        ["Network", "Broadband Internet"],
        ["Storage", "500 MB available space"]
      ],
      rec: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i5"],
        ["RAM", "4 GB RAM"],
        ["GPU", "NVIDIA GTX 750 / AMD equivalent"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "500 MB available space"]
      ]
    }
  },
  {
    id: 9,
    title: "Grand Theft Auto V",
    price: 8.99,
    originalPrice: 29.99,
    discount: 70,
    platform: "PC",
    genre: "Action",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/capsule_616x353.jpg",
    imageHor: "images/games/gta-g/gta-horizontal.jpg",
    imageVer: "images/games/gta-g/gta-vertical.jpg",
    description: "Three hardened criminals plan a series of audacious heists while dealing with constant pressure from relentless government agencies and ruthless crime syndicates. Experience a sprawling open world filled with endless possibilities, dynamic missions, and a gripping narrative that explores themes of ambition and survival. Grand Theft Auto V offers unparalleled freedom and immersion.",
    featured: false,
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "April 14, 2015",
    reviewScore: 87,
    reviewCount: "388,000",
    reviewText: "Very Positive",
    media: [
      { type: "video", src: "images/screenshots/gtav-trailer1.mp4", thumb: "images/screenshots/gtav-thumb1.jpg" },
      { type: "video", src: "images/screenshots/gtav-trailer2.mp4", thumb: "images/screenshots/gtav-thumb2.jpg" },
      { type: "image", src: "images/screenshots/gtav-ss1.jpg", thumb: "images/screenshots/gtav-ss1.jpg" },
      { type: "image", src: "images/screenshots/gtav-ss2.jpg", thumb: "images/screenshots/gtav-ss2.jpg" },
      { type: "image", src: "images/screenshots/gtav-ss3.jpg", thumb: "images/screenshots/gtav-ss3.jpg" },
      { type: "image", src: "images/screenshots/gtav-ss4.jpg", thumb: "images/screenshots/gtav-ss4.jpg" },
      { type: "image", src: "images/screenshots/gtav-ss5.jpg", thumb: "images/screenshots/gtav-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 8.1 64-bit"],
        ["CPU", "Intel Core 2 Quad CPU Q6600 @ 2.4GHz"],
        ["RAM", "4 GB RAM"],
        ["GPU", "NVIDIA 8800 GT / AMD HD 4870"],
        ["DirectX", "Version 10"],
        ["Network", "Broadband Internet"],
        ["Storage", "65 GB SSD"]
      ],
      rec: [
        ["OS", "Windows 10/11 64-bit"],
        ["CPU", "Intel Core i7 3770 / AMD FX 8350"],
        ["RAM", "8 GB RAM"],
        ["GPU", "NVIDIA GTX 1050 Ti / AMD R9 290"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "65 GB SSD"]
      ]
    }
  },
  {
    id: 10,
    title: "R.E.P.O.",
    price: 6.99,
    originalPrice: 9.99,
    discount: 30,
    platform: "PC",
    genre: "Action",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3241660/capsule_616x353.jpg",
    imageHor: "images/games/repo-g/repo-horizontal.jpg",
    imageVer: "images/games/repo-g/repo-vertical.jpg",
    description: "R.E.P.O. is an intense online co-op horror game supporting up to 6 players working together to locate and extract valuable, fully physics-based objects from terrifying environments. Coordinate carefully with your team using proximity voice chat while dealing with spine-chilling monsters and the chaos of cooperative gameplay. This pulse-pounding experience combines strategy, teamwork, and genuine scares.",
    featured: false,
    developer: "semiwork",
    publisher: "semiwork",
    releaseDate: "February 26, 2025",
    reviewScore: 96,
    reviewCount: "119,394",
    reviewText: "Overwhelmingly Positive",
    media: [
      { type: "video", src: "images/screenshots/repo-s/repo-trailer1.mp4", thumb: "images/screenshots/repo-s/repo-thumb1.jpg" },
      { type: "video", src: "images/screenshots/repo-s/repo-trailer2.mp4", thumb: "images/screenshots/repo-s/repo-thumb2.jpg" },
      { type: "image", src: "images/screenshots/repo-s/repo-ss1.jpg", thumb: "images/screenshots/repo-s/repo-ss1.jpg" },
      { type: "image", src: "images/screenshots/repo-s/repo-ss2.jpg", thumb: "images/screenshots/repo-s/repo-ss2.jpg" },
      { type: "image", src: "images/screenshots/repo-s/repo-ss3.jpg", thumb: "images/screenshots/repo-s/repo-ss3.jpg" },
      { type: "image", src: "images/screenshots/repo-s/repo-ss4.jpg", thumb: "images/screenshots/repo-s/repo-ss4.jpg" },
      { type: "image", src: "images/screenshots/repo-s/repo-ss5.jpg", thumb: "images/screenshots/repo-s/repo-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Core i5 6600"],
        ["RAM", "8 GB RAM"],
        ["GPU", "GTX 970"],
        ["DirectX", "Version 10"],
        ["Network", "Broadband Internet"],
        ["Storage", "1 GB available space"]
      ],
      rec: [
        ["OS", "Windows 11 64-bit"],
        ["CPU", "Intel Core i7 8700"],
        ["RAM", "8 GB RAM"],
        ["GPU", "GTX 1070"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "1 GB available space"]
      ]
    }
  },
  {
    id: 11,
    title: "Spider-Man Miles Morales",
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    platform: "PlayStation",
    genre: "Action",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/capsule_616x353.jpg",
    imageHor: "images/games/spiderman-g/spiderman-horizontal.jpg",
    imageVer: "images/games/spiderman-g/spiderman-vertical.jpg",
    description: "Miles Morales discovers his incredible new superpowers and rises to the challenge of becoming the new Spider-Man while protecting his home neighborhood. Master electrifying new abilities, navigate New York's bustling streets, and uncover a gripping story of identity, heroism, and personal growth. This action-packed adventure delivers exhilarating combat and exploration.",
    featured: false,
    developer: "Insomniac Games",
    publisher: "PlayStation PC LLC",
    releaseDate: "November 18, 2022",
    reviewScore: 92,
    reviewCount: "18,000",
    reviewText: "Very Positive",
    media: [
      { type: "video", src: "images/screenshots/spiderman-s/spiderman-trailer1.mp4", thumb: "images/screenshots/spiderman-s/spiderman-thumb1.jpg" },
      { type: "video", src: "images/screenshots/spiderman-s/spiderman-trailer2.mp4", thumb: "images/screenshots/spiderman-s/spiderman-thumb2.jpg" },
      { type: "image", src: "images/screenshots/spiderman-s/spiderman-ss1.jpg", thumb: "images/screenshots/spiderman-s/spiderman-ss1.jpg" },
      { type: "image", src: "images/screenshots/spiderman-s/spiderman-ss2.jpg", thumb: "images/screenshots/spiderman-s/spiderman-ss2.jpg" },
      { type: "image", src: "images/screenshots/spiderman-s/spiderman-ss3.jpg", thumb: "images/screenshots/spiderman-s/spiderman-ss3.jpg" },
      { type: "image", src: "images/screenshots/spiderman-s/spiderman-ss4.jpg", thumb: "images/screenshots/spiderman-s/spiderman-ss4.jpg" },
      { type: "image", src: "images/screenshots/spiderman-s/spiderman-ss5.jpg", thumb: "images/screenshots/spiderman-s/spiderman-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 10 64-bit"],
        ["CPU", "Intel Core i5-8400 / AMD Ryzen 5 2600"],
        ["RAM", "8 GB RAM"],
        ["GPU", "NVIDIA GTX 1050 Ti / AMD RX 470"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "75 GB SSD"]
      ],
      rec: [
        ["OS", "Windows 10/11 64-bit"],
        ["CPU", "Intel Core i7-10700K / AMD Ryzen 5 3600X"],
        ["RAM", "16 GB RAM"],
        ["GPU", "NVIDIA RTX 2080 / AMD RX 5700 XT"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "75 GB SSD"]
      ]
    }
  },
  {
    id: 12,
    title: "Minecraft",
    price: 19.99,
    originalPrice: 26.99,
    discount: 26,
    platform: "PC",
    genre: "Sandbox",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1672970/capsule_616x353.jpg",
    imageHor: "images/games/minecraft-g/minecraft-horizontal.jpg",
    imageVer: "images/games/minecraft-g/minecraft-vertical.jpg",
    description: "Build, survive, and explore infinite blocky worlds limited only by your imagination in this revolutionary sandbox game. Engage in creative mode to construct magnificent structures, or challenge yourself in survival mode facing dangerous creatures and environmental hazards. With endless possibilities and constant updates, Minecraft remains the ultimate creative experience.",
    featured: false,
    developer: "Mojang Studios",
    publisher: "Mojang Studios",
    releaseDate: "November 18, 2011",
    reviewScore: 95,
    reviewCount: "45,000",
    reviewText: "Overwhelmingly Positive",
    media: [
      { type: "video", src: "images/screenshots/minecraft-s/minecraft-trailer1.mp4", thumb: "images/screenshots/minecraft-s/minecraft-thumb1.jpg" },
      { type: "video", src: "images/screenshots/minecraft-s/minecraft-trailer2.mp4", thumb: "images/screenshots/minecraft-s/minecraft-thumb2.jpg" },
      { type: "image", src: "images/screenshots/minecraft-s/minecraft-ss1.jpg", thumb: "images/screenshots/minecraft-s/minecraft-ss1.jpg" },
      { type: "image", src: "images/screenshots/minecraft-s/minecraft-ss2.jpg", thumb: "images/screenshots/minecraft-s/minecraft-ss2.jpg" },
      { type: "image", src: "images/screenshots/minecraft-s/minecraft-ss3.jpg", thumb: "images/screenshots/minecraft-s/minecraft-ss3.jpg" },
      { type: "image", src: "images/screenshots/minecraft-s/minecraft-ss4.jpg", thumb: "images/screenshots/minecraft-s/minecraft-ss4.jpg" },
      { type: "image", src: "images/screenshots/minecraft-s/minecraft-ss5.jpg", thumb: "images/screenshots/minecraft-s/minecraft-ss5.jpg" }
    ],
    systemReqs: {
      min: [
        ["OS", "Windows 7 or later 64-bit"],
        ["CPU", "Intel Core i3 / AMD Ryzen 3"],
        ["RAM", "4 GB RAM"],
        ["GPU", "Integrated graphics"],
        ["DirectX", "Version 11"],
        ["Network", "Broadband Internet"],
        ["Storage", "2 GB available space"]
      ],
      rec: [
        ["OS", "Windows 10/11 64-bit"],
        ["CPU", "Intel Core i7 / AMD Ryzen 7"],
        ["RAM", "8 GB RAM"],
        ["GPU", "NVIDIA GTX 1650 / AMD RX 6600"],
        ["DirectX", "Version 12"],
        ["Network", "Broadband Internet"],
        ["Storage", "2 GB available space"]
      ]
    }
  }
];