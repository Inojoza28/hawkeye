document.addEventListener("DOMContentLoaded", () => {
  // 1. Animação inicial do Drone (carregamento) - OPICIONAL
  const droneAnimationWrapper = document.getElementById("drone-animation");
  const droneLoading = document.getElementById("drone-loading");

  gsap.fromTo(
    droneLoading,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: -window.innerHeight / 2 + 100,
      duration: 2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(droneAnimationWrapper, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            droneAnimationWrapper.style.display = "none";
          },
        });
      },
    }
  );



 // 3. Menu Hamburguer (mobile)
// 3. Menu Hamburguer (mobile)
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");
const hamburgerInput = document.querySelector(".hamburger input");

// Alterna o menu com base na mudança do input (checkbox)
if (hamburgerInput) {
  hamburgerInput.addEventListener("change", () => {
    // Adiciona a classe "open" ao navMenu se o checkbox estiver marcado
    navMenu.classList.toggle("open", hamburgerInput.checked);
  });
}

// Caso o botão de menu (menuBtn) seja clicado (opcional, para garantir compatibilidade)
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  // Atualiza o estado do checkbox conforme a classe "open"
  if (hamburgerInput) {
    hamburgerInput.checked = navMenu.classList.contains("open");
  }
});

// Ao clicar em qualquer link do menu, fecha o menu e desmarca o checkbox
const navLinks = document.querySelectorAll("#nav-menu ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    if (hamburgerInput) {
      hamburgerInput.checked = false;
    }
  });
});



  // 4. Animação de Fade-In das seções ao rolar (GSAP)
  const fadeInSections = document.querySelectorAll(".fade-in-section");
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100;
  }
  function checkFadeIn() {
    fadeInSections.forEach((section) => {
      if (isElementInViewport(section)) {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
    });
  }
  window.addEventListener("scroll", checkFadeIn);
  checkFadeIn();

  // ----------------------------------------------------------------
  // 5. DRONE FLUTUANDO (SEM VOO HORIZONTAL)
  // ----------------------------------------------------------------
  const introDrone = document.getElementById("intro-drone");
  let floatingTween = null;

  // Animação de flutuar verticalmente (idle)
  function startFloating(droneElem) {
    floatingTween = gsap.to(droneElem, {
      y: "+=20",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }

  // Interrompe a animação de flutuar (caso seja necessário)
  function stopFloating() {
    if (floatingTween) {
      floatingTween.kill();
      floatingTween = null;
    }
  }

  function droneIdle() {
    // Posiciona o drone no canto direito com uma margem (por ex. 50px)
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const droneWidth = introDrone.offsetWidth;
    const marginRight = 50;

    // Ajuste se precisar mudar a posição vertical (top) no CSS
    gsap.set(introDrone, {
      x: windowWidth - droneWidth - marginRight
    });

    // Inicia o flutuar
    startFloating(introDrone);
  }

  // Chama a função para manter o drone parado e flutuando
  droneIdle();

  // Se quiser recalcular ao redimensionar a janela
  window.addEventListener("resize", () => {
    gsap.killTweensOf(introDrone);
    stopFloating();
    droneIdle();
  });
});

// Botão "Voltar ao Topo"
function scrollToTop() {
  window.scrollTo({
    top: 0,
  });
}

window.addEventListener('scroll', function () {
  var scrollTopButton = document.querySelector('.scroll-top');
  if (this.window.pageYOffset > 200) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
});
