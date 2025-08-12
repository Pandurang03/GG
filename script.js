// home page
// ========== MOBILE NAVIGATION TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== THEME TOGGLE ==========
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ========== KEY FEATURE ANIMATION ==========
// animation with GSAP 
document.addEventListener('DOMContentLoaded', function() {
    // Only load if GSAP is available
    if (typeof gsap !== 'undefined') {
      gsap.from('.features-title h2', {
        scrollTrigger: {
          trigger: '.key-features',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.from('.feature-item', {
        scrollTrigger: {
          trigger: '.features-list',
          start: 'top 70%'
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out'
      });
    } else {
      // Fallback for when GSAP isn't available
      const featureItems = document.querySelectorAll('.feature-item');
      featureItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      });
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });
      
      featureItems.forEach(item => observer.observe(item));
      observer.observe(document.querySelector('.features-title'));
    }
  });

// ========== BREATHING ANIMATION ==========
const breatheBtn = document.getElementById('breatheBtn');
const breathingAnimation = document.getElementById('breathingAnimation');
const instructions = document.getElementById('instructions');
const counter = document.getElementById('counter');
const circle = document.querySelector('.circle');

let isAnimating = false;
let animationInterval;
let currentStep = 0;
let count = 0;

const breathingSequence = [
    { text: "Breathe In", duration: 4, className: "breathing-in" },
    { text: "Hold", duration: 4, className: "holding" },
    { text: "Breathe Out", duration: 4, className: "breathing-out" },
    { text: "Hold", duration: 4, className: "holding" }
];

function startBreathingAnimation() {
    isAnimating = true;
    breatheBtn.textContent = "Stop Breathing";
    breathingAnimation.style.display = "block";
    
    // Start with first step
    currentStep = 0;
    updateAnimation();
    
    // Set interval for animation sequence (4000ms = 4 seconds)
    animationInterval = setInterval(updateAnimation, 4000);
}

function stopBreathingAnimation() {
    isAnimating = false;
    clearInterval(animationInterval);
    breatheBtn.textContent = "Breathe with Me";
    breathingAnimation.style.display = "none";
    circle.className = "circle";
    instructions.textContent = "Click to start";
    counter.textContent = "";
}

function updateAnimation() {
    const step = breathingSequence[currentStep];
    
    // Update UI elements
    instructions.textContent = step.text;
    circle.className = "circle " + step.className;
    
    // Start countdown timer
    count = step.duration;
    counter.textContent = count;
    
    const countdown = setInterval(() => {
        count--;
        counter.textContent = count;
        
        if (count <= 0) {
            clearInterval(countdown);
        }
    }, 1000);
    
    // Move to next step (looping back to 0 after last step)
    currentStep = (currentStep + 1) % breathingSequence.length;
}

// Toggle animation when button is clicked
breatheBtn.addEventListener('click', () => {
    if (isAnimating) {
        stopBreathingAnimation();
    } else {
        startBreathingAnimation();
    }
});

// Close animation when clicking outside
document.addEventListener('click', (e) => {
    if (isAnimating && 
        !breathingAnimation.contains(e.target) && 
        e.target !== breatheBtn) {
        stopBreathingAnimation();
    }
});

// ========== SCROLL ANIMATIONS ==========
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-item, .value-card, .feature-box');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.about-item, .value-card, .feature-box').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


// resources page
// Initialize Swiper slider
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Tab functionality for guided meditations
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        // Ensure audio players are properly initialized after tab switch
        if (button.getAttribute('data-tab') === 'audio-meditations') {
            document.querySelectorAll('.audio-play-button').forEach(btn => {
                btn.innerHTML = '<i class="fas fa-play"></i>';
            });
        }
    });
});

// Random Act of Kindness Generator
document.addEventListener('DOMContentLoaded', () => {
    console.log("JS Loaded");

    const kindnessIdeas = [
        "Compliment a stranger genuinely",
        "Pay for the coffee of the person behind you",
        "Send an encouraging text to a friend",
        "Leave a positive note in a public place",
        "Donate items you no longer need",
        "Offer to help someone with their bags",
        "Write a thank you note to someone who helped you",
        "Let someone go ahead of you in line",
        "Share your umbrella with someone",
        "Leave a generous tip for good service",
        "Offer to return someone's shopping cart",
        "Share a book you've enjoyed with someone",
        "Give up your seat on public transport",
        "Bake cookies for your neighbors",
        "Volunteer at a local charity"
    ];

    const kindnessIdeaElement = document.getElementById('kindness-idea');
    const generateKindnessBtn = document.getElementById('generate-kindness');

    console.log("kindnessIdeaElement:", kindnessIdeaElement);
    console.log("generateKindnessBtn:", generateKindnessBtn);

    generateKindnessBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * kindnessIdeas.length);
        kindnessIdeaElement.textContent = kindnessIdeas[randomIndex];
        
        // Add animation
        kindnessIdeaElement.style.animation = 'fadeIn 0.5s';
        setTimeout(() => {
            kindnessIdeaElement.style.animation = '';
        }, 500);
    });
});
// Add fadeIn animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);


