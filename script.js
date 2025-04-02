document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Mobile menu toggle with animation
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Navigation handling with smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active states with transition
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.style.opacity = '0.7';
            });
            link.classList.add('active');
            link.style.opacity = '1';
            
            // Smooth section transition
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    section.classList.remove('active');
                    if (section.id === targetId) {
                        section.classList.add('active');
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }
                }, 300);
            });

            // Close mobile menu if open
            navLinksContainer.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

            // Smooth scroll with offset
            const targetSection = document.getElementById(targetId);
            const offset = 80; // Height of the fixed navbar
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Typing animation for terminal commands
    const commands = document.querySelectorAll('.command');
    const outputs = document.querySelectorAll('.output');
    
    async function typeText(element, text, speed = 50) {
        element.textContent = '';
        for (let char of text) {
            element.textContent += char;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    async function animateTerminal() {
        for (let i = 0; i < commands.length; i++) {
            await typeText(commands[i], commands[i].textContent);
            outputs[i].style.opacity = '0';
            outputs[i].style.transform = 'translateY(10px)';
            outputs[i].style.display = 'block';
            await new Promise(resolve => setTimeout(resolve, 300));
            outputs[i].style.transition = 'all 0.5s ease-out';
            outputs[i].style.opacity = '1';
            outputs[i].style.transform = 'translateY(0)';
        }
    }

    // Start terminal animation
    animateTerminal();

    // Animated background effect with smooth transition
    const background = document.querySelector('.animated-background');
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });

    function updateBackground() {
        // Smooth transition of background position
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        background.style.background = `
            radial-gradient(
                circle at ${currentX * 100}% ${currentY * 100}%,
                rgba(255,0,0,0.1) 0%,
                rgba(0,0,0,0.9) 50%
            )
        `;
        
        requestAnimationFrame(updateBackground);
    }
    
    updateBackground();

    // Skills progress bars animation with counter
    const skills = document.querySelectorAll('.skill');
    
    function animateSkills() {
        skills.forEach(skill => {
            const level = skill.getAttribute('data-level');
            const progressBar = skill.querySelector('.skill-progress');
            const levelDisplay = skill.querySelector('.skill-level');
            
            progressBar.style.width = '0%';
            let currentLevel = 0;
            
            const interval = setInterval(() => {
                if (currentLevel >= level) {
                    clearInterval(interval);
                } else {
                    currentLevel++;
                    progressBar.style.width = `${currentLevel}%`;
                    levelDisplay.textContent = `${currentLevel}%`;
                }
            }, 20);
        });
    }

    // Animate skills when skills section becomes visible
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                // Animate skill cards
                const skillCards = entry.target.querySelectorAll('.skill');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);

    // Initialize skill cards
    skills.forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = 'all 0.5s ease-out';
    });

    // Project cards hover effect
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.transform = 'translateY(-10px)';
            project.style.boxShadow = '0 10px 20px rgba(255, 0, 0, 0.3)';
        });
        
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'translateY(0)';
            project.style.boxShadow = 'none';
        });
    });

    // Social buttons interactive effect
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
            const icon = button.querySelector('i');
            icon.style.transform = 'scale(1.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            const icon = button.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });
});

// Loading Screen Handler
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const startupSound = new Audio('assets/audio/startup.mp3');
    startupSound.volume = 1.0; // رفع مستوى الصوت للأقصى
    
    // Function to handle the transition
    const startTransition = () => {
        // محاولة تشغيل الصوت
        startupSound.play()
            .then(() => {
                console.log('Sound playing successfully');
            })
            .catch(err => {
                console.log('Sound play failed:', err);
            });

        // بدء تلاشي الشاشة
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 1s ease-out';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }, 500);
    };

    // محاولة تشغيل الصوت عند النقر في أي مكان
    document.addEventListener('click', function initAudio() {
        startTransition();
        document.removeEventListener('click', initAudio);
    }, { once: true });

    // بدء التلاشي تلقائياً بعد 3 ثواني إذا لم يتم النقر
    setTimeout(() => {
        startTransition();
    }, 3000);
}); 