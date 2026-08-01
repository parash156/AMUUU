import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import photo1 from "../assets/memories/photo1.jpg";
import photo2 from "../assets/memories/photo2.jpg";
import photo3 from "../assets/memories/photo3.jpg";
import photo4 from "../assets/memories/photo4.jpg";
import photo5 from "../assets/memories/photo5.jpg";
import photo6 from "../assets/memories/photo6.jpg";
import photo7 from "../assets/memories/photo7.jpg";
import photo8 from "../assets/memories/photo8.jpg";
import photo9 from "../assets/memories/photo9.jpg";
import photo10 from "../assets/memories/photo10.jpg";
import photo11 from "../assets/memories/photo11.jpg";
import photo12 from "../assets/memories/photo12.jpg";


interface Props {
  onBack: () => void;
  dark: boolean;
}

interface Memory {
  id: number;
  image: string;
  title: string;
  caption: string;
  date: string;
}


export default function MemoryGallery({
  onBack,
  dark,
}: Props) {

  const [selected, setSelected] = useState<number | null>(null);

const [liked, setLiked] = useState<number[]>([]);

const [, setZoom] = useState(1);

const memories = useMemo<Memory[]>(
  () => [
    {
      id: 1,
      image: photo1,
      title: 'Soft light 🦢',
      caption: 'Effortlessly Beautiful.',
      date: '2025 August 02',
    },
    {
      id: 2,
      image: photo2,
      title: 'That smile',
      caption: 'The kind of frame you keep forever.',
      date: '2023 December 25',
    },
    {
      id: 3,
      image: photo3,
      title: 'Evening calm',
      caption: 'In your happy girl era ❤️🙌🏻',
      date: '2023 October 31',
    },
    {
      id: 4,
      image: photo4,
      title: 'In between',
      caption: 'One of those ordinary moments that stayed.',
      date: '2026 March 15',
    },
    {
      id: 5,
      image: photo5,
      title: 'Golden hour',
      caption: 'Moments worth capturing ❤️✨.',
      date: '2025 February 10',
    },
    {
      id: 6,
      image: photo6,
      title: 'Stillness',
      caption: 'A pause worth remembering.',
      date: '2025 January 12',
    },
    {
      id: 7,
      image: photo7,
      title: 'Near the trees',
      caption: 'Green all around, and that look.',
      date: '2026 July 05',
    },
    {
      id: 8,
      image: photo8,
      title: 'After the rain',
      caption: 'The world felt quieter.',
      date: '2025 April 04',
    },
    {
      id: 9,
      image: photo9,
      title: 'White & soft',
      caption: 'A frame that still glows.',
      date: '2025 April 27',
    },
    {
      id: 10,
      image: photo10,
      title: 'Nurse Madam👩‍⚕️',
      caption: 'Healing Begins with Kindness.',
      date: '2024 February 29',
    },
    {
      id: 11,
      image: photo11,
      title: 'Where It All Began',
      caption: 'The first picture of you I ever came across and one I never forgot.',
      date: '2025 May 08',
    },
    {
      id: 12,
      image: photo12,
      title: 'Her world',
      caption: 'This one needed no caption. Still got one.',
      date: '2023 December 25',
    },
  ],
  []
);
const currentMemory =
  selected !== null
    ? memories[selected]
    : null;

    const nextImage = () => {
  if (selected === null) return;

  setSelected((selected + 1) % memories.length);
};

const previousImage = () => {
  if (selected === null) return;

  setSelected(
    (selected - 1 + memories.length) %
      memories.length
  );
};

const toggleLike = (id: number) => {
  setLiked((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
};

useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (selected === null) return;

    if (e.key === "Escape") {
      setSelected(null);
      setZoom(1);
    }

    if (e.key === "ArrowRight") {
      nextImage();
    }

    if (e.key === "ArrowLeft") {
      previousImage();
    }
  };

  window.addEventListener("keydown", handleKey);

  return () =>
    window.removeEventListener(
      "keydown",
      handleKey
    );
}, [selected]);

useEffect(() => {
  setZoom(1);
}, [selected]);

return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}

        className="min-h-screen overflow-hidden"
    style={{
      background: dark
        ? "linear-gradient(180deg,#07070d 0%,#121228 50%,#1b1035 100%)"
        : "linear-gradient(180deg,#fdfbff 0%,#f7f0ff 100%)",
    }}