// Initialize hidden items for See More functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hide all items beyond the first 4 in each section
    document.querySelectorAll('.resources-grid').forEach(grid => {
        const items = grid.querySelectorAll('.resource-item');
        items.forEach((item, index) => {
            if (index >= 4) {
                item.classList.add('hidden');
            }
        });
    });

    // Update audio meditation items to include players
    const audioMeditations = [
        {
            title: "Body Scan Meditation",
            src: "audio/body-scan.mp3"
        },
        {
            title: "Deep Breathing",
            src: "audio/deep-breathing.mp3"
        },
        {
            title: "Loving Kindness",
            src: "audio/loving-kindness.mp3"
        },
        {
            title: "Mindful Walking",
            src: "audio/mindful-walking.mp3"
        }
    ];

    document.querySelectorAll('#audio-meditations .resource-item').forEach((item, index) => {
        const audioData = audioMeditations[index];
        const audioContainer = document.createElement('div');
        audioContainer.className = 'audio-player-container';
        audioContainer.innerHTML = `
            <button class="audio-play-button"><i class="fas fa-play"></i></button>
            <audio src="${audioData.src}" title="${audioData.title}"></audio>
        `;
        item.querySelector('p').after(audioContainer);
    });
});


// faq page
// FAQ Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Load saved theme or prefer color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        themeIcon.classList.toggle('fa-moon', !isDark);
        themeIcon.classList.toggle('fa-sun', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    function closeAllAccordions() {
        accordionItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    accordionItems.forEach(item => {
        const btn = item.querySelector('.accordion-btn');
        
        btn.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            closeAllAccordions();
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Enhanced Search Functionality
    const faqSearch = document.getElementById('faq-search');
    const searchBtn = document.getElementById('search-btn');
    const noResults = document.querySelector('.no-results');
    
    function highlightMatches(text, term) {
        if (!term) return text;
        const regex = new RegExp(term, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
    
    function clearHighlights() {
        document.querySelectorAll('.highlight').forEach(hl => {
            hl.replaceWith(hl.textContent);
        });
    }
    
    function performSearch() {
        const term = faqSearch.value.trim().toLowerCase();
        clearHighlights();
        
        if (term.length < 2) {
            // Reset view if search is too short
            accordionItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('active');
            });
            noResults.style.display = 'none';
            return;
        }
        
        let hasMatches = false;
        
        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-btn');
            const content = item.querySelector('.accordion-content-inner');
            const questionText = question.textContent.toLowerCase();
            const contentText = content.textContent.toLowerCase();
            
            if (questionText.includes(term) || contentText.includes(term)) {
                // Show and highlight matches
                item.style.display = 'block';
                item.classList.add('active');
                
                // Highlight in question
                question.innerHTML = highlightMatches(question.textContent, term);
                
                // Highlight in answer
                content.innerHTML = highlightMatches(content.textContent, term);
                
                hasMatches = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        noResults.style.display = hasMatches ? 'none' : 'block';
    }
    
    // Event Listeners
    searchBtn.addEventListener('click', performSearch);
    faqSearch.addEventListener('input', performSearch);
    faqSearch.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            faqSearch.value = '';
            performSearch();
        }
    });
    
    // Auto-focus search on page load
    faqSearch.focus();
});

// ========== CHATBOT INTEGRATION (Flask) ==========
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatForm && userInput && chatMessages) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const message = userInput.value.trim();
            if (!message) return;

            // Append user message to chat
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.textContent = message;
            chatMessages.appendChild(userMsg);
            userInput.value = '';

            // Show typing indicator
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            botMsg.textContent = 'Thinking...';
            chatMessages.appendChild(botMsg);

            try {
                const res = await fetch('http://127.0.0.1:5000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message })
                });

                const data = await res.json();
                botMsg.textContent = data.response;
            } catch (err) {
                botMsg.textContent = "Sorry, I couldn't connect to the server.";
                console.error(err);
            }

            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }
});
