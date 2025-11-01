const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content, .certifications');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Web Developers", "Back End Developers", "Spring Boot Developers"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.style.display='none', 500);
    }
    if (mainPage) {
      mainPage.classList.add("visible");
    }
  }, 4000);

  // ============================================
  // CONFIGURATION EMAILJS - ⚠️ À CONFIGURER ⚠️
  // ============================================
  // Pour trouver vos IDs dans EmailJS Dashboard:
  // 1. Service ID: Allez sur https://dashboard.emailjs.com/admin/service
  //    → Cliquez sur votre service → L'ID est visible (ex: service_xxxxx)
  // 2. Template ID: Allez sur https://dashboard.emailjs.com/admin/template
  //    → Cliquez sur votre template → L'ID est visible (ex: template_xxxxx)
  // 3. Public Key: Déjà correct ✅
  // ============================================
  
  const EMAILJS_CONFIG = {
    SERVICE_ID: "service_t70gnzr",      // ✅ Service ID configuré
    TEMPLATE_ID: "template_kam98cx",   // ⚠️ REMPLACEZ par votre Template ID réel
    PUBLIC_KEY: "rKYgpZz0uzgFxCXPy"     // ✅ Clé publique (déjà correcte)
  };

  // Vérifier si EmailJS est chargé
  if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS ne se charge pas ! Vérifiez le script dans le code HTML..');
    console.warn('⚠️Le formulaire fonctionnera toujours, mais en utilisant mailto comme alternative.');
  } else {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS initialisé avec succès');
      console.log('⚠️ Service ID utilisé:', EMAILJS_CONFIG.SERVICE_ID);
      console.log('⚠️ Template ID utilisé:', EMAILJS_CONFIG.TEMPLATE_ID);
      console.log('💡 Si les emails ne fonctionnent pas, vérifiez ces IDs dans: https://dashboard.emailjs.com/admin');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation EmailJS:', error);
    }
  }

  // Gestion du formulaire de contact
  const contactForm = document.getElementById("contact-form");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const btnSend = contactForm.querySelector(".btn-send");
      if (!btnSend) {
        console.error('Bouton « Envoyer » introuvable.!');
        return;
      }
      
      const originalText = btnSend.textContent;
      const originalBg = btnSend.style.background || "#474af0";
      
      // Validação básica
      const name = contactForm.user_name.value.trim();
      const email = contactForm.user_email.value.trim();
      const message = contactForm.message.value.trim();
      
      if (!name || !email || !message) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
      
      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Veuillez saisir une adresse email valide.");
        return;
      }
      
      btnSend.textContent = "Envoi en cours...";
      btnSend.disabled = true;
      btnSend.style.cursor = "not-allowed";
      btnSend.style.opacity = "0.7";

      // Vérifier si EmailJS est disponible
      if (typeof emailjs === 'undefined' || !emailjs) {
        // Solution de secours: utiliser mailto directement
        const subject = encodeURIComponent(`Contact de ${name}`);
        const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:mohcine.laaraj2@usmba.ac.ma?subject=${subject}&body=${body}`;
        
        btnSend.textContent = "Ouverture du client email...";
        setTimeout(() => {
          btnSend.textContent = originalText;
          btnSend.style.background = originalBg;
          btnSend.disabled = false;
          btnSend.style.cursor = "pointer";
          btnSend.style.opacity = "1";
          contactForm.reset();
        }, 2000);
        return;
      }

      // Paramètres pour EmailJS - Les noms doivent correspondre exactement aux variables du template
      const templateParams = {
        name: name,                    // Correspond à {{name}} dans le template
        email: email,                  // Correspond à {{email}} dans le template
        message: message,              // Correspond à {{message}} dans le template
        time: new Date().toLocaleString('fr-FR'), // Ajout de l'heure actuelle
        title: `Contact de ${name}`    // Correspond à {{title}} dans le template (utilisé dans le sujet)
      };

      // Log pour débogage
      console.log('📧 Envoi EmailJS avec paramètres:', templateParams);
      console.log('⚠️ Service ID:', EMAILJS_CONFIG.SERVICE_ID);
      console.log('⚠️ Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);

      // Envoi de l'email via EmailJS
      emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
        .then(function(response) {
          console.log('Email envoyé avec succès!', response.status, response.text);
          btnSend.textContent = "Message envoyé! ✓";
          btnSend.style.background = "#25D366";
          btnSend.style.opacity = "1";
          contactForm.reset();
          
          setTimeout(() => {
            btnSend.textContent = originalText;
            btnSend.style.background = originalBg;
            btnSend.disabled = false;
            btnSend.style.cursor = "pointer";
          }, 3000);
        }, function(error) {
          console.error('[EmailJS] Erro ao enviar:', error);
          console.error('Status do erro:', error.status);
          console.error('Texto do erro:', error.text);
          console.warn('EmailJS não configurado. Usando mailto: como alternativa.');
          
          // En cas d'erreur EmailJS, utiliser automatiquement mailto:
          const subject = encodeURIComponent(`Contact de ${name}`);
          const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
          window.location.href = `mailto:mohcine.laaraj2@usmba.ac.ma?subject=${subject}&body=${body}`;
          
          btnSend.textContent = "Ouverture du client email...";
          btnSend.style.background = "#474af0";
          btnSend.style.opacity = "1";
          
          setTimeout(() => {
            btnSend.textContent = originalText;
            btnSend.style.background = originalBg;
            btnSend.disabled = false;
            btnSend.style.cursor = "pointer";
            contactForm.reset();
          }, 2000);
        });
    });
  } else {
    console.error("Formulário de contato não encontrado!");
  }
});
