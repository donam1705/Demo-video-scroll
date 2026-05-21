export interface VideoData {
  id: string;
  videoUrl: string;
  authorName: string;
  authorHandle: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  sharesCount: number;
  musicName: string;
}

export const videos: VideoData[] = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "Big Buck Bunny",
    authorHandle: "@bigbuckbunny",
    description: "The classic Big Buck Bunny animation! A giant rabbit deals with three bullying rodents #animation #classic #bunny",
    likesCount: 45,
    commentsCount: 1230,
    bookmarksCount: 4355,
    sharesCount: 890,
    musicName: "Original Sound - Big Buck Bunny",
  },
  {
    id: "2",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "Friday Vibes",
    authorHandle: "@fridayvibes",
    description: "That Friday feeling when the weekend is almost here #friday #weekend #vibes #mood",
    likesCount: 128900,
    commentsCount: 5670,
    bookmarksCount: 9800,
    sharesCount: 3420,
    musicName: "♪ Friday - Rebecca Black (Remix)",
  },
  {
    id: "3",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "Sintel Movie",
    authorHandle: "@sintelmovie",
    description: "Sintel - An open movie by Blender Foundation. The story of a girl and her dragon 🔥 #sintel #blender #animation #epic",
    likesCount: 89400,
    commentsCount: 3450,
    bookmarksCount: 1200,
    sharesCount: 2100,
    musicName: "♪ Sintel Original Soundtrack",
  },
  {
    id: "4",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "Nature Explorer",
    authorHandle: "@natureexplorer",
    description: "Exploring the beauty of nature through animation Every creature has its story #nature #explore #wildlife",
    likesCount: 67300,
    commentsCount: 2890,
    bookmarksCount: 450,
    sharesCount: 1560,
    musicName: "♪ Ambient Nature Sounds",
  },
  {
    id: "5",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "Cinema Shorts",
    authorHandle: "@cinemashorts",
    description: "The best short films from around the world This one will give you chills! #cinema #shortfilm #mustwatch",
    likesCount: 234500,
    commentsCount: 8900,
    bookmarksCount: 15000,
    sharesCount: 5670,
    musicName: "♪ Epic Cinematic - Hans Zimmer Type",
  },
];
