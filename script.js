// --- PRELOADER (Gecikmeli) ---
function removePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide-preloader');
        document.body.classList.add('loaded');
        setTimeout(() => { preloader.style.display = 'none'; }, 800);
    }
}
window.addEventListener('load', function() { setTimeout(removePreloader, 2500); });
setTimeout(removePreloader, 6000); // Emniyet

// --- UZAY ANİMASYONU ---
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');
let width, height, stars = [], shootingStars = [];

function resize() {
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width; canvas.height = height; createStars();
}

class Star {
    constructor() { this.x = Math.random() * width; this.y = Math.random() * height; this.size = Math.random() * 1.5; this.opacity = Math.random(); }
    update() { this.opacity += (Math.random() - 0.5) * 0.1; if(this.opacity < 0) this.opacity = 0; if(this.opacity > 1) this.opacity = 1; }
    draw() { ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
}

class ShootingStar {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * width; this.y = 0; this.len = Math.random() * 80 + 10; this.speed = Math.random() * 10 + 6; this.size = Math.random() * 1 + 0.1; this.active = false; this.waitTime = new Date().getTime() + Math.random() * 3000; }
    update() {
        if(this.active) { this.x -= this.speed; this.y += this.speed; if(this.x < 0 || this.y > height) { this.active = false; this.reset(); } }
        else { if(new Date().getTime() > this.waitTime) this.active = true; }
    }
    draw() { if(!this.active) return; ctx.strokeStyle = 'rgba(0, 243, 255, 0.8)'; ctx.lineWidth = this.size; ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(this.x - this.len, this.y + this.len); ctx.stroke(); }
}

function createStars() { stars = []; for(let i = 0; i < 150; i++) stars.push(new Star()); shootingStars = []; shootingStars.push(new ShootingStar()); shootingStars.push(new ShootingStar()); }
function animate() { ctx.clearRect(0, 0, width, height); stars.forEach(star => { star.update(); star.draw(); }); shootingStars.forEach(s => { s.update(); s.draw(); }); requestAnimationFrame(animate); }

window.addEventListener('resize', resize); resize(); animate();

// --- OYUN MODALI ---
// --- OYUN MODALI VE YÜKLEME EFEKTİ ---
function openGame(gameName) {
    const modal = document.getElementById('game-modal');
    const iframe = document.getElementById('game-frame');
    const loadingScreen = document.getElementById('game-loading-screen');
    const loadingLogo = document.getElementById('loading-game-logo');
    const progressBar = document.querySelector('.modal-loader-progress');
    const modalTitle = document.getElementById('modal-game-title'); // Varsa başlık

    // 1. Modalı Aç
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    // 2. Yükleme Ekranını Hazırla (Sıfırla)
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
    iframe.style.display = 'none';
    iframe.src = ''; // Önceki oyunu temizle
    progressBar.style.width = '0%'; // Barı sıfırla

    // 3. Oyun Bilgilerini Ayarla
    let gameUrl = '';
    let gameLogoUrl = '';

    if (gameName === 'HiddenOne') {
        gameUrl = 'Games/HiddenOne.html';
        gameLogoUrl = 'Resimler/HiddenOne.jpg'; // Oyunun kapak resmi
    } else if (gameName === 'TeamRoulette') {
        // İleride yapacağın diğer oyun
        gameUrl = 'about:blank'; // Şimdilik boş
        gameLogoUrl = 'image.png'; // Varsayılan logo
        alert("Bu oyun henüz yapım aşamasında!");
        closeGame(); return; // Oyun yoksa açma
    } else {
        // Diğerleri
        alert("Bu oyun yakında eklenecek!");
        closeGame(); return;
    }

    // Logoyu yerleştir
    loadingLogo.src = gameLogoUrl;

    // 4. Yükleme Animasyonunu Başlat (Yapay Gecikme)
    setTimeout(() => {
        progressBar.style.width = '100%'; // Barı doldurmaya başla
    }, 100);

    // 5. 2 Saniye Sonra Oyunu Göster
    setTimeout(() => {
        // Iframe'e linki ver (Oyun şimdi yüklenmeye başlar)
        iframe.src = gameUrl;
        
        // Yükleme ekranını yavaşça gizle
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            iframe.style.display = 'block'; // Oyunu görünür yap
        }, 500); // Opacity geçişi bitince
        
    }, 2000); // 2 Saniye bekleme süresi
}

function closeGame() {
    const modal = document.getElementById('game-modal');
    const iframe = document.getElementById('game-frame');
    
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    iframe.src = ''; // Oyunu durdur
}
function closeGame() {
    const modal = document.getElementById('game-modal');
    const iframe = document.getElementById('game-frame');
    
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    iframe.src = ''; // Oyunu kapatınca iframe'i sıfırla ki ses/müzik devam etmesin
}
function closeGame() {
    document.getElementById('game-modal').style.display = 'none';
    document.body.classList.remove('modal-open'); // Scroll aç
}

// --- MOBİL MENÜ ---
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-menu');
    nav.classList.toggle('active');
}

// Linke tıklayınca menüyü kapat
function closeMobileMenu() {
    const nav = document.querySelector('.nav-menu');
    nav.classList.remove('active');
}