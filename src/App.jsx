import React, { useState, useRef } from "react";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [noBtnOffset, setNoBtnOffset] = useState({ x: 0, y: 0 });

  // مرجع لعنصر الصوت لضمان عمله فور الضغط على زر الدخول
  const audioRef = useRef(null);

  const handleRunAway = () => {
    const randomX = Math.floor(Math.random() * 160) - 80;
    const randomY = Math.floor(Math.random() * 100) - 50;
    setNoBtnOffset({ x: randomX, y: randomY });
  };

  // دالة الدخول وتشغيل الأغنية فور الضغط على زر جاهز
  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio play blocked by browser:", error);
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative font-sans box-border">
      {/* عنصر الصوت يعمل في الخلفية وجاهز للتشغيل الفوري */}
      <audio ref={audioRef} src="/ahmed-amr.mp3" preload="auto" loop />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80 pointer-events-none"></div>

      {!entered ? (
        // صفحة البداية (اللاندينج بيج) المتجاوبة
        <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-zinc-100">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wide mb-6 text-white leading-relaxed">
            تحميل جميع النودز اضغط (تحميل)
          </h1>

          {/* حاوية الزرارين جنب بعض بشكل متناسق */}
          <div className="flex items-center justify-center gap-4 my-6 min-h-[60px]">
            <button
              onClick={handleEnter}
              className="py-3 px-6 bg-white text-black font-medium rounded-xl shadow hover:bg-zinc-200 transition-all active:scale-95 cursor-pointer z-20 text-sm"
            >
              تحميل الصور
            </button>

            <button
              onMouseEnter={handleRunAway}
              onClick={handleRunAway}
              style={{
                transform: `translate(${noBtnOffset.x}px, ${noBtnOffset.y}px)`,
              }}
              className="py-3 px-4 bg-zinc-900 text-zinc-400 border border-zinc-800 font-medium rounded-xl shadow-sm transition-transform duration-200 cursor-pointer z-10 text-xs sm:text-sm"
            >
              1000 دولار عشان نمسح الموقع
            </button>
          </div>
        </div>
      ) : (
        // 2. الصفحة الرئيسية بعد الدخول المتجاوبة
        <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-zinc-100 transition-all duration-300">
          <button
            onClick={() => {
              setEntered(false);
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }}
            className="absolute top-4 left-4 text-xs bg-zinc-900 text-zinc-400 hover:text-white px-3 py-1 rounded-lg transition-all border border-zinc-800 cursor-pointer"
          >
            رجوع
          </button>

          <div className="mt-8 mb-6 space-y-1">
            <p className="text-zinc-400 text-xs sm:text-sm tracking-wider font-mono">
              24 years ya expired
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              the shwaty still baddie btw
            </h2>
          </div>

          <div className="my-4">
            <p className="text-zinc-300 text-xs font-semibold mb-2 tracking-wide">
              24 لسا صغيرة بس اكسبيرد بردو
            </p>

            <div className="w-full h-64 sm:h-72 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative shadow-inner flex items-center justify-center">
              <img
                src="/bassmalla.jpg"
                alt="Basmala"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextSibling)
                    e.target.nextSibling.style.display = "block";
                }}
              />
              <div
                style={{ display: "none" }}
                className="text-zinc-500 text-xs p-4 text-center"
              >
                (تأكد من وضع ملف basmala.jpg في مجلد public)
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-zinc-600 tracking-widest ">
            Special Birthday Bassmalla
          </div>
        </div>
      )}
    </div>
  );
}
