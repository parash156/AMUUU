import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onBack: () => void;
  dark: boolean;
}

const conversations = [
  {
    id: 1,
    title: "The night we first talked 🌙",
    date: "JUN 19, 2026 • 08:46 PM",
    messages: [
      { me: true, text: "Same problem here😂 Any recommendations?", time: "08:46 PM" },
      { me: false, text: "I am actually not watching any tho", time: "09:26 PM" },
      { me: false, text: "Teach you lesson maybe", time: "09:26 PM" },
      { me: false, text: "📹 Reel", time: "09:28 PM" },
      { me: true, text: "Ohh, I haven't watched this one yet. What genre is it?", time: "09:30 PM" },
      { me: false, text: "Bullying", time: "09:30 PM" },
      { me: true, text: "Ooh", time: "09:30 PM" },
      { me: false, text: "And  most of the episodes are based on real life incidents", time: "09:30 PM" },
      { me: true, text: "Interesting 🧐", time: "09:31 PM" },
      { me: true, text: "Any other drama reco..?", time: "09:35 PM" },
      { me: true, text: "Recommend me your favorite one", time: "09:36 PM" },
      { me: false, text: "First frost", time: "09:37 PM" },
      { me: false, text: "It’s Chinese but my favorite", time: "09:37 PM" },
      { me: false, text: "I can so relate with the female lead so I love that character so much and the male lead omg", time: "09:37 PM" },
      { me: true, text: "Chalxa Chinese ni 😅", time: "09:37 PM" },
      { me: false, text: "That’s the exact kind of man I want  in my life …", time: "09:37 PM" },
      { me: true, text: "Okey must watch drama fir 😅", time: "09:37 PM" },
      { me: false, text: "Umm", time: "09:37 PM" },
      { me: true, text: "▶️ Photo", time: "09:38 PM" },
      { me: false, text: "Yes that one", time: "09:38 PM" },
      { me: false, text: "Mero standard in man Kati high garaidiyera koi Mann pardaina malai ahile", time: "09:38 PM" },
      { me: true, text: "Haha", time: "09:39 PM" },
      { me: true, text: "Yehi harxu 🙌🏻", time: "09:39 PM" },
    ],
  },
  {
    id: 2,
    title: "Reel Exchange ▶️",
    date: "JUN 19, 2026 • 10:44 PM",
    messages: [
      { me: false, text: "📹 Reel", time: "10:44 PM" },
      { me: true, text: "Herdai xu ramro lagdei xa so far so good", time: "10:51 PM" },
      { me: false, text: "Okkk", time: "10:51 PM" },
      { me: true, text: "▶️ Photo", time: "10:51 PM" },
      { me: false, text: "❤️", time: "10:51 PM" },
      { me: true, text: "Close to heart wala drama ho timro ?", time: "10:52 PM" },
      { me: false, text: "Umm Mero fav", time: "10:52 PM" },
      { me: true, text: "I can't guarantee about others but i will learn to be like him 🥲", time: "10:52 PM" },
      
    ],
  },
  {
    id: 3,
    title: "Drama Updates 🎬 ",
    date: "JUN 20, 2026 • 2:03 AM",
    messages: [
      { me: true, text: "3 Ep done", time: "02:03 AM" },
      { me: false, text: "Yee", time: "02:02 PM" },
      { me: false, text: "📹 Reel", time: "02:46 PM" },
      { me: true, text: "Now I get why you said your standards are high ❤️", time: "02:56 PM" },
      { me: false, text: "❤️the bar that he set", time: "02:56 PM" },
      { me: false, text: "In what episode ?u are watching rn", time: "02:56 PM" },
      { me: true, text: "Bharkhar uthya ma", time: "02:57 PM" },
      { me: true, text: "Khana khako bharkhar", time: "02:57 PM" },
      { me: false, text: "😂😂😂yeee", time: "02:57 PM" },
      { me: true, text: "Feri continue garxu ek xin ma ", time: "02:57 PM" },
      { me: false, text: "Hahaha 😂", time: "02:58 PM" },
    
    ],
  },
  
  {
    id: 4,
    title: "The First Frost ❄️",
    date: "JUN 26, 2026 • 02:24 PM",
    messages: [
      { me: true, text: "▶️ Video", time: "02:24 AM" },
      { me: true, text: "I finally finished this Drama ❤️", time: "02:25 AM" },
      { me: true,
       text: "First of all thank you for recommending it. I honestly didn't expect it to affect me this much.\n\n The thing I loved most wasn't just the romance it was how every character carried their own pain while still trying to move forward. Sang Yan's love, Wen Yifan's healing journey, and especially the bond she had with her father... tyo scenes haru le chai sachikai emotional 💔 banayo.. Those moments really stay with me\n\nAba chai I understand why you said you relate to the female lead. I don't know your reason and I won't assume anything, but if there's ever a story behind it and you feel like sharing someday, I'd be happy to listen.",
       time: "02:36 AM"
      },
      { me: true,
       text: "And also I remembered all those reels and quotes you repost on Instagram. Aba bujhe... maybe those weren't just random reposts. Sometimes people repost things that express feelings they can't really put into words. If that's true for you too, I hope life gives you all the happiness and peace you deserve🤍",
       time: "02:38 AM"
      },
      { me: true,
       text: "I think The First Frost is really special Drama to you I got curious... so I did a little investigation😅 I found your TikTok too, and even there, The First Frost edits were everywhere Now I honestly understand why this drama means so much to you",
       time: "02:41 AM"
      },
      { me: true,
       text: "Thank you once again for the recommendation I'm glad I watched it Good night🌙❤️",
       time: "02:43 AM"
      },
      { me: false, text: "You are welcome 🤗", time: "06:27 AM" },
    ],
  },
 {
    id: 5,
    title: "The Book Conversation 📖",
    date: "JUN 28, 2026 • 9:10 AM",
    messages: [
      { me: true, text: "Author?", },
      { me: true, text: "▶️ Image", },
      { me: true, text: "This?", time: "09:10 PM" },
      { me: false, text: "Yes this", time: "09:46 PM" },
      { me: true, text: "Found it! 😄?",},
      { me: true, text: "PDF", time: "09:47 PM" },
      { me: false, text: "Send it please?", time: "09:51 PM" },
      { me: true, text: "How", },
      { me: true, text: "K ma pathai dim", time: "09:51 PM" },
      { me: false, text: "Mail ?", time: "09:52 PM" },
      { me: true, text: "ok give", time: "09:52 PM" },
      { me: false, text: "amisha1617@gmail.com", time: "09:53 PM" },
      { me: true, text: "done", time: "09:56 PM" },
      { me: false, text: "Okay let me check", time: "09:56 PM" },
      { me: true, text: "huss", time: "09:56 PM" },
      { me: false, text: "Awwwww thank you so much 🌷🌸", time: "09:56 PM" },
      { me: true, text: "Anything for a fellow The First Frost fan 😅", time: "09:58 PM" },
    ],
  },
  {
    id: 6,
    title: "My Fav 💬",
    date: "JUL 17, 2026 • 7:01 AM",
    messages: [
      { me: false, text: "📹 Reel", time: "07:01 AM" },
      { me: false, text: "Yo drama herana",time: "07:01 AM"  },
      { me: true, text: "Huss Huncha ❤️", },
      { me: true, text: "Timlay heryau?",time: "08:38 AM"  },
    ],
  },

  {
    id: 7,
    title: "Who's That Guy? 👀",
    date: "JUL 28, 2026 • 10:06 PM",
    messages: [
       { me: true, text: "@omkarr814",},
       { me: true, text: "Ko ho yo chinxau?", time: "10:06 PM" },
       { me: false, text: "Why? 😂", time: "10:06 PM" },
       { me: true, text: "Story heri rako hunxa k 😂", time: "10:07 PM" },
       { me: false, text: "Yee 😆", time: "10:07 PM" },
       { me: true, text: "Timi mutual xau", time: "10:07 PM" },
       { me:false, text: "Hola ni koi", time: "10:07 PM" },
       { me: true, text: "Boyfriend ta haina timro 🤣", time: "10:07 PM" },
       { me:false, text: "Xhya Haina",},
       { me:false, text: "Tara bihe ko kura aathyo", },
       { me:false, text: "Ani hunna vaneyko", time: "10:07 PM" },
       { me:true, text: "Wah chinay ko manchya ho ki random ho koi", time: "10:08 PM"  },
       { me: false, text: "Random thyo ahile ta chinxu nai vanam",},
       { me:false, text: "Uhilei ho 😂", time: "10:08 PM" },
       { me:true, text: "Jailai junai story heri ra hunxa 🤣", time: "10:08 PM" },
       { me:false, text: "Hahahaha 🤣🤣🤣", time: "10:08 PM" },
       { me:false, text: "Maybe he is suspicious ", time: "10:08 PM" },
       { me:false, text: "Thinking sth is going on ", time: "10:08 PM" },
       { me: true, text: "Haha 🤣",},
  { me: true, text: "Kala jadu garna ako hola sayad timi mathi 😂", time: "10:15 PM" },
  { me: false, text: "😂😂😂doesn't work", time: "10:16 PM" },
  { me: false, text: "I am Leo ♌", time: "10:17 PM" },
  { me: true, text: "Strong one", time: "10:18 PM" },
  {me: true, text: "600 following xan feri fake id jastai 28 followers matra. Ani timlai follow back deko raixau.",},
  {
    me: true,
    text: "Following ma feri sab kti matra xan 🤣",
    time: "10:20 PM"
  },

  { me: false, text: "Umm", time: "10:21 PM" },
  { me: false, text: "Kati patak block handa ni message ta garthyo 😂", time: "10:21 PM" },
   { me: true, text: "Police ma case halam ki bhannu ni 🤣", time: "10:30 PM" },

  { me: false, text: "😂😂😂vayo xoddeu", time: "10:15 PM" },
  { me: false, text: "Oeey kehi text nagara hai feri", time: "10:15 PM" },

  { me: true, text: "Nai nai gardaina ma 😂", time: "10:32 PM" },
  { me: true, text: "Story halna pako hudaina seen hunxa k 🤣", time: "10:32 PM" },
  { me: false, text: "😂😂😂may be he likes u ", time: "10:34 PM" },
  { me: true, text: "Kati bela story halxa ani herxu jasto", time: "10:33 PM" },
  { me: false, text: "😂😂😂hahaha notifications on xha hola ni ta", time: "10:36 PM" },
  { me: true, text: "Bass yehi din baki xa 🤣🤣",},
  { me: true, text: "Very dangerous fir toh 😂", time: "10:37 PM" },
  { me: false, text: "🤣🤣 hahahah", time: "10:41 PM" },
  {
    me: true,
    text: "Asti tira ni herya thiyo ko raixa bhanay ra id check garya ko repost ma k nurse gf k k testai halya thiyo timro boyfriend hola sochi ra thiya ma 🤣",
    time: "10:39 PM"
  },

  { me: true, text: "Diwana po raixa 😂", time: "10:40 PM" },
  { me: false, text: "Xhya haina xhiii", time: "10:40 PM" },
  { me: true, text: "📹 Reel", time: "10:24 PM" },
  { me: true, text: "Yo thiyo", time: "10:25 PM" },
  { me: false, text: "Xhya haina xhiii", time: "10:25 PM" },
 ],
  },

  
];

