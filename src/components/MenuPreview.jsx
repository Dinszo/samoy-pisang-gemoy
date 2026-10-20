import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import "./MenuPreview.css";

const variants = [
  {
    id: 1,
    number: "01",
    title: "Cokelat Keju",
    subtitle: "PISANG KREBO — COKELAT KEJU",
    description:
      "Pisang Krebo renyah dengan saus cokelat manis dan taburan keju yang melimpah.",
    image: "/images/pisang-krebo-coklat-keju.png",
    color: "#F5DFC5",
    accent: "#8C5A43",
  },
  {
    id: 2,
    number: "02",
    title: "Cokelat Matcha",
    subtitle: "PISANG KREBO — COKELAT MATCHA",
    description:
      "Perpaduan cokelat dan matcha creamy di atas Pisang Krebo yang renyah.",
    image: "/images/pisang-krebo-coklat-matcha.png",
    color: "#DDEBC2",
    accent: "#7E9E59",
  },
  {
    id: 3,
    number: "03",
    title: "Cokelat Matcha Keju",
    subtitle: "PISANG KREBO — COKELAT MATCHA KEJU",
    description:
      "Kombinasi topping cokelat, matcha, dan parutan keju dalam satu camilan.",
    image: "/images/pisang-krebo-coklat-matcha-keju.png",
    color: "#F8D6E2",
    accent: "#D97B9B",
  },
  {
    id: 4,
    number: "04",
    title: "Cokelat Keju",
    subtitle: "PISANG IMUT — COKELAT KEJU",
    description:
      "Gigitan pisang crispy dengan topping cokelat dan keju yang menggugah selera.",
    image: "/images/pisang-imut-coklat-keju.png",
    color: "#F4DFC9",
    accent: "#95634B",
  },
  {
    id: 5,
    number: "05",
    title: "Strawberry Cokelat",
    subtitle: "PISANG IMUT — STRAWBERRY COKELAT",
    description:
      "Pisang Imut dengan perpaduan saus strawberry manis dan cokelat.",
    image: "/images/pisang-imut-straw-cokltat.png",
    color: "#F8CEDC",
    accent: "#D67598",
  },
  {
    id: 6,
    number: "06",
    title: "Strawberry Matcha Keju",
    subtitle: "PISANG IMUT — STRAWBERRY MATCHA KEJU",
    description:
      "Perpaduan strawberry, matcha, dan keju yang penuh warna dan rasa.",
    image: "/images/pisang-imut-strawberry-matcha-keju.png",
    color: "#DCEBCF",
    accent: "#7E9E59",
  },
  {
    id: 7,
    number: "07",
    title: "Strawberry Keju",
    subtitle: "PISANG IMUT — STRAWBERRY KEJU",
    description: "Pisang Imut renyah dengan saus strawberry dan taburan keju.",
    image: "/images/pisang-imut-strawbery-keju.png",
    color: "#F8D6E2",
    accent: "#D97B9B",
  },
];

const wrap = (value) => (value + variants.length) % variants.length;

export default function MenuPreview() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("next");
  const [paused, setPaused] = useState(false);

  const changeTo = (index) => {
    const next = wrap(index);

    if (next === active) return;

    setDirection(next === wrap(active - 1) ? "prev" : "next");

    setActive(next);
  };

  useEffect(() => {
    if (
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setDirection("next");
      setActive((current) => wrap(current + 1));
    }, 5500);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="menu-preview-section"
      id="preview"
      aria-labelledby="menu-preview-heading"
    >
      <div className="container">
        {/* HEADER */}
        <div className="menu-preview-top">
          <div>
            <span className="menu-preview-eyebrow">
              ✳ A TASTE OF HAPPINESS ✳
            </span>

            <h2 id="menu-preview-heading">
              SWEET <em>LITTLE</em> PREVIEW.
            </h2>

            <p>
              Intip berbagai varian Pisang Krebo dan Pisang Imut. Temukan
              topping favoritmu!
            </p>
          </div>

          <a className="menu-preview-view" href="#menu">
            VIEW ALL MENU
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* CAROUSEL */}
        <div
          className="menu-preview-showcase"
          role="region"
          aria-roledescription="carousel"
          aria-label="Preview varian Samoy Pisang Gemoy"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          {variants.map((variant, index) => {
            const forward =
              (index - active + variants.length) % variants.length;
            const backward =
              (active - index + variants.length) % variants.length;

            let position = "center";

            if (forward === 1) {
              position = "right";
            } else if (backward === 1) {
              position = "left";
            } else if (forward !== 0) {
              position = forward < backward ? "hidden-right" : "hidden-left";
            }

            const isVisible =
              position === "center" ||
              position === "left" ||
              position === "right";

            return (
              <button
                key={variant.id}
                type="button"
                className={`menu-preview-item menu-preview-${position}`}
                onClick={() => changeTo(index)}
                aria-label={`Lihat ${variant.subtitle}`}
                aria-current={index === active ? "true" : undefined}
                aria-hidden={!isVisible}
                tabIndex={isVisible ? 0 : -1}
                style={{
                  "--variant-color": variant.color,
                  "--variant-accent": variant.accent,
                }}
              >
                <span className="menu-preview-blob" aria-hidden="true" />

                <img
                  src={variant.image}
                  alt={`${variant.subtitle} Samoy Pisang Gemoy`}
                  loading={isVisible ? "eager" : "lazy"}
                />

                <span className="menu-preview-label">{variant.title}</span>
              </button>
            );
          })}
        </div>

        {/* CONTROLS */}
        <div className="menu-preview-controls">
          <button
            className="menu-preview-arrow"
            type="button"
            aria-label="Varian sebelumnya"
            onClick={() => changeTo(active - 1)}
          >
            <ArrowLeft size={20} />
          </button>

          <div
            className="menu-preview-active"
            key={variants[active].id}
            data-direction={direction}
            aria-live="polite"
          >
            <span className="menu-preview-count">
              {variants[active].number} /{" "}
              {String(variants.length).padStart(2, "0")}
            </span>

            <strong>{variants[active].subtitle}</strong>

            <span>{variants[active].description}</span>

            <div
              className="menu-preview-dots"
              role="group"
              aria-label="Pilih varian"
            >
              {variants.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Lihat ${item.subtitle}`}
                  aria-pressed={active === index}
                  className={active === index ? "is-active" : ""}
                  onClick={() => changeTo(index)}
                />
              ))}
            </div>
          </div>

          <button
            className="menu-preview-arrow"
            type="button"
            aria-label="Varian berikutnya"
            onClick={() => changeTo(active + 1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>

        <p className="menu-preview-note">
          * Foto merupakan visual produk dengan kemasan yang telah diedit untuk
          kebutuhan website.
        </p>
      </div>
    </section>
  );
}
