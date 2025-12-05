const WHATSAPP_NUMBER = "5571999715589";

document.addEventListener('DOMContentLoaded', () => {
  initFaq();
  initWhatsAppCounter();
});

function initFaq() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
}

function toggleMode(mode) {
  const body = document.body;
  const header = document.getElementById('main-header');

  // Lists
  const listaCasa = document.getElementById('lista-casa');
  const listaEmpresa = document.getElementById('lista-empresa');

  // Reviews
  const reviewsCasa = document.getElementById('reviews-casa');
  const reviewsEmpresa = document.getElementById('reviews-empresa');

  // Hero Elements
  const heroTag = document.getElementById('hero-tag');
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const heroPriceOld = document.getElementById('hero-price-old');
  const heroPriceNew = document.getElementById('hero-price-new');
  const heroPriceNote = document.getElementById('hero-price-note');
  const heroPlanName = document.getElementById('hero-plan-name');
  const testimonialsTitle = document.getElementById('testimonials-title');

  // Nav Links
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mode === 'business') {
    // Theme
    body.classList.add('business-theme');
    header.classList.add('empresa-mode');

    // Toggle Visibility
    listaCasa.classList.add('hidden');
    listaEmpresa.classList.remove('hidden');
    reviewsCasa.classList.add('hidden');
    reviewsEmpresa.classList.remove('hidden');

    // Update Content
    heroTag.innerText = "TIM EMPRESAS";
    heroTitle.innerText = "A Ultravelocidade da TIM no seu negócio";
    heroDesc.innerText = "Conecte-se com o futuro. Estabilidade, IP Fixo e performance para sua empresa crescer.";
    heroPriceOld.innerText = "De R$ 189,99";
    heroPriceNew.innerText = "119,99"; // 1 Giga Destaque
    heroPlanName.innerHTML = '<strong style="color: #00D6D6;">1 GIGA</strong>';
    heroPriceNote.innerText = "No Débito Automático";
    testimonialsTitle.innerText = "Empresas que crescem com a ultravelocidade da TIM.";

    // Update Active State
    updateActiveState(navLinks, 1);
    updateActiveState(mobileNavLinks, 1);

  } else {
    // Theme
    body.classList.remove('business-theme');
    header.classList.remove('empresa-mode');

    // Toggle Visibility
    listaCasa.classList.remove('hidden');
    listaEmpresa.classList.add('hidden');
    reviewsCasa.classList.remove('hidden');
    reviewsEmpresa.classList.add('hidden');

    // Update Content
    heroTag.innerText = "OFERTA EXCLUSIVA";
    heroTitle.innerText = "A Ultravelocidade da TIM na sua casa";
    heroDesc.innerText = "Conecte-se com o futuro. Fibra de verdade para jogar, trabalhar e assistir sem travar.";
    heroPriceOld.innerText = "De R$ 189,99";
    heroPriceNew.innerText = "99,99"; // 700 Mega Foco
    heroPlanName.innerHTML = '<strong style="color: #00D6D6;">700 MEGA</strong>';
    heroPriceNote.innerText = "No Débito Automático";
    testimonialsTitle.innerText = "Quem usa TIM Ultrafibra no Nordeste, recomenda.";

    // Update Active State
    updateActiveState(navLinks, 0);
    updateActiveState(mobileNavLinks, 0);
  }
}

function updateActiveState(links, activeIndex) {
  links.forEach((link, index) => {
    if (index === activeIndex) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
}

function initWhatsAppCounter() {
  const counterElement = document.getElementById('online-counter');
  if (!counterElement) return;

  const now = new Date();
  const hour = now.getHours();
  // 08-18h: 100-150 / fora: 15-40
  let min, max;

  if (hour >= 8 && hour < 18) {
    min = 100;
    max = 150;
  } else {
    min = 15;
    max = 40;
  }

  const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
  counterElement.innerText = randomCount;
}

function openWhatsApp(planName, segment) {
  let message = "";

  // Clean up plan name for message (remove "Mega" or "Giga" redundant repetition if needed, but user just said "contract the plan...")
  // Logic: 
  // Para Casa: Olá! Quero contratar o plano 700 Mega
  // Para Empresa: Olá! Quero contratar o plano 1 GIGA Empresarial

  // segment comes as 'Casa', 'Empresa' or 'Widget'

  if (segment === 'Widget') {
    message = "Olá! Gostaria de saber mais sobre a TIM Ultrafibra.";
  } else if (segment === 'Empresa') {
    // Remove "Empresa" word from planName if present to avoid redundancy "1 Giga Empresa Empresarial"
    const cleanPlanName = planName.replace(' Empresa', '').replace('Empresas', '').trim();
    message = `Olá! Quero contratar o plano ${cleanPlanName} Empresarial`;
  } else {
    // Casa
    const cleanPlanName = planName.replace(' Casa', '').trim();
    message = `Olá! Quero contratar o plano ${cleanPlanName}`;
  }

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
}
