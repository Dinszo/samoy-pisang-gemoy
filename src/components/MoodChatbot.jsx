import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Heart,
  ArrowRight,
  RotateCcw,
  Smile,
  CloudRain,
  Sparkles,
  BookOpen,
  Brain,
  HeartCrack,
} from "lucide-react";
import "./MoodChatbot.css";

const recommendationPhotos = {
  happy: {
    src: "/images/pisang-imut-strawbery-keju.png",
    product: "Pisang Imut",
    note: "Contoh penyajian Stroberi dengan tambahan keju",
  },
  tasks: {
    src: "/images/pisang-krebo-coklat-matcha.png",
    product: "Pisang Krebo",
    note: "Foto varian Cokelat Matcha",
  },
  thoughts: {
    src: "/images/pisang-imut-coklat-keju.png",
    product: "Pisang Imut",
    note: "Foto Cokelat dengan Additional Keju",
  },
  heartbreak: {
    src: "/images/pisang-imut-straw-cokltat.png",
    product: "Pisang Imut",
    note: "Foto varian Stroberi Cokelat",
  },
};

const recommendations = {
  happy: {
    flavor: "Stroberi",
    category: "BASE",
    message:
      "Yeay! Lagi happy ya! Rasa stroberi yang manis cocok buat nemenin momen bahagiamu. Semoga makin seru!",
  },
  tasks: {
    flavor: "Cokelat Matcha",
    category: "MIX",
    message:
      "Wah, tugas lagi numpuk ya? Semangat! Cokelat Matcha bisa jadi camilan manis buat nemenin waktu istirahatmu.",
  },
  thoughts: {
    flavor: "Cokelat Keju",
    category: "COKELAT + ADDITIONAL KEJU",
    message:
      "Lagi banyak pikiran? Semoga semuanya segera terasa lebih ringan. Kalau mau ngemil, cokelat dengan tambahan keju bisa jadi pilihanmu.",
  },
  heartbreak: {
    flavor: "Stroberi Cokelat",
    category: "MIX",
    message:
      "Lagi patah hati ya? Semoga pelan-pelan membaik. Sambil menikmati waktu untuk diri sendiri, coba kombinasi Stroberi Cokelat!",
  },
};

const moodResponses = {
  happy: {
    liked:
      "Yeay, kamu suka! Senang banget dengarnya! Pertahankan semangat dan senyum manismu hari ini, ya. Semoga hal-hal baik terus datang dan hari bahagiamu makin berwarna. Yuk, rayakan momen kecilmu bareng Samoy!",

    other:
      "Hehe, belum cocok ya? Nggak apa-apa, bestie! Yang penting mood happy kamu tetap terjaga. Masih banyak rasa manis yang bisa bikin harimu makin seru. Yuk, cari favoritmu di menu Samoy!",
  },

  tasks: {
    liked:
      "Yeay, cocok! Semangat ya ngerjain tugasnya! Jangan lupa istirahat, minum air, dan kasih waktu buat diri sendiri. Kerjain satu per satu, nggak harus semuanya selesai sekaligus. Samoy siap nemenin waktu rehatmu!",

    other:
      "Belum cocok sama rasanya? Nggak masalah! Tugas boleh banyak, tapi jangan lupa jaga energi dan istirahat sebentar, ya. Semangat, kamu pasti bisa menyelesaikannya satu per satu. Yuk, cari camilan lain yang kamu suka!",
  },

  thoughts: {
    liked:
      "Yeay, kamu suka! Kalau lagi banyak pikiran, coba kasih diri sendiri waktu buat istirahat sebentar, ya. Nggak semua hal harus diselesaikan hari ini. Semoga pikiranmu perlahan lebih tenang. Semangat terus, bestie!",

    other:
      "Nggak cocok juga nggak apa-apa, kok. Kalau pikiran lagi penuh, pelan-pelan aja ya. Ambil waktu buat diri sendiri dan jangan terlalu memaksakan semuanya. Semoga harimu terasa lebih ringan. Yuk, lihat pilihan rasa Samoy lainnya!",
  },

  heartbreak: {
    liked:
      "Yeay, kamu suka! Walaupun sekarang lagi patah hati, semoga masih ada hal-hal kecil yang bisa bikin kamu tersenyum. Nggak perlu buru-buru buat merasa baik lagi. Pelan-pelan aja, ya. Kamu tetap pantas mendapatkan kebahagiaan!",

    other:
      "Belum menemukan rasa yang cocok? Nggak apa-apa, bestie. Sama seperti proses pulih dari patah hati, menemukan hal yang kamu suka juga nggak harus buru-buru. Jangan lupa sayangi diri sendiri, ya. Yuk, cari rasa lain yang mungkin lebih cocok!",
  },
};

