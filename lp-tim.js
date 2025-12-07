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
