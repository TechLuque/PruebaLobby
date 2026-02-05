function loadNavbar() {
    const navbarHTML = `
    <nav class="navbar">
        <div class="logo">LUQUE ACADEMY</div>
        <ul class="nav-links">
            <li><a href="https://wa.me/573176484451?text=Necesito%20ayuda%20para%20entrar%20a%20una%20sesi%C3%B3n">Soporte</a></li>
            <li><a href="/sources/views/lobby/lobby.html" class="btn-gold-outline">Inicio</a></li>
        </ul>
    </nav>
    `;
    
    // Intentar insertar en el elemento con id navbar-container primero
    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = navbarHTML;
        console.log('✅ Navbar inyectado en navbar-container');
        return;
    }
    
    // Si no existe, insertar al principio del body
    const headerExist = document.querySelector('header.site-header');
    if (headerExist) {
        headerExist.innerHTML = navbarHTML;
        console.log('✅ Navbar inyectado en header');
        return;
    }
    
    // Última opción: insertar al inicio del body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    console.log('✅ Navbar inyectado al inicio del body');
}

// Ejecutar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}



