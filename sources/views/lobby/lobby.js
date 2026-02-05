/**
 * LOBBY.JS - Gestiona acceso a las 3 salas
 * Los links y WhatsApp vienen del Google Sheet vía Apps Script
 */

// Mapeo de servidores a número de sala
const SERVER_TO_LOBBY = {
  0: 1, // Apps Script 1 → Sala 1
  1: 2, // Apps Script 2 → Sala 2
  2: 3  // Apps Script 3 → Sala 3
};

// Almacenar salas accesibles globalmente
let accessibleLobbies = [];
let whatsappNumber = '573176484451';

document.addEventListener('DOMContentLoaded', function() {
  initializeLobby();
  initializeAnimations();
});

/**
 * Inicializa las salas disponibles basado en localStorage
 */
function initializeLobby() {
  const userEmail = localStorage.getItem('userEmail');
  const accessibleServersJSON = localStorage.getItem('accessibleServers');
  
  // Si no hay usuario, redirigir a login
  if (!userEmail || !accessibleServersJSON) {
    window.location.href = '../login/login.html';
    return;
  }
  
  try {
    const accessibleServers = JSON.parse(accessibleServersJSON);
    
    // Si está vacío, mostrar mensaje de no acceso
    if (!Array.isArray(accessibleServers) || accessibleServers.length === 0) {
      showNoAccessMessage();
      return;
    }
    
    // Obtener índices de los servidores accesibles
    // accessibleServers es [resultado1, resultado2, resultado3] donde null = sin acceso
    accessibleLobbies = accessibleServers
      .map((server, index) => server !== null ? SERVER_TO_LOBBY[index] : null)
      .filter(x => x !== null);
    
    // Obtener WhatsApp desde localStorage si existe
    const savedWhatsapp = localStorage.getItem('whatsapp');
    if (savedWhatsapp) {
      whatsappNumber = savedWhatsapp.replace(/[^0-9+]/g, '');
      const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
      if (modalWhatsappBtn) {
        modalWhatsappBtn.href = 'https://wa.me/' + whatsappNumber + '?text=Necesito%20ayuda%20para%20entrar%20a%20una%20sesi%C3%B3n';
      }
    }
    
  } catch (error) {
    console.error('Error procesando accesos:', error);
    showNoAccessMessage();
  }
}

/**
 * Acceder a una sala específica
 */
function accessLobby(lobbyNumber) {
  const userEmail = localStorage.getItem('userEmail');
  
  if (!userEmail) {
    window.location.href = '../login/login.html';
    return;
  }
  
  try {
    // Verificar si tiene acceso a esta sala
    if (!accessibleLobbies.includes(lobbyNumber)) {
      // Mostrar modal de sin acceso en lugar de redirigir
      showAccessDeniedModal();
      return;
    }
    
    // URLs de las páginas auxiliares (donde se valida acceso)
    const lobbyPages = {
      1: '../codigo/codigo.html',
      2: '../maquina/maquina.html',
      3: '../maestria/maestria.html'
    };
    
    // Guardar la sala actual
    localStorage.setItem('currentLobby', lobbyNumber);
    localStorage.setItem('currentLobbyAccess', new Date().toISOString());
    
    // Redirigir a la página auxiliar
    window.location.href = lobbyPages[lobbyNumber];
    
  } catch (error) {
    console.error('Error accediendo a sala:', error);
    alert('Error al acceder a la sala');
  }
}

/**
 * Mostrar modal de acceso denegado
 */
function showAccessDeniedModal() {
  const modal = document.getElementById('noAccessModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

/**
 * Cerrar modal de acceso denegado
 */
function closeNoAccessModal() {
  const modal = document.getElementById('noAccessModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Mostrar mensaje de sin acceso (cuando ninguna sala está disponible)
 */
function showNoAccessMessage() {
  const noAccessMsg = document.getElementById('no-access-msg');
  const lobbiesGrid = document.querySelector('.lobbies-grid');
  
  if (lobbiesGrid) {
    lobbiesGrid.style.display = 'none';
  }
  if (noAccessMsg) {
    noAccessMsg.style.display = 'block';
  }
}

// ==========================================
// ANIMACIONES CON GSAP
// ==========================================
function initializeAnimations() {
  // Registrar ScrollTrigger
  gsap.registerPlugin(gsap.plugins.ScrollTrigger);

  const circle = document.querySelector('.hero-bg-svg circle');
  const circleTop = document.querySelector('.hero-bg-svg .circle-top');

  if (!circle) return;

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    })
    .fromTo(
      [".hero-bg-svg"],
      { autoAlpha: 1 },
      { autoAlpha: 1 }
    )
    .fromTo(
      circle,
      {
        scale: 1,
        transformOrigin: "50% 50%"
      },
      {
        scale: 1.5,
        transformOrigin: "50% 50%",
        duration: 3,
        ease: "power2.in"
      }
    )
    .to({}, { duration: 0.25 })
    .fromTo(
      circleTop,
      {
        scale: 0.25,
        opacity: 0,
        transformOrigin: "50% 50%"
      },
      {
        scale: 1.5,
        opacity: 1,
        transformOrigin: "50% 50%",
        duration: 3,
        ease: "power2.in"
      }
    )
    .fromTo(
      [".hero-btn"],
      {
        opacity: 0,
        pointerEvents: "none"
      },
      {
        opacity: 1,
        pointerEvents: "auto",
        duration: 1.5,
        ease: "power2.out"
      },
      "-=0.5"
    );

  const boxes = gsap.utils.toArray(".box");
  if (boxes.length > 0) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".panel.green",
          start: "top 20%",
          end: "center 20%",
          scrub: true
        }
      })
      .to(boxes, {
        x: (i) => (i % 2 < 1 ? 100 : -100),
        rotation: (i) => (i % 2 < 1 ? 360 : -360),
        ease: "none"
      });
  }
}