const initialMessages = [
  { id: 1, type: "bot", text: "Hai bestie! Aku Samoy, teman ngemil kamu!" },
  {
    id: 2,
    type: "bot",
    text: "Yuk, cari tahu camilan yang cocok sama mood kamu hari ini!",
  },
];

const reasons = {
  tasks: "Banyak tugas",
  thoughts: "Banyak pikiran",
  heartbreak: "Putus cinta",
};

export default function MoodChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [choices, setChoices] = useState("welcome");
  const [pending, setPending] = useState(null);
  const [typing, setTyping] = useState("");
  const [mood, setMood] = useState(null);
  const [reason, setReason] = useState(null);
  const chatBodyRef = useRef(null);
  const nextId = useRef(3);
  const selectedKey = mood === "happy" ? "happy" : reason;
  const result = recommendations[selectedKey];

  // Satu pesan bot diketik sampai tuntas sebelum pesan berikutnya muncul.
  // Pesan selesai dipindahkan ke riwayat sehingga tidak dianimasikan ulang.
  useEffect(() => {
    if (!pending) return;

    if (pending.items.length === 0) {
      setChoices(pending.nextChoices);
      setPending(null);
      setTyping("");
      return;
    }

    const item = pending.items[0];
    if (item.type === "card") {
      setMessages((prev) => [...prev, { ...item, id: nextId.current++ }]);
      setPending((prev) => prev && { ...prev, items: prev.items.slice(1) });
      return;
    }

    const text = item.text;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, type: "bot", text },
      ]);
      setPending((prev) => prev && { ...prev, items: prev.items.slice(1) });
      return;
    }

    let index = 0;
    setTyping("");
    const timer = window.setInterval(() => {
      index = Math.min(index + 2, text.length);
      setTyping(text.slice(0, index));
      if (index === text.length) {
        window.clearInterval(timer);
        setMessages((prev) => [
          ...prev,
          { id: nextId.current++, type: "bot", text },
        ]);
        setTyping("");
        setPending((prev) => prev && { ...prev, items: prev.items.slice(1) });
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [pending]);

  useEffect(() => {
    if (!isOpen || !chatBodyRef.current) return;
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages, typing, choices, isOpen]);

  function addUserAndReply(userText, items, nextChoices) {
    if (pending) return;
    if (userText) {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, type: "user", text: userText },
      ]);
    }
    setChoices(null);
    setPending({
      items: items.map((item) =>
        typeof item === "string" ? { type: "bot", text: item } : item,
      ),
      nextChoices,
    });
  }

  function chooseMood(value) {
    setMood(value);
    setReason(null);
    if (value === "happy") {
      addUserAndReply(
        "Hari ini aku lagi senang!",
        [
          recommendations.happy.message,
          { type: "card", key: "happy" },
          "Gimana bestie, suka nggak sama rekomendasinya?",
        ],
        "feedback",
      );
    } else {
      addUserAndReply(
        "Aku lagi sedih.",
        [
          "Aduh, sedih kenapa nih? Pilih yang paling sesuai sama perasaanmu, ya.",
        ],
        "reason",
      );
    }
  }

  function chooseReason(value) {
    setReason(value);
    addUserAndReply(
      `Aku lagi ${reasons[value].toLowerCase()}.`,
      [
        recommendations[value].message,
        { type: "card", key: value },
        "Gimana bestie, suka nggak sama rekomendasinya?",
      ],
      "feedback",
    );
  }

  function chooseFeedback(liked) {
    const response = moodResponses[selectedKey];
    if (!response || !result) return;
    addUserAndReply(
      liked ? "Suka banget!" : "Pengen yang lain!",
      [
        liked ? response.liked : response.other,
        liked
          ? `Kalau sudah siap ngemil, kamu bisa pilih Pisang Krebo atau Pisang Imut dengan rasa ${result.flavor}!`
          : "Ada Base Cokelat, Stroberi, Matcha; Mix Cokelat Stroberi, Cokelat Matcha, Stroberi Matcha; dan Additional Keju. Yuk, pilih yang kamu suka!",
      ],
      "finished",
    );
  }

  function resetChat() {
    setPending(null);
    setTyping("");
    setMood(null);
    setReason(null);
    setMessages(initialMessages);
    setChoices("mood");
  }

  function goToMenu() {
    setIsOpen(false);
    const menu = document.getElementById("menu");
    if (!menu) return;
    menu.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "#menu");
  }

  return (
    <div className="samoy-chatbot">
      {isOpen && (
        <section className="samoy-chat-window" aria-label="Samoy Mood Bot">
          <div className="samoy-chat-header">
            <div className="samoy-bot-avatar">
              <img src="/images/logo-pisang-gemoy.jpeg" alt="" />
            </div>
            <div className="samoy-bot-info">
              <strong>Samoy Mood Bot</strong>
              <span>
                <span className="samoy-online-dot" /> Your little mood buddy
              </span>
            </div>
            <button
              type="button"
              className="samoy-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup chatbot"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="samoy-chat-body"
            ref={chatBodyRef}
            aria-label="Percakapan Samoy"
          >
            <div className="samoy-chat-date">TODAY'S SWEET MOMENT ✦</div>
            {messages.map((message) =>
              message.type === "card" ? (
                <div className="samoy-recommendation" key={message.id}>
                  <span className="samoy-rec-label">✦ SAMOY RECOMMENDS ✦</span>
                  <div className="samoy-rec-image-wrap">
                    <img
                      className="samoy-rec-image"
                      src={recommendationPhotos[message.key].src}
                      alt={`${recommendationPhotos[message.key].product} - ${recommendations[message.key].flavor}`}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          "/images/logo-pisang-gemoy.jpeg";
                      }}
                    />
                  </div>
                  <h3>{recommendations[message.key].flavor}</h3>
                  <p>{recommendations[message.key].category}</p>
                  <span className="samoy-rec-caption">
                    {recommendationPhotos[message.key].product} ·{" "}
                    {recommendationPhotos[message.key].note}
                  </span>
                </div>
              ) : (
                <div
                  key={message.id}
                  className={
                    message.type === "user"
                      ? "samoy-user-message"
                      : "samoy-bot-message"
                  }
                >
                  {message.text}
                </div>
              ),
            )}

            {pending && pending.items[0]?.type === "bot" && (
              <div
                className="samoy-bot-message"
                aria-label="Samoy sedang menjawab"
              >
                <span className="samoy-typing-text-content">{typing}</span>
                <span className="samoy-text-cursor" aria-hidden="true">
                  |
                </span>
              </div>
            )}

            {choices === "welcome" && (
              <div className="samoy-chat-options">
                <button
                  type="button"
                  className="samoy-mood-start"
                  onClick={() =>
                    addUserAndReply(
                      "Tebak Mood Aku!",
                      ["Mood kamu hari ini gimana nih?"],
                      "mood",
                    )
                  }
                >
                  <Sparkles size={17} /> Tebak Mood Aku!{" "}
                  <ArrowRight size={17} />
                </button>
              </div>
            )}

            {choices === "mood" && (
              <div className="samoy-chat-options">
                <button
                  type="button"
                  className="samoy-mood-option happy"
                  onClick={() => chooseMood("happy")}
                >
                  <Smile size={19} /> Senang!
                </button>
                <button
                  type="button"
                  className="samoy-mood-option sad"
                  onClick={() => chooseMood("sad")}
                >
                  <CloudRain size={19} /> Sedih
                </button>
              </div>
            )}

            {choices === "reason" && (
              <div className="samoy-chat-options">
                <button
                  type="button"
                  className="samoy-mood-option"
                  onClick={() => chooseReason("tasks")}
                >
                  <BookOpen size={18} /> Banyak Tugas
                </button>
                <button
                  type="button"
                  className="samoy-mood-option"
                  onClick={() => chooseReason("thoughts")}
                >
                  <Brain size={18} /> Banyak Pikiran
                </button>
                <button
                  type="button"
                  className="samoy-mood-option"
                  onClick={() => chooseReason("heartbreak")}
                >
                  <HeartCrack size={18} /> Putus Cinta
                </button>
              </div>
            )}

            {choices === "feedback" && (
              <div className="samoy-chat-options">
                <button
                  type="button"
                  className="samoy-mood-option happy"
                  onClick={() => chooseFeedback(true)}
                >
                  <Heart size={18} /> Suka Banget!
                </button>
                <button
                  type="button"
                  className="samoy-mood-option sad"
                  onClick={() => chooseFeedback(false)}
                >
                  <RotateCcw size={18} /> Pengen yang Lain
                </button>
              </div>
            )}

            {choices === "finished" && (
              <div className="samoy-chat-result">
                <button
                  type="button"
                  className="samoy-rec-button"
                  onClick={goToMenu}
                >
                  Explore Our Menu <ArrowRight size={17} />
                </button>
                <button
                  type="button"
                  className="samoy-retry-button"
                  onClick={resetChat}
                >
                  <RotateCcw size={15} /> Tebak Mood Lagi
                </button>
              </div>
            )}
          </div>
          <div className="samoy-chat-footer">
            <Heart size={13} fill="currentColor" /> Made with love by Samoy
            Pisang Gemoy
          </div>
        </section>
      )}
      <button
        type="button"
        className="samoy-floating-button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Tutup Samoy Mood Bot" : "Buka Samoy Mood Bot"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={27} />}
        {!isOpen && <span className="samoy-chat-notification" />}
      </button>
    </div>
  );
}
