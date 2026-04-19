// ==========================================
// AUDIO Y UTILIDADES
// ==========================================
var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function hover(){
    var audio = document.getElementById("hover");
    if(audio) audio.play();
}

function select(){
    var audio = document.getElementById("select");
    if(audio) audio.play();
}

function zip(){
    var audio = document.getElementById("zip");
    if(audio) audio.play();
    select();
    var music = document.getElementById("bg-music");
    if(music) music.pause();
}

function back(){
    var audio = document.getElementById("back");
    if(audio) audio.play();
}

const monthNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const d = new Date();
let weekday = monthNames[d.getDay()];
let day = d.getDate();
let month = d.getMonth() + 1;
let date = weekday + " " + month + "/" + day;

// ==========================================
// REPRODUCTOR DE MEDIOS
// ==========================================
let currentAudio = null;

function playVideo(m3u8Url) {
    const video = document.getElementById('video-player');
    
    // Forzamos el CSS para que quede por encima de la imagen
    video.style.cssText = "display: block; width: 100%; height: 100%; object-fit: contain; background: black; position: absolute; top: 0; left: 0; z-index: 9999;";
    
    $(".splash-screen").css("background-image", "none");

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(m3u8Url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = m3u8Url;
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    }
}

// ==========================================
// BASE DE DATOS DE CANALES (Añade todos aquí)
// ==========================================
let immersionChannels = [
  // --- PÁGINA 1: TOKYO MAIN ---
  { id: 1, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/NHK%E7%B7%8F%E5%90%88%E3%83%AD%E3%82%B42020-.png", action: "playVideo('https://nl.utako.moe/NHK_G/index.m3u8')" },
  { id: 2, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/a/aa/NHKE%E3%83%86%E3%83%AC%E3%83%AD%E3%82%B42020-.png", action: "playVideo('https://nl.utako.moe/NHK_E/index.m3u8')" },
  { id: 3, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nippon_TV_logo_2014.svg/2560px-Nippon_TV_logo_2014.svg.png", action: "playVideo('https://nl.utako.moe/Nippon_TV/index.m3u8')" },
  { id: 4, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tokyo_Broadcasting_System_logo_2020.svg/2560px-Tokyo_Broadcasting_System_logo_2020.svg.png", action: "playVideo('https://nl.utako.moe/TBS/index.m3u8')" },
  { id: 5, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/TV_Asahi_Logo.svg/3840px-TV_Asahi_Logo.svg.png", action: "playVideo('https://nl.utako.moe/TV_Asahi/index.m3u8')" },
  { id: 6, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/TV_Tokyo_logo_2023.svg/2560px-TV_Tokyo_logo_2023.svg.png", action: "playVideo('https://nl.utako.moe/TV_Tokyo/index.m3u8')" },
  { id: 7, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Tokyo_metropolitan_television_logo_%28rainbow%29.svg/2560px-Tokyo_metropolitan_television_logo_%28rainbow%29.svg.png", action: "playVideo('https://nl.utako.moe/Tokyo_MX1/index.m3u8')" },
  { id: 8, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Tokyo_metropolitan_television_logo_%28rainbow%29.svg/2560px-Tokyo_metropolitan_television_logo_%28rainbow%29.svg.png", action: "playVideo('https://nl.utako.moe/Tokyo_MX2/index.m3u8')" },
  
  // --- PÁGINA 1: EXTRAS KANSAI ---
  { id: 9, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Mainichi_Broadcasting_System_logo.svg/1920px-Mainichi_Broadcasting_System_logo.svg.png", action: "playVideo('https://nl.utako.moe/mbs/index.m3u8')" },
  { id: 10, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Asahi_Broadcasting_Corporation_Logo.svg/261px-Asahi_Broadcasting_Corporation_Logo.svg.png", action: "playVideo('https://nl.utako.moe/abc/index.m3u8')" },
  { id: 11, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Tv_osaka_logo.svg/178px-Tv_osaka_logo.svg.png", action: "playVideo('https://nl.utako.moe/tvo/index.m3u8')" },
  { id: 12, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Ktv_logo.svg/200px-Ktv_logo.svg.png", action: "playVideo('https://nl.utako.moe/kansaitv/index.m3u8')" },

  // --- PÁGINA 2 ---
  // A partir de aquí (índice 12), aparecerán al presionar la flecha derecha
  { id: 13, type: "occupied", img: "https://upload.wikimedia.org/wikipedia/commons/6/6c/NHK_BS.png", action: "playVideo('https://nl.utako.moe/NHK_BS/index.m3u8')" },
  { id: 14, type: "occupied", img: "https://www.lyngsat.com/logo/tv/bb/bs-nippon-tv-jp.png", action: "playVideo('https://nl.utako.moe/bsntv/index.m3u8')" },
  // ... ¡Añade los demás canales de tu lista aquí abajo!
];

// ==========================================
// LÓGICA DE PAGINACIÓN Y RENDERIZADO
// ==========================================
let currentPage = 0;
const channelsPerPage = 12;

function renderWiiMenu() {
  const container = document.getElementById("grid-container");
  if (!container) return;
  container.innerHTML = "";

  let htmlContent = "";
  
  // Calculamos qué canales tocan en esta página
  let startIndex = currentPage * channelsPerPage;
  let endIndex = startIndex + channelsPerPage;
  let pageChannels = immersionChannels.slice(startIndex, endIndex);

  for (let i = 0; i < 12; i++) {
    // Si no hay canal en esa posición, ponemos uno en blanco
    let channel = pageChannels[i] || { id: startIndex + i + 1, type: "blank" };

    if (i % 3 === 0) htmlContent += `<div class="col">`;

    if (channel.type === "occupied") {
      htmlContent += `
        <div class="channel-icon occupied">
          <img src="${channel.img}" onerror="this.src='assets/images/miichannel.jpg'"> <div class="hover" id="ch_${channel.id}" onmouseover="hover()" data-img="${channel.img}" data-action="${channel.action}"></div>
        </div>`;
    } else {
      htmlContent += `
        <div class="channel-icon blank">
          <div class="hover" id="blank_${channel.id}"></div>
        </div>`;
    }

    if ((i + 1) % 3 === 0) htmlContent += `</div>`;
  }
  container.innerHTML = htmlContent;
}

function nextPage() {
    if ((currentPage + 1) * channelsPerPage < immersionChannels.length) {
        select(); // Sonido de clic
        currentPage++;
        renderWiiMenu();
    }
}

function prevPage() {
    if (currentPage > 0) {
        select(); // Sonido de clic
        currentPage--;
        renderWiiMenu();
    }
}

// ==========================================
// EVENTOS PRINCIPALES (JQUERY)
// ==========================================
$(document).ready(function() {
    
    // Dibujar menú inicial
    renderWiiMenu();

    // Eventos para cambiar de página
    $(".right-button-container").on("click", function() {
        nextPage();
    });
    
    $(".left-button-container").on("click", function() {
        prevPage();
    });

    // Clic en un canal
// Clic en un canal
    $("body").on("click", ".occupied .hover", function(){
        zip(); 

        var actionToRun = $(this).attr("data-action");

        var centerX = $(this).offset().left + $(this).width() / 2;
        var centerY = $(this).offset().top + $(this).height() / 2;
        $( ".main-menu" ).css( {"transform-origin" : centerX + "px " + centerY + "px 0px"} );

        var img = $( this ).attr( "data-img" );
        $( ".splash-screen" ).css( {"background-image" : " url(" + img + ")", "transform-origin" : centerX + "px " + centerY + "px 0px"} );

        $( ".splash-bar" ).hide(); 

        $( ".main-menu" ).addClass( "channel-splash" );
        $( "body" ).addClass( "channel-splash" );
        
        // Esperamos 900ms a que termine la animación de zoom para arrancar el video
        delay(function(){
            $( "body" ).removeClass( "splash-switch" );
            
            // AHORA ejecutamos la acción (el video o la radio)
            if (actionToRun) {
                eval(actionToRun);
            }
        }, 900 );
    });

    // Volver atrás (Botón Menú)
    $("body").on("click", ".menu-btn", function(){
        $( ".splash-bar" ).show(); 

        const video = document.getElementById('video-player');
        if (video) {
            video.pause();
            video.src = "";
            video.style.display = "none";
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        var music = document.getElementById("bg-music");
        if(music) music.play();

        $( ".main-menu" ).removeClass( "channel-splash" );
        $( "body" ).removeClass( "channel-splash" );
        $( "body" ).addClass( "splash-switch" );
        delay(function(){
            $( "body" ).removeClass( "splash-switch" );
        }, 900 );
    });

    // Advertencia de resolución
    $("body").on("click", ".screen-message", function(){
        $( ".screen-message" ).addClass( "hidden" );
    });

    // Atajo de teclado (Escape para salir, flechas para cambiar de página)
    $(document).keydown(function(e) {
        if (e.key === "Escape") {
            if ($("body").hasClass("channel-splash")) {
                $(".menu-btn").trigger("click"); 
            }
        }
        // Puedes cambiar de página con las flechas del teclado si no estás viendo un canal
        if (!$("body").hasClass("channel-splash")) {
            if (e.key === "ArrowRight") nextPage();
            if (e.key === "ArrowLeft") prevPage();
        }
    });
}); 