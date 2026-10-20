import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  Music2,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { products, socials } from "./data/siteData";
import MenuPreview from "./components/MenuPreview";
import MoodChatbot from "./components/MoodChatbot";
import BackgroundMusic from "./components/BackgroundMusic";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Our Menu", href: "#menu" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` }}>
      {children}
    </div>
  );
}

function Sticker({ children, tone = "pink", className = "" }) {
  return (
    <span className={`sticker sticker-${tone} ${className}`}>{children}</span>
  );
}

function Ribbon({ message = "SWEET LITTLE MOMENTS", className = "" }) {
  return (
    <div className={`ribbon ${className}`} aria-hidden="true">
      <div className="ribbon-track">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i}>
            <Star size={14} fill="currentColor" /> {message}{" "}
            <Star size={14} fill="currentColor" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* LOGO */}
        <a
          className="brand"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="Samoy Pisang Gemoy, kembali ke Home"
        >
          <span className="brand-mark">
            <img src="/images/logo-pisang-gemoy.jpeg" alt="" />
          </span>

          <span>
            SAMOY
            <span className="brand-small">PISANG GEMOY</span>
          </span>
        </a>

        {/* NAVIGATION */}
        <nav
          id="samoy-main-navigation"
          className={`site-nav ${open ? "nav-open" : ""}`}
          aria-label="Navigasi utama"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}

          <a className="nav-cta" href="#order" onClick={() => setOpen(false)}>
            ORDER NOW
            <ArrowUpRight size={16} />
          </a>

          {/* BACKSOUND - HANYA DI NAVBAR */}
          <BackgroundMusic />
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="samoy-main-navigation"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          onClick={() => setOpen((previous) => !previous)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-shell">
        <div className="hero-topline">
          <span>
            <span className="status-dot" /> MADE WITH FRIENDSHIP
          </span>
          <span>YOUR DAILY HAPPY SNACK ✳</span>
        </div>

        <div className="hero-stage">
          <div className="hero-copy">
            <Sticker tone="lilac" className="hero-sticker">
              A LITTLE SNACK
              <br />
              YOU'LL LOVE! ✳
            </Sticker>

            <div className="hero-title-wrap">
              <p className="eyebrow">A LITTLE SNACK, A WARMER MOMENT.</p>
              <h1>
                GOOD
                <br />
                <span className="hero-outline">SNACKS.</span>
                <br />
                GEMOY <span className="hero-pink">VIBES!</span>
              </h1>
            </div>

            <div className="hero-bottom">
              <p>
                Berawal dari empat sahabat, hadir dua camilan pisang yang
                renyah, manis, dan siap menemani momen kecilmu.
              </p>
              <a href="#menu" className="pill-button pill-button-dark">
                EXPLORE OUR MENU <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-logo-halo">
              <img
                className="hero-logo"
                src="/images/logo-pisang-gemoy.jpeg"
                alt="Logo Pisang Gemoy dengan empat karakter sahabat"
              />
            </div>
            <span className="hero-spark hero-spark-one" aria-hidden="true">
              ✳
            </span>
            <span className="hero-spark hero-spark-two" aria-hidden="true">
              ✦
            </span>
            <span className="hero-spark hero-spark-three" aria-hidden="true">
              ✧
            </span>
            <a href="#menu" className="hero-scroll">
              SCROLL TO EXPLORE <ArrowDownRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <Ribbon
        message="PISANG GEMOY • SHARE THE HAPPY"
        className="hero-ribbon"
      />
    </section>
  );
}

