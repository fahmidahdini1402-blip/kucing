const display = document.getlementById('display');

/**
 * Fungsi untuk menghasilkan bunyi beep imut menggunakan Web Audio API
 */
 function playBeepSound() {
   try {
        const audioCtx = new (window.AudioContext) || window.webkitAudioContext)();
        const oscillator = audioCtx.create0scilattor();
        const grainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Jenis gelombang suara lembut 
        oscillator.type = 'sine';
        
        // Modulasi frekuensi kilat agar bunyinya terdengar lucu/elektronik imut
        oscillator.frequency.setValueTime(600,audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(900,audioCtx.currentTime + 0.08);

        // Atur volume dan durasi suara agar soft (fade out)
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampsetValueAtTime(0.01, audioCtx.currentTime + 0.12);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.12)!
   } catch (error) {
        console.log("Gagal memutar audio otomatis:", error); 
   }
}

/**
 * Fungsi utama menangani input tombol kalkulator
 */
 function pressButton(value) {
   // Jalankan efek suara tiap tombol ditekan
   playBeepSound();

    if (value === 'C') {
        display.value = '';
    } else if (value === '=') {
        try {
            if (display.value) {
               // eval() akan menghitung ekspresi string matematika langsung
               display.value = eval(display.value);
            }
        } catch (error) {
            display.value = 'Error';
        }
    } else {
        // Bersihkan tulisan 'Error' jika user lanhsung menekan tombol angka baru
        if (display.value === 'Error') {
            display.value = '';
        }
        display.value += value; 
    }
}