/**
 * Acceder a una sala específica
 */
function accessLobby(lobbyNumber) {
  console.log('🔍 accessLobby llamado con:', lobbyNumber);
  
  const userEmail = localStorage.getItem('userEmail');
  console.log('📧 Email desde localStorage:', userEmail);
  console.log('� Salas accesibles:', accessibleLobbies);
  
  if (!userEmail) {
    console.warn('⚠️ No hay usuario, redirigiendo a login');
    window.location.href = '../login/login.html';
    return;
  }
  
  try {
    // Verificar si tiene acceso
    if (!accessibleLobbies.includes(lobbyNumber)) {
      console.warn('❌ Sin acceso a sala:', lobbyNumber);
      showAccessDeniedModal();
      return;
    }
    
    const lobbyPages = {
      1: '../codigo/codigo.html',
      2: '../maquina/maquina.html',
      3: '../maestria/maestria.html'
    };
    
    console.log('✅ Redirigiendo a:', lobbyPages[lobbyNumber]);
    
    localStorage.setItem('currentLobby', lobbyNumber);
    localStorage.setItem('currentLobbyAccess', new Date().toISOString());
    
    window.location.href = lobbyPages[lobbyNumber];
    
  } catch (error) {
    console.error('💥 Error accediendo a sala:', error);
    alert('Error al acceder a la sala');
  }
}

/**
 * Mostrar modal de acceso denegado
 */
function showAccessDeniedModal() {
  const modal = document.getElementById('noAccessModal');
  if (modal) {
    modal.style.display = 'flex';
    console.log('📱 Modal de acceso denegado mostrado');
  }
}

/**
 * Cerrar modal de acceso denegado
 */
function closeNoAccessModal() {
  const modal = document.getElementById('noAccessModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Inicializar la página
 */
function initializeLobby() {
  console.log('🎬 Inicializando Lobby...');
  
  const userEmail = localStorage.getItem('userEmail');
  const accessibleServersJSON = localStorage.getItem('accessibleServers');
  
  console.log('📊 Estado localStorage:', {
    userEmail: userEmail ? '✓' : '✗',
    accessibleServers: accessibleServersJSON ? '✓' : '✗'
  });
  
  if (!userEmail || !accessibleServersJSON) {
    console.warn('⚠️ Usuario no autenticado - Redirigiendo a login');
    window.location.href = '../login/login.html';
    return;
  }
  
  try {
    const accessibleServers = JSON.parse(accessibleServersJSON || '[]');
    console.log('🔐 Servidores accesibles:', accessibleServers);
    
    accessibleLobbies = accessibleServers
      .map((server, index) => server !== null ? SERVER_TO_LOBBY[index] : null)
      .filter(x => x !== null);
    
    console.log('✅ Salas accesibles mapeadas:', accessibleLobbies);
    
    const savedWhatsapp = localStorage.getItem('whatsapp');
    if (savedWhatsapp) {
      whatsappNumber = savedWhatsapp.replace(/[^0-9+]/g, '');
      const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
      if (modalWhatsappBtn) {
        modalWhatsappBtn.href = 'https://wa.me/' + whatsappNumber + '?text=Necesito%20ayuda%20para%20entrar%20a%20una%20sesi%C3%B3n';
      }
    }
    
  } catch (error) {
    console.error('💥 Error procesando datos:', error);
  }
}

// ==========================================
// ANIMACIONES CON GSAP
// ==========================================
// Registrar ScrollTrigger
gsap.registerPlugin(gsap.plugins.ScrollTrigger);
console.log('✅ ScrollTrigger registrado');

const container = document.querySelector(".hero-container");
let heightRatio = window.innerWidth / window.innerHeight;
const circle = document.querySelector('.hero-bg-svg circle');
const circleTop = document.querySelector('.hero-bg-svg .circle-top');

console.log('Circle:', circle);
console.log('CircleTop:', circleTop);

const tl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => console.log('scroll:', self.progress)
    }
  })
  .fromTo(
    [".hero-bg-svg"],
    {
      autoAlpha: 1
    },
    {
      autoAlpha: 1
    }
  )
  .fromTo(
    circle,
    {
      scale: 1,
      transformOrigin: "50% 50%"
    },
    {
      scale: 1.5,
      transformOrigin: "50% 50%",
      duration: 3,
      ease: "power2.in"
    }
  )
  .to({}, { duration: 0.25 })
  .fromTo(
    circleTop,
    {
      scale: 0.25,
      opacity: 0,
      transformOrigin: "50% 50%"
    },
    {
      scale: 1.5,
      opacity: 1,
      transformOrigin: "50% 50%",
      duration: 3,
      ease: "power2.in"
    }
  )
  .fromTo(
    [".hero-btn"],
    {
      opacity: 0,
      pointerEvents: "none"
    },
    {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1.5,
      ease: "power2.out"
    },
    "-=0.5"
  );

const boxes = gsap.utils.toArray(".box");
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".panel.green",
      start: "top 20%",
      end: "center 20%",
      scrub: true
    }
  })
  .to(boxes, {
    x: (i) => (i % 2 < 1 ? 100 : -100),
    rotation: (i) => (i % 2 < 1 ? 360 : -360),
    ease: "none"
  });

window.addEventListener("resize", () => {
  const { innerWidth, innerHeight } = window;
  heightRatio = innerWidth / innerHeight;
});

// ==========================================
// INICIALIZAR TODO
// ==========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLobby);
} else {
  initializeLobby();
}

// También ejecutar después de un pequeño delay
setTimeout(initializeLobby, 500);