function SectionHeader({ label, title, accent, description, className = "" }) {
  return (
    <Reveal className={`section-heading ${className}`}>
      <span className="eyebrow eyebrow-dark">✳ {label} ✳</span>
      <h2>
        {title} <em>{accent}</em>
      </h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

function ProductCard({ product, index }) {
  const colors = ["yellow", "pink"];

  const productImages = [
    "/images/pisang-krebo-coklat-matcha-keju.png",
    "/images/pisang-imut-strawberry-matcha-keju.png",
  ];

  const baseFlavors = product.flavors.slice(0, 3);
  const mixFlavors = product.flavors.slice(3, 6);

  return (
    <Reveal
      className={`product-card product-${colors[index % colors.length]}`}
      delay={index * 90}
    >
      <div className="product-card-top">
        <span>{String(index + 1).padStart(2, "0")} / SAMOY ORIGINAL</span>
        <span>✳</span>
      </div>

      <div className="product-visual">
        <img
          src={productImages[index]}
          alt={`Foto ${product.name} Samoy Pisang Gemoy`}
          className="product-menu-image"
          loading="lazy"
        />

        <Sticker
          tone={index === 0 ? "pink" : "lilac"}
          className="product-sticker"
        >
          CRISPY
          <br />& SWEET!
        </Sticker>
      </div>

      <div className="product-card-body">
        <div className="product-title-row">
          <h3>{product.name}</h3>
          <span className="price-pending">Start From Rp.10.000</span>
        </div>

        <p className="product-tagline">{product.tagline}</p>

        <p className="product-description">{product.description}</p>

        <div
          className="product-flavor-groups"
          aria-label={`Pilihan rasa ${product.name}`}
        >
          <div className="product-flavor-group">
            <div className="flavor-group-heading">
              <span className="flavor-group-title">BASE</span>
              <span className="flavor-group-count">3 FLAVORS</span>
            </div>

            <div className="flavor-tags">
              {baseFlavors.map((flavor) => (
                <span key={flavor}>{flavor}</span>
              ))}
            </div>
          </div>

          <div className="product-flavor-group">
            <div className="flavor-group-heading">
              <span className="flavor-group-title">MIX</span>
              <span className="flavor-group-count">3 COMBINATIONS</span>
            </div>

            <div className="flavor-tags">
              {mixFlavors.map((flavor) => (
                <span key={flavor}>{flavor}</span>
              ))}
            </div>
          </div>

          <div className="product-flavor-group">
            <div className="flavor-group-heading">
              <span className="flavor-group-title">ADDITIONAL</span>
              <span className="flavor-group-count">EXTRA TOPPING</span>
            </div>

            <div className="flavor-tags">
              <span>Keju</span>
            </div>
          </div>
        </div>

        <a href="#order" className="product-order">
          ORDER NOW
          <ArrowUpRight size={18} />
        </a>
      </div>
    </Reveal>
  );
}

function OurMenu() {
  return (
    <section id="menu" className="menu-section section-pad">
      <div className="container">
        <SectionHeader
          label="OUR SIGNATURE SNACKS"
          title="PICK YOUR"
          accent="HAPPY!"
          description="Dua camilan spesial, banyak alasan buat senyum. Pilih favoritmu!"
        />
        <div className="products-grid">
          {products.map((p, i) => (
            <ProductCard product={p} index={i} key={p.name} />
          ))}
        </div>
        <p className="fine-note">
          * Foto produk merupakan visual promosi yang telah disunting. Harga
          akan diperbarui setelah dikonfirmasi.
        </p>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section id="about" className="about-section section-pad">
      <div className="container about-grid">
        <Reveal className="about-image-panel">
          <div className="about-abstract a-one" />
          <div className="about-abstract a-two" />
          <img
            src="/images/logo-pisang-gemoy.jpeg"
            alt="Empat karakter sahabat pada logo Samoy Pisang Gemoy"
          />
          <Sticker tone="yellow" className="about-sticker">
            FOUR FRIENDS
            <br />
            ONE SWEET STORY ♥
          </Sticker>
        </Reveal>
        <Reveal className="about-copy" delay={90}>
          <span className="eyebrow eyebrow-dark">✳ GET TO KNOW US</span>
          <h2>
            MADE WITH
            <br />
            <em>FRIENDSHIP.</em>
            <br />
            SHARED WITH
            <br />
            WARMTH.
          </h2>
          <p>
            Samoy Pisang Gemoy lahir dari ide sederhana empat perempuan —{" "}
            <strong>Mbak Nad, Mbak Dyn, Mbak Naj, dan Mbak Rev</strong> — yang
            ingin menciptakan sesuatu bersama.
          </p>
          <p>
            Terinspirasi dari hangatnya kebersamaan dan kebahagiaan saat berbagi
            camilan, kami menghadirkan Pisang Krebo dan Pisang Imut. Bagi kami,
            camilan bukan hanya soal rasa, tetapi juga cerita, senyuman, dan
            kedekatan.
          </p>
          <a href="#benefits" className="pill-button pill-button-lime">
            WHY CHOOSE US <ArrowRight size={17} />
          </a>
        </Reveal>
      </div>
      <Ribbon
        message="MADE WITH LOVE • SHARED WITH FRIENDS"
        className="about-ribbon"
      />
    </section>
  );
}

const reasons = [
  [
    "01",
    "UNIQUE & CREATIVE",
    "Olahan pisang dengan bentuk dan karakter yang berbeda.",
    "pink",
  ],
  [
    "02",
    "MADE TO DELIGHT",
    "Camilan lezat yang cocok menemani berbagai momen.",
    "lilac",
  ],
  [
    "03",
    "CRISPY & SOFT",
    "Perpaduan tekstur renyah dan lembut yang menggugah selera.",
    "yellow",
  ],
  [
    "04",
    "SHARE THE HAPPINESS",
    "Camilan lebih menyenangkan saat dinikmati bersama.",
    "blue",
  ],
];

function WhyChooseUs() {
  return (
    <section id="benefits" className="benefits-section section-pad">
      <div className="container">
        <SectionHeader
          label="WHY CHOOSE SAMOY"
          title="LITTLE BITES."
          accent="BIG SMILES."
          description="Hal sederhana yang bikin Samoy terasa spesial."
        />
        <div className="benefits-grid">
          {reasons.map(([n, title, desc, tone], i) => (
            <Reveal
              key={n}
              delay={i * 70}
              className={`benefit benefit-${tone}`}
            >
              <span className="benefit-n">{n} ✳</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="benefit-star">✦</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section section-pad">
      <div className="container testimonials-layout">
        <Reveal>
          <span className="eyebrow eyebrow-dark">✳ SWEET WORDS</span>
          <h2>
            YOUR WORDS,
            <br />
            <em>OUR HAPPY.</em>
          </h2>
          <p>Setiap cerita manismu berarti bagi kami.</p>
        </Reveal>
        <Reveal className="testimonial-card" delay={100}>
          <span className="quote-mark">“</span>
          <h3>Your sweet words mean a lot to us.</h3>
          <p>Be the first to share your Samoy experience!</p>
          <span className="testimonial-heart">
            <Heart size={18} fill="currentColor" /> WAITING FOR YOUR STORY
          </span>
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  ["01", "CHOOSE YOUR SNACK", "Pilih Pisang Krebo atau Pisang Imut."],
  ["02", "CONTACT US", "Hubungi kami lewat kanal resmi yang tersedia."],
  ["03", "CONFIRM ORDER", "Tentukan varian, jumlah, harga, dan pengantaran."],
  ["04", "ENJOY YOUR MOMENT", "Nikmati camilan, lalu bagikan momen hangatnya!"],
];

function HowToOrder() {
  return (
    <section id="order" className="order-section section-pad">
      <div className="container">
        <SectionHeader
          label="EASY AS 1, 2, 3, 4"
          title="HOW TO"
          accent="ORDER?"
          description="Pesan Samoy cukup empat langkah mudah."
        />
        <div className="steps-grid">
          {steps.map(([n, title, desc], i) => (
            <Reveal className="step-card" delay={i * 90} key={n}>
              <span className="step-number">{n}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              {i < 3 && <ArrowRight className="step-arrow" size={20} />}
            </Reveal>
          ))}
        </div>
        <p className="order-disclaimer">
          Pemesanan dan pembayaran dilakukan melalui kanal eksternal resmi,
          bukan melalui website ini.
        </p>
        <a href="#contact" className="pill-button pill-button-dark order-cta">
          GO TO CONTACT <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

const socialDetails = [
  ["WhatsApp", MessageCircle, socials.whatsapp],
  ["Instagram", Instagram, socials.instagram],
  ["TikTok", Music2, socials.tiktok],
  ["ShopeeFood", ShoppingBag, socials.shopeeFood],
];

function ContactUs() {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="container contact-grid">
        <Reveal>
          <span className="eyebrow eyebrow-dark">✳ LET'S STAY CONNECTED</span>
          <h2>
            LET'S MAKE
            <br />
            <em>IT SWEETER!</em>
          </h2>
          <p>
            Punya pertanyaan atau ingin memesan camilan favoritmu? Kami senang
            bisa menjadi bagian dari momen manismu.
          </p>
          <span className="contact-deco">✳ SHARE A LITTLE HAPPINESS ✳</span>
        </Reveal>
        <Reveal className="contact-panel" delay={80}>
          <div className="contact-panel-heading">
            <span>FIND US HERE</span>
            <Sparkles size={22} />
          </div>
          {socialDetails.map(([name, Icon, url]) =>
            url ? (
              <a
                href={url}
                key={name}
                className="social-row"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <Icon size={21} /> {name}
                </span>
                <ArrowUpRight size={19} />
              </a>
            ) : (
              <div key={name} className="social-row social-disabled">
                <span>
                  <Icon size={21} /> {name}
                </span>
                <span className="soon-text">SEGERA HADIR</span>
              </div>
            ),
          )}
          <p className="social-note">
            Tautan baru aktif setelah akun resmi dikonfirmasi.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <a href="#home" className="footer-name">
            SAMOY <span>PISANG GEMOY</span>
          </a>
          <nav aria-label="Navigasi footer">
            {navItems.map((x) => (
              <a href={x.href} key={x.href}>
                {x.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>A Little Snack, A Warmer Moment.</span>
          <span>© 2026 Samoy Pisang Gemoy. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MenuPreview />
        <OurMenu />
        <AboutUs />
        <WhyChooseUs />
        <Testimonials />
        <HowToOrder />
        <ContactUs />
      </main>
      <Footer />

      <MoodChatbot />
    </>
  );
}
