# VidFlow - Vertical Video Scroll Feed 

A TikTok-style vertical video scroll feed built with **Next.js (App Router)** and **TypeScript**. Features smooth scroll snapping, auto-play/pause, and a responsive social media UI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Vertical Scroll Feed**: Full-screen video cards with CSS Scroll Snap for smooth, one-at-a-time scrolling
- **Auto Play/Pause**: Videos automatically play when scrolled into view and pause when scrolled away
- **Click to Play/Pause**: Tap/click on any video to toggle playback with animated overlay icons
- **Like Interaction**: Toggle like button with animated heart, color change (red), and count update
- **Responsive Design**: 
  - Desktop: Left sidebar navigation + 9:16 centered video
  - Mobile: Full-screen video + bottom navigation bar
- **Progress Bar**: Real-time playback progress indicator on each video
- **Music Disc**: Spinning music disc animation synced with playback state
- **Glassmorphism UI**: Modern frosted glass effects on action buttons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd video-scroll-feed

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** (App Router) | React framework with server components |
| **TypeScript** | Type safety |
| **CSS Modules** | Scoped component styling |
| **Vanilla CSS** | Design system, animations, responsive layout |
| **Intersection Observer API** | Auto-play/pause detection |

## 📁 Project Structure

```
video-scroll-feed/
├── app/
│   ├── globals.css          # Design system, tokens, animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page (Navbar + VideoFeed)
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx       # Responsive sidebar/bottom nav
│   │   └── Navbar.module.css
│   ├── VideoFeed/
│   │   ├── VideoFeed.tsx    # Scroll container + Observer
│   │   └── VideoFeed.module.css
│   ├── VideoCard/
│   │   ├── VideoCard.tsx    # Individual video player
│   │   └── VideoCard.module.css
│   └── ActionBar/
│       ├── ActionBar.tsx    # Like, Comment, Share buttons
│       └── ActionBar.module.css
└── data/
    └── videos.ts            # Mock video data (5 items)
```

## 🧠 Play/Pause Logic khi cuộn trang

### Cách hoạt động

Ứng dụng sử dụng **Intersection Observer API** kết hợp **CSS Scroll Snap** để quản lý việc phát/dừng video một cách thông minh:

#### 1. CSS Scroll Snap (Cuộn mượt)

```css
/* Container cuộn */
.feedContainer {
  scroll-snap-type: y mandatory;    /* Bắt buộc snap theo trục Y */
  overflow-y: scroll;
  height: 100dvh;
}

/* Mỗi video card */
.videoCard {
  scroll-snap-align: start;         /* Snap tại điểm bắt đầu */
  height: 100dvh;                   /* Chiếm toàn bộ viewport */
}
```

Khi người dùng cuộn, trình duyệt tự động "bắt" (snap) vào video gần nhất, tạo trải nghiệm cuộn từng video một giống TikTok.

#### 2. Intersection Observer (Phát hiện video trong viewport)

```typescript
// Trong VideoFeed.tsx
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Video này đang hiển thị ≥ 70% trong viewport
        setActiveIndex(index);  // Đánh dấu là video đang active
      }
    });
  },
  {
    root: container,    // Phần tử cuộn (scroll container)
    threshold: 0.7,     // Kích hoạt khi ≥ 70% video xuất hiện
  }
);
```

**Cách hoạt động chi tiết:**

1. `IntersectionObserver` được tạo với `threshold: 0.7` — nghĩa là callback sẽ được gọi khi một video chiếm **≥ 70% viewport**.
2. Observer theo dõi tất cả các video card thông qua thuộc tính `data-index`.
3. Khi một video đạt ngưỡng 70%, state `activeIndex` được cập nhật.

#### 3. Auto Play/Pause (Phát/Dừng tự động)

```typescript
useEffect(() => {
  if (isActive) {
    videoRef.current.play();    // Video trong viewport → Phát
  } else {
    videoRef.current.pause();   // Video ngoài viewport → Dừng
  }
}, [isActive]);
```

**Luồng xử lý:**

```
Người dùng cuộn ↓
  → CSS Scroll Snap bắt vào video tiếp theo
  → Intersection Observer phát hiện video mới chiếm ≥ 70% viewport
  → setActiveIndex(newIndex) cập nhật state
  → Video mới: isActive=true → play()
  → Video cũ: isActive=false → pause()
```

#### 4. Click Play/Pause (Thủ công)

Ngoài auto-play, người dùng có thể **click/tap trực tiếp** vào video để toggle play/pause:

```typescript
const handleVideoClick = () => {
  if (videoEl.paused) {
    videoEl.play();       // Đang dừng → Phát
    // Hiển thị icon ▶ với animation pop
  } else {
    videoEl.pause();      // Đang phát → Dừng
    // Hiển thị icon ⏸ với animation pop
  }
};
```

Icon play/pause hiển thị với hiệu ứng `scale + fade` trong 600ms rồi biến mất.

### Tối ưu hiệu năng

- **`preload="metadata"`**: Video chỉ tải metadata ban đầu, không tải toàn bộ file
- **`muted` + `playsInline`**: Đảm bảo autoplay hoạt động trên mobile (yêu cầu của trình duyệt)
- **Chỉ 1 video phát tại 1 thời điểm**: Tiết kiệm băng thông và tài nguyên CPU/GPU
- **CSS `will-change`**: Tối ưu rendering cho các animation
