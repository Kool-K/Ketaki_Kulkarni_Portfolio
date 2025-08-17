document.addEventListener("DOMContentLoaded", function () {
    // --- LOADING SCREEN ---
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }
    });

    // --- STICKY HEADER ---
    const header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        header.classList.toggle("sticky", window.scrollY > 50);
    });

    // --- MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- TYPING EFFECT FOR HERO SUBTITLE ---
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    if (typedTextSpan && cursorSpan) {
        const textArray = ["Computer Science Engineer", "AI & Machine Learning Developer", "Web/App Developer"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }
        setTimeout(type, 1000);
    }

    // // --- SCROLL REVEAL ANIMATION ---
    const animatedElements = document.querySelectorAll(
        ".project-card, .timeline-item, .achievement-card"
    );
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    }
    );
    animatedElements.forEach((element) => observer.observe(element));

    // --- TIMELINE SCROLL ANIMATIONS ---
    function animateTimelineOnScroll() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        animateTimelineOnScroll();
    });

    // --- INTERACTIVE 3D CARD TILT EFFECT ---
    const cards = document.querySelectorAll(".project-card, .achievement-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = y / 20;
            const rotateY = -x / 20;
            card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1500px) rotateX(0) rotateY(0)";
        });
    });

    // --- SKILL CONSTELLATION INTERACTION ---
    const skillsData = {
        "Python": "Extensive experience with Python for machine learning models, backend development with Flask/FastAPI, and data analysis using Pandas and Scikit-learn.",
        "C++": "Strong understanding of C++ for competitive programming, system-level development, and algorithm implementation.",
        "Swift": "iOS app development using Swift and Apple's frameworks. Experience building native iOS applications.",
        "JavaScript": "Frontend development with vanilla JS and React.js for dynamic web applications. Experience with DOM manipulation and modern ES6+ features.",
        "React": "Building responsive user interfaces with React.js, including state management and component-based architecture.",
        "SQL": "Database design and querying with MySQL and other relational databases. Experience with schema design and optimization.",
        "Gemini API": "Integrated Google's Gemini API for AI-powered features in projects, including the AI-Powered README Generator.",
        "FastAPI": "Developed backend services and RESTful APIs using Python's FastAPI framework with proper documentation.",
        "Docker": "Containerized applications for deployment and development environments. Experience with Docker Compose.",
        "GCP": "Google Cloud Platform services including deployment, cloud functions, and other cloud computing services.",
        "Git": "Version control and collaboration using Git and GitHub. Experience with team workflows and CI/CD pipelines.",
        "NLP": "Natural Language Processing techniques for text classification and analysis, including spam detection models.",
        "ML": "Machine Learning model development with Scikit-learn, including classification models and feature engineering.",
        "Competitive Programming": "Actively solving algorithmic challenges on platforms like CodeChef, demonstrating strong problem-solving abilities and a deep understanding of DSA.",
        "Prompt Engineering": "Skilled in designing and refining effective prompts for large language models like Google Gemini, ChatGPT to achieve specific, nuanced, and high-quality outputs."
    };
    const skillStars = document.querySelectorAll('.skill-star');
    const skillInfoDisplay = document.querySelector('.skill-info-display');
    const skillInfoName = document.querySelector('.skill-info-name');
    const skillInfoDesc = document.querySelector('.skill-info-desc');



    function showSkillInfo(skillName, shouldScroll = false) {
        if (!skillsData[skillName] || !skillInfoDisplay) return;

        skillInfoName.textContent = skillName;
        skillInfoDesc.textContent = skillsData[skillName];
        skillInfoDisplay.classList.add('active');

        if (shouldScroll) {
            skillInfoDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        skillStars.forEach(s => {
            s.classList.remove('active');
            if (s.getAttribute('data-skill') === skillName) {
                s.classList.add('active');
            }
        });
    }


    skillStars.forEach(star => {
        star.addEventListener('click', () => {
            const skill = star.getAttribute('data-skill');
            showSkillInfo(skill, true); // pass 'true' here to enable scrolling
            // This adds a class to the parent container to hide the "Click Me" bubble
            document.querySelector('.constellation-container').classList.add('interacted');
        });
    });

    function createConnections() {
        const constellation = document.querySelector('.constellation');
        if (!constellation) return;

        const stars = Array.from(document.querySelectorAll('.skill-star'));
        document.querySelectorAll('.connection').forEach(el => el.remove());

        // Updated connections (indexes 13 and 14 included)
        const connections = [
            [0, 4], [0, 7], [0, 10],
            [1, 10], [1, 3],
            [2, 3], [2, 12],
            [3, 4],
            [4, 6], [4, 8],
            [5, 10],
            [6, 11], [6, 7],
            [8, 9],
            [11, 12],

            // new conn for star 13
            [13, 0], [13, 5], [13, 8],

            // new conn for star 14
            [14, 2], [14, 6], [14, 9]
        ];

        const constellationRect = constellation.getBoundingClientRect();

        connections.forEach(pair => {
            const startStar = stars[pair[0]];
            const endStar = stars[pair[1]];
            if (startStar && endStar) {
                const startRect = startStar.getBoundingClientRect();
                const endRect = endStar.getBoundingClientRect();

                const x1 = startRect.left - constellationRect.left + startRect.width / 2;
                const y1 = startRect.top - constellationRect.top + startRect.height / 2;
                const x2 = endRect.left - constellationRect.left + endRect.width / 2;
                const y2 = endRect.top - constellationRect.top + endRect.height / 2;

                const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

                const line = document.createElement('div');
                line.className = 'connection';
                line.style.width = `${length}px`;
                line.style.left = `${x1}px`;
                line.style.top = `${y1}px`;
                line.style.transform = `rotate(${angle}deg)`;
                line.style.transformOrigin = '0 0';
                constellation.appendChild(line);
            }
        });
    }


    // --- SKILL CONSTELLATION - DEFAULT SELECTION ---
    function initializeConstellation() {
        const pythonStar = document.querySelector('.skill-star[data-skill="Python"]');
        if (pythonStar) {
            // Show the info for Python by default
            showSkillInfo('Python');

            // Add a class to trigger a one-time animation
            pythonStar.classList.add('featured-skill');

            // Remove the class after the animation so it doesn't conflict with hover -> optional
            setTimeout(() => {
                pythonStar.classList.remove('featured-skill');
            }, 1500); // IT Must be the same duration as the CSS animation
        }
    }


    window.addEventListener('load', createConnections);
    window.addEventListener('resize', createConnections);

    // Initialize the default selection after the page loads
    window.addEventListener('load', () => {
        setTimeout(initializeConstellation, 500); // 500ms delay for a smoother effect
    });

    // --- cv download in JS if required later check it once...---

    // const downloadBtn = document.getElementById('download-cv');
    // if (downloadBtn) {
    //     downloadBtn.addEventListener('click', function (event) {
    //         const filePath = this.getAttribute('href');
    //         event.preventDefault();
    //         fetch(filePath)
    //             .then(response => {
    //                 if (response.ok) {
    //                     window.location.href = filePath;
    //                 } else {
    //                     alert("Sorry, the CV file isn't available on the site right now.");
    //                 }
    //             })
    //             .catch(() => {
    //                 alert("Sorry, the CV file isn't available on the site right now.");
    //             });
    //     });
    // }

    // --- CONTACT LINK - COPY TO CLIPBOARD ---
    const contactLink = document.querySelector('.animated-contact-link');
    if (contactLink) {
        const contactText = contactLink.querySelector('.contact-text');
        const originalText = contactText.textContent;
        contactLink.addEventListener('click', function (event) {
            event.preventDefault();
            const email = this.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                contactText.textContent = 'Email Copied!';
                contactLink.classList.add('copied');
                setTimeout(() => {
                    contactText.textContent = originalText;
                    contactLink.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }

    // --- CURSOR COMET TRAIL EFFECT ---
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (document.body) {
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        document.body.appendChild(canvas);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const colors = ['#E5E7EB', '#FFFFFF', '#9CA3AF'];
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseMoved = false;

    document.addEventListener('mousemove', (e) => {
        if (!mouseMoved) {
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            mouseMoved = true;
        }
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const numParticles = Math.min(Math.floor(speed / 3), 5);
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: -dx * 0.1 * (Math.random() * 0.5 + 0.5),
                speedY: -dy * 0.1 * (Math.random() * 0.5 + 0.5),
                life: Math.random() * 30 + 30
            });
        }
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 60;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            p.x += p.speedX;
            p.y += p.speedY;
            p.speedX *= 0.98;
            p.speedY *= 0.98;
            p.life--;
            if (p.size > 0.1) p.size -= 0.05;
            if (p.life <= 0 || p.size <= 0.1) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();



});