>

    {/* Background Blur */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">

      <motion.div
        animate={{
          x: [0, 250, 0],
          y: [0, -120, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-96 h-96 rounded-full blur-[120px]"
        style={{
          background: "#ff4fa3",
          opacity: 0.18,
          top: -100,
          left: -80,
        }}
      />

      <motion.div
        animate={{
          x: [0, -220, 0],
          y: [0, 140, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{
          background: "#6d5cff",
          opacity: 0.18,
          bottom: -180,
          right: -150,
        }}
      />

    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-14">

        <div>

          <motion.button
            whileHover={{
              scale: 1.05,
              x: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={onBack}
            className="mb-6 px-5 py-3 rounded-full font-medium"
            style={{
              backdropFilter: "blur(20px)",
              background: dark
                ? "rgba(255,255,255,.08)"
                : "rgba(255,255,255,.75)",
              color: dark ? "#fff" : "#222",
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            ← Back
          </motion.button>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-6xl md:text-7xl font-black"
            style={{
              color: dark ? "#fff" : "#111",
            }}
          >
            Memories
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .2,
            }}
            className="text-lg mt-4 max-w-xl"
            style={{
              color: dark
                ? "rgba(255,255,255,.7)"
                : "#666",
            }}
          >
            Every photograph captures a moment that deserves
            to live forever.
          </motion.p>

        </div>

        {/* Stats */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: .3,
          }}
          className="grid grid-cols-3 gap-4"
        >

          <div
            className="rounded-3xl p-6 text-center"
            style={{
              backdropFilter: "blur(20px)",
              background: dark
                ? "rgba(255,255,255,.06)"
                : "rgba(255,255,255,.75)",
            }}
          >
            <h2
              className="text-3xl font-bold"
              style={{
                color: "#ff5ea8",
              }}
            >
              {memories.length}
            </h2>

            <p
              style={{
                color: dark
                  ? "#ddd"
                  : "#666",
              }}
            >
              Photos
            </p>
          </div>

          <div
            className="rounded-3xl p-6 text-center"
            style={{
              backdropFilter: "blur(20px)",
              background: dark
                ? "rgba(255,255,255,.06)"
                : "rgba(255,255,255,.75)",
            }}
          >
            <h2
              className="text-3xl font-bold"
              style={{
                color: "#6d5cff",
              }}
            >
              {liked.length}
            </h2>

            <p
              style={{
                color: dark
                  ? "#ddd"
                  : "#666",
              }}
            >
              Favorites
            </p>
          </div>

          <div
            className="rounded-3xl p-6 text-center"
            style={{
              backdropFilter: "blur(20px)",
              background: dark
                ? "rgba(255,255,255,.06)"
                : "rgba(255,255,255,.75)",
            }}
          >
            <h2
              className="text-3xl font-bold"
              style={{
                color: "#00c6a7",
              }}
            >
              ∞
            </h2>

            <p
              style={{
                color: dark
                  ? "#ddd"
                  : "#666",
              }}
            >
              Memories
            </p>
          </div>

        </motion.div>

      </div>

      {/* Masonry Gallery */}

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">

        {memories.map((memory, index) => (

  <motion.div
    key={memory.id}
    initial={{
      opacity: 0,
      y: 60,
      scale: .96,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      duration: .6,
      delay: index * 0.05,
    }}
    className="break-inside-avoid mb-6"
  >

    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: .98,
      }}
      onClick={() => setSelected(index)}
      className="relative overflow-hidden rounded-[28px] cursor-pointer group shadow-2xl"
      style={{
        background: dark
          ? "#151522"
          : "#ffffff",
      }}
    >

      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={memory.image}
          alt={memory.title}
          loading="lazy"
          
          className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{
            height: `${280 + (index % 4) * 70}px`,
          }}
        />

        {/* Gradient */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,.72), transparent 60%)",
          }}
        />

        {/* Shine */}

        <motion.div
          animate={{
            x: [-300, 500],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
          className="absolute top-0 left-0 h-full w-24"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)",
            transform: "skewX(-25deg)",
          }}
        />

      </div>

      {/* Date */}

      <div
        className="absolute top-5 left-5 px-4 py-2 rounded-full text-sm font-semibold"
        style={{
          background: "rgba(255,255,255,.92)",
          color: "#ff4f96",
          backdropFilter: "blur(20px)",
        }}
      >
        📅 {memory.date}
      </div>

      {/* Like */}

      <motion.button
        whileHover={{
          scale: 1.15,
        }}
        whileTap={{
          scale: .9,
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(memory.id);
        }}
        className="absolute top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center text-xl"
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,.18)",
          color: liked.includes(memory.id)
            ? "#ff3d7a"
            : "#ffffff",
        }}
      >
        {liked.includes(memory.id)
          ? "❤️"
          : "🤍"}
      </motion.button>

      {/* Bottom Overlay */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{
          duration: .3,
        }}
        className="absolute inset-0 flex items-end"
      >

        <div
          className="w-full p-6"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,.82), transparent)",
          }}
        >

          <motion.h2
            initial={{
              y: 25,
            }}
            whileHover={{
              y: 0,
            }}
            className="text-white text-2xl font-bold"
          >
            {memory.title}
          </motion.h2>

          <motion.p
            initial={{
              y: 25,
            }}
            whileHover={{
              y: 0,
            }}
            transition={{
              delay: .05,
            }}
            className="text-white/80 mt-2 leading-7"
          >
            {memory.caption}
          </motion.p>

          <motion.div
            initial={{
              y: 25,
            }}
            whileHover={{
              y: 0,
            }}
            transition={{
              delay: .1,
            }}
            className="mt-5 flex items-center justify-between"
          >

            <span
              className="px-4 py-2 rounded-full text-sm"
              style={{
                background:
                  "rgba(255,255,255,.15)",
                color: "#ffffff",
                backdropFilter: "blur(12px)",
              }}
            >
              View Memory
            </span>

            <motion.div
              animate={{
                x: [0, 6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
              }}
              className="text-white text-xl"
            >
              →
            </motion.div>

          </motion.div>

        </div>

      </motion.div>

    </motion.div>

  </motion.div>

))}