export default function ChatMemories({ onBack, dark }: Props) {
  const [activeConvo, setActiveConvo] = useState<typeof conversations[0] | null>(null);

  const bg = dark
    ? 'linear-gradient(180deg, #0a0015 0%, #1a0030 100%)'
    : 'linear-gradient(135deg, #f0fff4 0%, #f0f0ff 100%)';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4"
      style={{ background: bg }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={activeConvo ? () => setActiveConvo(null) : onBack}
            className="flex items-center gap-2 font-inter text-sm cursor-none px-4 py-2 rounded-full glass"
            style={{ color: dark ? '#ff9cc0' : '#007AFF', border: '1px solid rgba(0,122,255,0.2)' }}
          >
            ← {activeConvo ? 'Chats' : 'Back'}
          </motion.button>
          {!activeConvo && (
            <div>
              <h1 className="font-playfair text-3xl font-bold" style={{ color: dark ? '#fff' : '#1a1a1a' }}>
                💬 Sweet Messages
              </h1>
              <p className="font-dancing text-lg" style={{ color: dark ? '#adf' : '#007AFF' }}>
                our favorite conversations
              </p>
            </div>
          )}
          {activeConvo && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: 'linear-gradient(135deg, #ff6b9d, #c9b8e8)' }}>
                💕
              </div>
              <div>
                <p className="font-inter font-semibold text-sm" style={{ color: dark ? '#fff' : '#1a1a1a' }}>
                  {activeConvo.title.split(' ').slice(0, -1).join(' ')}
                </p>
                <p className="font-inter text-xs" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#999' }}>
                  {activeConvo.date}
                </p>
              </div>
            </div>
          )}
        </div>

        {!activeConvo ? (
          /* Conversation list */
          <div className="space-y-3">
            {conversations.map((convo, i) => (
              <motion.button
                key={convo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveConvo(convo)}
                className="w-full cursor-none rounded-2xl p-4 flex items-center gap-4 text-left shadow-md"
                style={{
                  background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                  border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,122,255,0.1)',
                }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #ff6b9d44, #c9b8e844)' }}>
                  💬
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-inter font-semibold text-sm" style={{ color: dark ? '#fff' : '#1a1a1a' }}>
                      {convo.title}
                    </p>
                    <p className="font-inter text-xs flex-shrink-0 ml-2" style={{ color: dark ? 'rgba(255,255,255,0.4)' : '#999' }}>
                      {convo.date.split(' • ')[1]}
                    </p>
                  </div>
                  <p className="font-inter text-xs truncate" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>
                    {convo.messages[convo.messages.length - 1].text}
                  </p>
                </div>
                <div className="w-5 h-5 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.3)' : '#ccc'} strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          /* Chat view */
          <div className="flex flex-col gap-2">
            {/* Date header */}
            <div className="text-center mb-4">
              <span className="font-inter text-xs px-3 py-1 rounded-full"
                style={{ background: dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb', color: dark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>
                {activeConvo.date}
              </span>
            </div>

            {activeConvo.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.me ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex ${msg.me ? 'justify-end' : 'justify-start'} items-end gap-2`}
              >
                {!msg.me && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mb-1"
                    style={{ background: 'linear-gradient(135deg, #ff6b9d, #c9b8e8)' }}>
                    💕
                  </div>
                )}
                <div className="max-w-xs">
                  <div
                    className={`px-4 py-2.5 ${msg.me ? 'imessage-bubble-right' : 'imessage-bubble-left'}`}
                    style={msg.me
                      ? { background: '#007AFF', color: 'white', borderRadius: '20px 20px 4px 20px' }
                      : { background: dark ? 'rgba(255,255,255,0.12)' : '#E9E9EB', color: dark ? '#fff' : '#1c1c1e', borderRadius: '20px 20px 20px 4px' }
                    }
                  >
                    <p className="font-inter text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <p className={`font-inter text-xs mt-1 ${msg.me ? 'text-right' : 'text-left'}`}
                    style={{ color: dark ? 'rgba(255,255,255,0.3)' : '#999' }}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
