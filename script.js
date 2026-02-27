// ============================================
// MENU LATERAL (SIDEBAR) - FUNCIONANDO EM TODAS AS TELAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do menu lateral
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    console.log('✅ Script carregado!');
    
    // 1. ABRIR MENU LATERAL (clicar nas 3 barras)
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // 2. FECHAR MENU LATERAL (função)
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // 3. FECHAR COM BOTÃO X
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeSidebar();
        });
    }
    
    // 4. FECHAR CLICANDO FORA (no overlay)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay) {
                closeSidebar();
            }
        });
    }
    
    // 5. FECHAR AO CLICAR EM UM LINK DO MENU
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href.includes('tel:')) {
                closeSidebar();
            }
        });
    });
    
    // 6. FECHAR COM TECLA ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeSidebar();
        }
    });
    
    // 7. Impedir que cliques dentro do sidebar fechem o menu
    sidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ============================================
    // ANIMAÇÃO DE ESTATÍSTICAS
    // ============================================
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }
    
    const aboutSection = document.querySelector('.about');
    const stats = document.querySelectorAll('.stat h3');
    
    if (aboutSection && stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                stats.forEach(stat => {
                    const text = stat.textContent;
                    let target, suffix = '';
                    
                    if (text.includes('+')) {
                        target = parseInt(text.replace('+', ''));
                        suffix = '+';
                    } else if (text.includes('%')) {
                        target = parseInt(text.replace('%', ''));
                        suffix = '%';
                    } else if (text.includes('anos')) {
                        target = parseInt(text.replace(' anos', ''));
                        suffix = ' anos';
                    } else {
                        target = parseInt(text);
                    }
                    
                    if (!isNaN(target)) {
                        animateCounter(stat, target, suffix);
                    }
                });
                observer.unobserve(aboutSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }
    
    // ============================================
    // NAVBAR COM EFEITO AO SCROLL
    // ============================================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ============================================
    // ATUALIZAR ANO NO FOOTER
    // ============================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
    }
    
    // ============================================
    // SCROLL SUAVE PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // SEÇÃO NOSSOS MATERIAIS - TROCA DE IMAGENS
    // ============================================
    const materiaisGrid = document.getElementById('materiais-grid');
    const botoesCategoria = document.querySelectorAll('.btn-categoria');

    const produtos = {
        eletricos: [
            { img: 'imagens/I9.jpg', nome: 'Disjuntor', desc: 'Disjuntor 16A' },
            { img: 'imagens/I13.webp', nome: 'Tomada', desc: 'Tomada 10A' },
            { img: 'imagens/I10.jpg', nome: 'Cabo Elétrico', desc: 'Cabo 2.5mm' },
            { img: 'imagens/I12.jpg', nome: 'Interruptor', desc: 'Interruptor simples' }
        ],
        construcao: [
            { img: 'imagens/construcao1.jpg', nome: 'Cimento', desc: 'Cimento 50kg' },
            { img: 'imagens/construcao2.jpg', nome: 'Tijolo', desc: 'Tijolo 6 furos' },
            { img: 'imagens/construcao3.jpg', nome: 'Areia', desc: 'Areia média' },
            { img: 'imagens/construcao4.jpg', nome: 'Telha', desc: 'Telha cerâmica' }
        ],
        canalizacao: [
            { img: 'imagens/canalizacao1.jpg', nome: 'Tubo PVC', desc: 'Tubo 100mm' },
            { img: 'imagens/canalizacao2.jpg', nome: 'Conexão', desc: 'Joelho 90°' },
            { img: 'imagens/canalizacao3.jpg', nome: 'Registro', desc: 'Registro esfera' },
            { img: 'imagens/canalizacao4.jpg', nome: 'Válvula', desc: 'Válvula de retenção' }
        ],
        ferramentas: [
            { img: 'imagens/ferramentas1.jpg', nome: 'Martelo', desc: 'Martelo de unha' },
            { img: 'imagens/ferramentas2.jpg', nome: 'Chave de fenda', desc: 'Chave philips' },
            { img: 'imagens/ferramentas3.jpg', nome: 'Furadeira', desc: 'Furadeira 500W' },
            { img: 'imagens/ferramentas4.jpg', nome: 'Serra', desc: 'Serra manual' }
        ]
    };

    function mostrarCategoria(categoria) {
        const itens = produtos[categoria];
        if (!itens) return;

        let html = '';
        itens.forEach(item => {
            html += `
                <div class="material-card">
                    <img src="${item.img}" alt="${item.nome}">
                    <div class="card-body">
                        <h4>${item.nome}</h4>
                        <p>${item.desc}</p>
                    </div>
                </div>
            `;
        });
        materiaisGrid.innerHTML = html;
    }

    botoesCategoria.forEach(btn => {
        btn.addEventListener('click', function() {
            botoesCategoria.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            const categoria = this.getAttribute('data-categoria');
            mostrarCategoria(categoria);
        });
    });

    if (botoesCategoria.length > 0) {
        mostrarCategoria('eletricos');
    }
    
    // ============================================
    // MOSTRAR WHATSAPP APENAS QUANDO FOOTER APARECE
    // ============================================
    
});