</div>

</div>

<AnimatePresence>
  {currentMemory && (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'rgba(0,0,0,0.94)',
      }}
      onClick={() => {
        setSelected(null);
        setZoom(1);
      }}
    >
      {/* Close */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setSelected(null);
          setZoom(1);
        }}
        className="absolute top-6 right-6 z-30 w-11 h-11 rounded-full flex items-center justify-center text-lg"
        style={{
          background: 'rgba(255,255,255,0.1)',
          color: '#fff',
          backdropFilter: 'blur(12px)',
        }}
      >
        ✕
      </motion.button>

      {/* Counter */}
      <div
        className="absolute top-6 left-6 z-30 px-4 py-2 rounded-full text-sm font-medium"
        style={{
          background: 'rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {selected! + 1} / {memories.length}
      </div>

      {/* Main image area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative flex-1 w-full flex items-center justify-center max-h-[78vh]">
          <img
            src={currentMemory.image}
            alt={currentMemory.title}
            className="max-h-[78vh] max-w-full object-contain rounded-lg"
            style={{
              boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
            }}
          />

          {/* Prev */}
          <motion.button
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={previousImage}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              backdropFilter: 'blur(12px)',
            }}
          >
            ‹
          </motion.button>

          {/* Next */}
          <motion.button
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextImage}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              backdropFilter: 'blur(12px)',
            }}
          >
            ›
          </motion.button>
        </div>

        {/* Bottom info — simple & premium */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-2xl mt-6 mb-8 px-2"
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-playfair text-2xl md:text-3xl text-white font-medium tracking-tight">
                {currentMemory.title}
              </h2>
              <p className="font-inter text-sm text-white/55 mt-1.5 leading-relaxed max-w-md">
                {currentMemory.caption}
              </p>
              <p className="font-inter text-xs text-pink-300/70 mt-3 tracking-wide">
                {currentMemory.date}
              </p>
            </div>

            {/* Subtle like only */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => toggleLike(currentMemory.id)}
              className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{
                background: liked.includes(currentMemory.id)
                  ? 'rgba(255,61,122,0.25)'
                  : 'rgba(255,255,255,0.08)',
                border: liked.includes(currentMemory.id)
                  ? '1px solid rgba(255,61,122,0.4)'
                  : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {liked.includes(currentMemory.id) ? '❤️' : '🤍'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

</motion.div>

);
}