onload = () => {
  // Hapus class not-loaded setelah 1 detik (animasi loading)
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  const audio = document.querySelector(".song");
  const playBtn = document.getElementById("playBtn");

  // --- LOGIKA 1: Autoplay Workaround ---
  // Browser modern memblokir autoplay. Jadi kita pancing play saat user klik area kosong pertama kali.
  const startAudioOnFirstClick = () => {
    if (audio.paused) {
      audio.play().catch((e) => console.log("Autoplay prevented:", e));
      playBtn.textContent = "🔇"; // Ubah ikon jadi mute
    }
    // Hapus listener ini setelah sekali klik agar tidak mengganggu fungsi pause nanti
    document.body.removeEventListener("click", startAudioOnFirstClick);
  };

  document.body.addEventListener("click", startAudioOnFirstClick);

  // --- LOGIKA 2: Tombol Play/Pause ---
  playBtn.addEventListener("click", (e) => {
    // PENTING: stopPropagation mencegah klik tombol dianggap sebagai klik body
    e.stopPropagation();

    if (audio.paused) {
      audio.play();
      playBtn.textContent = "🔊"; // Ikon saat musik nyala (siap untuk dimute)
    } else {
      audio.pause();
      playBtn.textContent = "🔇"; // Ikon saat musik mati (siap untuk diplay)
    }
  });
};
