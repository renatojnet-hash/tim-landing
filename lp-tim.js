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

// Helper function to generate WhatsApp URLs (for dynamic use cases)
function getWhatsAppURL(planName, segment) {
  let message = "";

  if (segment === 'Widget') {
    message = "Olá! Gostaria de saber mais sobre a TIM Ultrafibra.";
  } else if (segment === 'Empresa') {
    const cleanPlanName = planName.replace(' Empresa', '').replace('Empresas', '').trim();
    message = `Olá! Quero contratar o plano ${cleanPlanName} Empresarial`;
  } else {
    const cleanPlanName = planName.replace(' Casa', '').trim();
    message = `Olá! Quero contratar o plano ${cleanPlanName}`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Legacy function kept for backwards compatibility (if needed)
function openWhatsApp(planName, segment) {
  const url = getWhatsAppURL(planName, segment);
  window.open(url, '_blank');
}
