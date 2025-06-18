const texts = [
    "App Developer",
    "Problem Solver",
    "ML Enthusiast",
    "Competitive Programmer",
    "Tech Innovator"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');

function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 200;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
typeWriter();

// Add more particles dynamically
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    document.querySelector('.fixed.inset-0').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Create particles periodically
setInterval(createParticle, 2000);

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// Initialize counters when section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stats-counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.getElementById('about'));

// Add hover effects to skill badges
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    });

    // --- Starry Background ---
    const starsCanvas = document.getElementById('stars-canvas');
    const ctx = starsCanvas.getContext('2d');
    let stars = [];
    const numStars = 150;
    let animationFrameIdStars;

    function setupStars() {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * starsCanvas.width,
                y: Math.random() * starsCanvas.height,
                radius: Math.random() * 1.2 + 0.3,
                opacity: Math.random() * 0.6 + 0.2,
                speedX: (Math.random() - 0.5) * 0.25,
                speedY: (Math.random() - 0.5) * 0.25
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            // Star color is light, suitable for dark backgrounds. 
            // If you want this to adapt more for light mode, you might change this color dynamically,
            // but for always visible, a universally visible color is good.
            ctx.fillStyle = `rgba(226, 232, 240, ${star.opacity})`; // slate-200 with opacity
            ctx.fill();
        });
    }

    function updateStars() {
        stars.forEach(star => {
            star.x += star.speedX;
            star.y += star.speedY;
            // Boundary checks (wrap around)
            if (star.x < 0) star.x = starsCanvas.width;
            if (star.x > starsCanvas.width) star.x = 0;
            if (star.y < 0) star.y = starsCanvas.height;
            if (star.y > starsCanvas.height) star.y = 0;
        });
    }

    function animateStars() {
        drawStars();
        updateStars();
        animationFrameIdStars = requestAnimationFrame(animateStars);
    }

    function startStarAnimation() {
        starsCanvas.style.display = 'block'; // Make canvas visible
        if (!animationFrameIdStars) { // Only start if not already running
            setupStars();
            animateStars();
        }
    }

    // Start the star animation as soon as the DOM is ready
    startStarAnimation();

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');

    function applyTheme(theme) {
        if (theme === 'light') {
            htmlElement.classList.add('light');
            htmlElement.classList.remove('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
            document.documentElement.style.setProperty('--scrollbar-track-bg', '#f1f5f9');
            // Stars are no longer stopped in light mode
        } else { // 'dark'
            htmlElement.classList.add('dark');
            htmlElement.classList.remove('light');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            document.documentElement.style.setProperty('--scrollbar-track-bg', '#1e293b');
            // Stars are already started and will continue
        }
    }

    // Initialize theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    // Always default to dark unless user explicitly chose light
    if (savedTheme === 'light') {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }

    themeToggle.addEventListener('click', () => {
        const newTheme = htmlElement.classList.contains('light') ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-darkCard/80', 'dark:bg-lightCard/80', 'backdrop-blur-md', 'shadow-lg', 'py-3');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('bg-darkCard/80', 'dark:bg-lightCard/80', 'backdrop-blur-md', 'shadow-lg', 'py-3');
            header.classList.add('py-4');
        }
    });

    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        mobileMenu.classList.add('-translate-x-full');
        document.body.style.overflow = '';
    }

    closeMobileMenuButton.addEventListener('click', closeMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('-translate-x-full')) closeMenu();
    });

    // --- Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal')) entry.target.classList.add('reveal-visible');
                if (entry.target.classList.contains('reveal-left')) entry.target.classList.add('reveal-left-visible');
                if (entry.target.classList.contains('reveal-right')) entry.target.classList.add('reveal-right-visible');
                if (entry.target.classList.contains('reveal-scale')) entry.target.classList.add('reveal-scale-visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const revealObserver = new IntersectionObserver(observerCallback, observerOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- Update Current Year ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Window Resize for Stars ---
    window.addEventListener('resize', () => {
        // Stars should always be visible and animating, so always re-initialize on resize.
        if (animationFrameIdStars) { // If animation was running, cancel it first
            cancelAnimationFrame(animationFrameIdStars);
            animationFrameIdStars = null;
        }
        setupStars(); // This also sets new canvas width/height and re-populates stars
        animateStars(); // Restarts animation with new dimensions
    });

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header nav a.nav-link');
    const mobileNavLinksJS = document.querySelectorAll('#mobile-menu nav a.mobile-nav-link');

    function changeNav() {
        let index = sections.length;
        while (--index && window.scrollY + 100 < sections[index].offsetTop) { } // 100 is an offset

        navLinks.forEach((link) => link.classList.remove('active'));
        mobileNavLinksJS.forEach((link) => link.classList.remove('active'));

        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
        const activeSectionId = sections[index] ? sections[index].id : null;
        if (activeSectionId) {
            const activeMobileLink = document.querySelector(`#mobile-menu nav a[href="#${activeSectionId}"]`);
            if (activeMobileLink) activeMobileLink.classList.add('active');
        }
    }
    changeNav(); // Initial call
    window.addEventListener('scroll', changeNav);

    // --- Contact Form Handling (Demo) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            formStatus.innerHTML = '<p class="text-green-500 dark:text-green-400">Message sent successfully! (Demo)</p>';
            contactForm.reset();
            setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
        });
    }

    // --- Gemini API Integration for Project Descriptions ---
    const enhanceButtons = document.querySelectorAll('.ai-enhance-button');
    enhanceButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const projectIndex = button.dataset.projectIndex;
            const descriptionElement = document.getElementById(`project-desc-${projectIndex}`);
            const statusElement = document.getElementById(`ai-status-${projectIndex}`);
            const originalButtonText = button.innerHTML;

            if (!descriptionElement || !statusElement) {
                console.error('Could not find description or status element for project index:', projectIndex);
                return;
            }

            const currentDescription = descriptionElement.textContent;

            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enhancing...';
            button.classList.add('loading');
            button.disabled = true;
            statusElement.textContent = 'Processing with AI...';
            statusElement.className = 'ai-status text-sky-500 dark:text-sky-400';


            const prompt = `You are an expert copywriter specializing in tech portfolios. Enhance the following project description to make it more engaging, professional, and impactful. Highlight key achievements and technologies if possible. Keep it concise, ideally 2-3 sentences. Original description: "${currentDescription}"`;

            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = ""; // Empty for gemini-2.0-flash in some environments
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Gemini API Error:', errorData);
                    throw new Error(`API request failed with status ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const enhancedText = result.candidates[0].content.parts[0].text;
                    descriptionElement.textContent = enhancedText;
                    statusElement.textContent = 'Description enhanced by AI! ✨';
                    statusElement.className = 'ai-status text-green-500 dark:text-green-400';
                } else {
                    console.error('Unexpected response structure from Gemini API:', result);
                    throw new Error('Could not extract text from AI response.');
                }

            } catch (error) {
                console.error('Error enhancing description:', error);
                statusElement.textContent = `Error: ${error.message.substring(0, 100)}...`;
                statusElement.className = 'ai-status text-red-500 dark:text-red-400';
            } finally {
                button.innerHTML = originalButtonText;
                button.classList.remove('loading');
                button.disabled = false;
                setTimeout(() => { statusElement.textContent = ''; }, 7000);
            }
        });
    });

    // --- Codeforces API Integration ---
    async function fetchCodeforcesData() {
        const username = 'mr-shakib'; // Fixed username to match profile link
        const apiUrl = `https://codeforces.com/api/user.info?handles=${username}`;
        const submissionsUrl = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`;

        try {
            console.log('Fetching Codeforces data for:', username);

            // Fetch user info
            const userResponse = await fetch(apiUrl);
            const userData = await userResponse.json();

            console.log('User data response:', userData);

            if (userData.status !== 'OK') {
                throw new Error(`API Error: ${userData.comment || 'Failed to fetch user data'}`);
            }

            const user = userData.result[0];

            // Fetch submissions to count solved problems
            const submissionsResponse = await fetch(submissionsUrl);
            const submissionsData = await submissionsResponse.json();

            console.log('Submissions data response status:', submissionsData.status);

            let solvedProblems = 0;
            if (submissionsData.status === 'OK') {
                const solvedSet = new Set();
                submissionsData.result.forEach(submission => {
                    if (submission.verdict === 'OK') {
                        solvedSet.add(`${submission.problem.contestId}${submission.problem.index}`);
                    }
                });
                solvedProblems = solvedSet.size;
            }

            console.log('Solved problems count:', solvedProblems);

            // Update the card with live data
            updateCodeforcesCard(user, solvedProblems);
        } catch (error) {
            console.error('Error fetching Codeforces data:', error);
            // Show error state in the card
            const errorElement = document.querySelector('#codeforces-error');
            const loadingElement = document.querySelector('#cf-loading');
            const contentElement = document.querySelector('#cf-content');

            if (loadingElement) {
                loadingElement.classList.add('hidden');
            }
            if (contentElement) {
                contentElement.classList.add('hidden');
            }
            if (errorElement) {
                errorElement.classList.remove('hidden');
            }
        }
    }

    function updateCodeforcesCard(user, solvedProblems) {
        // Update max rating
        const maxRatingElement = document.querySelector('#cf-max-rating');
        const currentRatingElement = document.querySelector('#cf-current-rating');
        const rankElement = document.querySelector('#cf-rank');
        const solvedElement = document.querySelector('#cf-solved');
        const loadingElement = document.querySelector('#cf-loading');
        const lastUpdatedElement = document.querySelector('#cf-last-updated');

        if (maxRatingElement) {
            maxRatingElement.textContent = user.maxRating || user.rating || 'Unrated';
        }

        if (currentRatingElement) {
            currentRatingElement.textContent = user.rating || 'Unrated';
        }

        if (rankElement) {
            const rank = user.maxRank || user.rank || 'Unrated';
            rankElement.textContent = rank;
            rankElement.className = `font-bold ${getRankColor(rank)}`;
        }

        if (solvedElement) {
            solvedElement.textContent = `${solvedProblems}+`;
        }

        if (lastUpdatedElement) {
            const now = new Date();
            lastUpdatedElement.textContent = now.toLocaleTimeString();
        }

        // Hide loading indicator
        if (loadingElement) {
            loadingElement.classList.add('hidden');
        }

        // Show the updated content
        const contentElement = document.querySelector('#cf-content');
        if (contentElement) {
            contentElement.classList.remove('hidden');
        }
    }

    function getRankColor(rank) {
        const rankColors = {
            'newbie': 'text-gray-500',
            'pupil': 'text-green-500',
            'specialist': 'text-cyan-500',
            'expert': 'text-blue-500',
            'candidate master': 'text-purple-500',
            'master': 'text-orange-500',
            'international master': 'text-orange-600',
            'grandmaster': 'text-red-500',
            'international grandmaster': 'text-red-600',
            'legendary grandmaster': 'text-red-700'
        }; return rankColors[rank?.toLowerCase()] || 'text-gray-500';
    }

    // Initial fetch for Codeforces data
    fetchCodeforcesData();

    // Add refresh button functionality
    const refreshButton = document.querySelector('#cf-refresh');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            // Reset card state
            const loadingElement = document.querySelector('#cf-loading');
            const contentElement = document.querySelector('#cf-content');
            const errorElement = document.querySelector('#codeforces-error');

            if (loadingElement) loadingElement.classList.remove('hidden');
            if (contentElement) contentElement.classList.add('hidden');
            if (errorElement) errorElement.classList.add('hidden');

            // Add spinning animation to refresh button
            refreshButton.querySelector('i').classList.add('fa-spin');

            // Fetch new data
            fetchCodeforcesData().finally(() => {
                // Remove spinning animation
                setTimeout(() => {
                    refreshButton.querySelector('i').classList.remove('fa-spin');
                }, 500);
            });
        });
    }
});
