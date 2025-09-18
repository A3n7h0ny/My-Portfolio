 // Delay showing main content until splash finishes
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 3000); // Matches fade-out timing




    
// portfolioJS.js - Updated with hamburger menu fixes

document.addEventListener('DOMContentLoaded', function() {
    // ====== 1. SELECT ELEMENTS ======
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ====== 2. TOGGLE MENU FUNCTION ======
    function toggleMenu() {
        // Toggle hamburger animation
        hamburger.classList.toggle('active');
        
        // Toggle menu visibility
        navMenu.classList.toggle('active');
        
        // NEW: Toggle body scroll lock
        document.body.classList.toggle('no-scroll');
        
        // NEW: Update aria-expanded for accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    }

    // ====== 3. HAMBURGER CLICK EVENT ======
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // NEW: Prevent event bubbling
        toggleMenu();
    });

    // ====== 4. CLOSE MENU WHEN CLICKING LINKS ======
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) { // Only for mobile
                toggleMenu();
            }
        });
    });

    // ====== 5. CLOSE MENU WHEN CLICKING OUTSIDE ======
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && 
            !hamburger.contains(e.target) && 
            navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ====== 6. RESPONSIVE NAVIGATION HANDLER ======
    function handleResponsiveNav() {
        const screenWidth = window.innerWidth;
        const navItems = document.querySelectorAll('nav ul li');

        if (screenWidth <= 768) {
            // Mobile view - show hamburger
            hamburger.style.display = 'flex';
            
            // NEW: Ensure all links are visible in menu
            navItems.forEach(item => {
                item.style.display = 'block';
            });
        } else {
            // Desktop view - hide hamburger
            hamburger.style.display = 'none';
            
            // NEW: Reset any mobile styles
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    // ====== 7. INITIAL SETUP ======
    // NEW: Add ARIA attributes for accessibility
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'nav-menu');

    // Initialize responsive navigation
    handleResponsiveNav();
    
    // Set up resize listener
    window.addEventListener('resize', handleResponsiveNav);

    // ====== 8. SPLASH SCREEN DELAY ======
    // Keep your existing splash screen timeout
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 3000);
});

// ====== NEW: TOUCH EVENT SUPPORT ======
document.addEventListener('touchstart', function(e) {
    // Close menu if touching outside
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
}, { passive: true });


// Simple typewriter effect for code
document.addEventListener('DOMContentLoaded', function() {
    const codeLines = document.querySelectorAll('.code-line');
    let delay = 0;
    
    codeLines.forEach(line => {
        line.style.width = '0';
        setTimeout(() => {
            line.style.transition = 'width 1.5s ease';
            line.style.width = '100%';
        }, delay);
        delay += 150;
    });
});

// Enhanced theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    
    // Fix any scrolling issues after theme change
    setTimeout(fixScrollAfterThemeChange, 100);
}

// Initial theme application
applyTheme(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const isLightMode = document.body.classList.contains('light-mode');
    
    if (isLightMode) {
        localStorage.setItem('theme', 'dark');
        applyTheme('dark');
    } else {
        localStorage.setItem('theme', 'light');
        applyTheme('light');
    }
});

// Fix scroll function
function fixScrollAfterThemeChange() {
    // Force a reflow to fix scrolling issues
    const currentScroll = window.pageYOffset;
    window.scrollTo(0, currentScroll + 1);
    window.scrollTo(0, currentScroll);
}



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.querySelector('nav ul');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.classList.remove('no-scroll');
            }
            
            // Smooth scroll to target
            const targetPosition = targetElement.getOffsetTop() - 80; // Adjust for header height
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Helper function to get element position
Element.prototype.getOffsetTop = function() {
    let offsetTop = 0;
    let element = this;
    
    while(element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    
    return offsetTop;
};

// Optional: Add smooth scrolling for Safari
if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    // Safari detected - use custom smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const hamburger = document.getElementById('hamburger');
                    const navMenu = document.querySelector('nav ul');
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.classList.remove('no-scroll');
                }
                
                // Custom smooth scroll for Safari
                const targetPosition = targetElement.getOffsetTop() - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// Fix for scroll behavior when switching themes
function fixScrollAfterThemeChange() {
    // Force a reflow to fix scrolling issues
    setTimeout(() => {
        window.scrollTo({
            top: window.pageYOffset + 1,
            behavior: 'auto'
        });
        
        setTimeout(() => {
            window.scrollTo({
                top: window.pageYOffset - 1,
                behavior: 'auto'
            });
        }, 50);
    }, 100);
}

// Call this after theme change
// Add this to your theme toggle function:
// fixScrollAfterThemeChange();


// Always scroll to header on page load/refresh
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Additional insurance - scroll to header after a short delay
    setTimeout(function() {
        const header = document.querySelector('header');
        if (header) {
            header.scrollIntoView({ behavior: 'auto' });
        }
        window.scrollTo(0, 0);
    }, 100);
});

// Handle page refresh specifically
if (performance.navigation.type === 1) {
    // Page was refreshed - force scroll to top
    window.scrollTo(0, 0);
    
    setTimeout(function() {
        window.scrollTo(0, 0);
        const header = document.querySelector('header');
        if (header) {
            header.scrollIntoView({ behavior: 'auto' });
        }
    }, 150);
}

// Also handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was loaded from cache (back/forward navigation)
        window.scrollTo(0, 0);
        
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 50);
    }
});

// Additional insurance - scroll to top when page is fully loaded
window.onload = function() {
    window.scrollTo(0, 0);
    
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 200);
};

// Override any anchor links that might be causing the page to scroll elsewhere
document.addEventListener('DOMContentLoaded', function() {
    // Remove any hash from URL that might cause scrolling to other sections
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
});

// Modify your existing navigation code if needed
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // For header link, scroll to top
            if (targetId === '#home' || targetId === '#header') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // For other sections, scroll to them
                const targetPosition = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Enhanced solution to always show header on refresh
(function() {
    // Set a flag that we've just loaded the page
    sessionStorage.setItem('freshLoad', 'true');
    
    // Function to scroll to top
    function scrollToTop() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Double insurance
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 50);
    }
    
    // Run on DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        if (sessionStorage.getItem('freshLoad') === 'true') {
            scrollToTop();
            sessionStorage.removeItem('freshLoad');
        }
    });
    
    // Run on full page load
    window.addEventListener('load', function() {
        scrollToTop();
        
        // Clear any URL hash that might cause scrolling to other sections
        if (window.location.hash) {
            history.replaceState(null, null, ' ');
        }
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            scrollToTop();
        }
    });
    
    // Initial scroll
    scrollToTop();
})();



                                                                     //skill animation

document.addEventListener('DOMContentLoaded', function() {
            const progressBars = document.querySelectorAll('progress');
            const skills = document.querySelectorAll('.skill');
            
            // Store original values
            progressBars.forEach(progress => {
                progress.setAttribute('data-value', progress.value);
                progress.value = 0;
            });
            
            // Intersection Observer to trigger animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progress = entry.target.querySelector('progress');
                        const value = progress.getAttribute('data-value');
                        
                        // Reset and animate
                        progress.value = 0;
                        
                        setTimeout(() => {
                            progress.value = value;
                        }, 100);
                    } else {
                        // Reset when out of view
                        const progress = entry.target.querySelector('progress');
                        progress.value = 0;
                    }
                });
            }, {
                threshold: 0.5
            });
            
            // Observe each skill
            skills.forEach(skill => {
                observer.observe(skill);
            });
        });





  document.addEventListener("DOMContentLoaded", function() {
            const carousel = document.getElementById("carousel-container");
            const prevBtn = document.getElementById("prev-btn");
            const nextBtn = document.getElementById("next-btn");
            const dotsContainer = document.getElementById("carousel-dots");
            const projectItems = document.querySelectorAll(".project-item");
            
            let itemsToShow = 3;
            let currentIndex = 0;
            const totalItems = projectItems.length;
            
            function updateItemsToShow() {
                if (window.innerWidth <= 768) {
                    itemsToShow = 1;
                } else if (window.innerWidth <= 992) {
                    itemsToShow = 2;
                } else {
                    itemsToShow = 3;
                }
                
                updateDots();
                updateCarousel();
            }
            
            function getTotalSlides() {
                return Math.max(totalItems - itemsToShow + 1, 1);
            }
            
            function updateDots() {
                dotsContainer.innerHTML = "";
                const totalSlides = getTotalSlides();
                
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement("div");
                    dot.classList.add("dot");
                    if (i === currentIndex) dot.classList.add("active");
                    dot.addEventListener("click", () => goToSlide(i));
                    dotsContainer.appendChild(dot);
                }
            }
            
            function updateCarousel() {
                const itemWidth = carousel.offsetWidth / itemsToShow;
                const offset = -currentIndex * itemWidth;
                carousel.style.transform = `translateX(${offset}px)`;
                
                document.querySelectorAll(".dot").forEach((dot, i) => {
                    dot.classList.toggle("active", i === currentIndex);
                });
            }
            
            function goToSlide(index) {
                const totalSlides = getTotalSlides();
                
                if (index < 0) {
                    currentIndex = totalSlides - 1;
                } else if (index >= totalSlides) {
                    currentIndex = 0;
                } else {
                    currentIndex = index;
                }
                
                updateCarousel();
            }
            
            // Event listeners
            nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
            prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
            
            // Touch events for mobile
            let startX = 0;
            let isDragging = false;
            
            carousel.addEventListener("touchstart", function(e) {
                startX = e.touches[0].clientX;
                isDragging = true;
            }, { passive: true });
            
            carousel.addEventListener("touchmove", function(e) {
                if (!isDragging) return;
                const currentX = e.touches[0].clientX;
                const diff = startX - currentX;
                
                // Prevent vertical scrolling if horizontal swipe is detected
                if (Math.abs(diff) > 10) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            carousel.addEventListener("touchend", function(e) {
                if (!isDragging) return;
                
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (diff > 50) {
                    goToSlide(currentIndex + 1);
                } else if (diff < -50) {
                    goToSlide(currentIndex - 1);
                }
                
                isDragging = false;
            }, { passive: true });
            
            // Initialize
            updateItemsToShow();
            window.addEventListener("resize", updateItemsToShow);
        });

        const counters = document.querySelectorAll(".stat-number");

    function animateCounters() {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        counter.textContent = "0"; // reset every time
        let count = 0;
        const increment = Math.ceil(target / 100);

        function updateCounter() {
          if (count < target) {
            count += increment;
            counter.textContent = count > target ? target : count;
            requestAnimationFrame(updateCounter);
          }
        }

        updateCounter();
      });
    }

    // Intersection Observer to trigger every time section enters view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
      }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector(".stats-section"));


//time line section
    document.addEventListener("scroll", () => {
  const items = document.querySelectorAll(".timeline-item");
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      item.classList.add("show");
    }
  });
});



//contact section

 // Animation for form elements
        document.addEventListener("DOMContentLoaded", function() {
            const formGroups = document.querySelectorAll('.form-group');
            
            // Intersection Observer for form elements
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                            setTimeout(() => {
                                entry.target.classList.add('in-view');
                            }, index * 150);
                        }
                    });
                }, { threshold: 0.3 });
                
                formGroups.forEach(group => {
                    observer.observe(group);
                });
            } else {
                // Fallback for browsers without Intersection Observer
                formGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.classList.add('in-view');
                    }, index * 150);
                });
            }
            
            // Form submission effect
            const submitBtn = document.querySelector('.submit-btn');
            const contactForm = document.querySelector('.contact-form');
            
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Simple form validation
                let isValid = true;
                const inputs = contactForm.querySelectorAll('input, textarea');
                
                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#ff3860';
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (!isValid) {
                    this.innerHTML = 'Please fill all fields!';
                    this.style.background = 'linear-gradient(135deg, #ff3860, #ff3860)';
                    
                    setTimeout(() => {
                        this.innerHTML = 'Send Message';
                        this.style.background = 'linear-gradient(135deg, #8a42fd, #2cceff)';
                    }, 2000);
                    return;
                }
                
                // Add a simple animation
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                this.style.opacity = '0.8';
                
                // Simulate form submission
                setTimeout(() => {
                    this.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                    this.style.background = 'linear-gradient(135deg, #00c853, #64dd17)';
                    
                    // Reset form
                    inputs.forEach(input => {
                        input.value = '';
                    });
                    
                    // Reset button after a while
                    setTimeout(() => {
                        this.innerHTML = 'Send Message';
                        this.style.background = 'linear-gradient(135deg, #8a42fd, #2cceff)';
                        this.style.opacity = '1';
                    }, 3000);
                }, 1500);
            });
            
            // Make contact details clickable
            const contactDetails = document.querySelectorAll('.contact-detail');
            contactDetails.forEach(detail => {
                detail.addEventListener('click', function() {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                });
            });
        });

        //nav automation

      // Navigation active link highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Map of section IDs to data-section values
    const sectionMap = {
        'home': 'home',
        'AB': 'about',
        'MS': 'skills',
        'PR': 'projects',
        'JY': 'journey',
        'CX': 'contact'
    };
    
    // Function to highlight the active link
    function highlightNavLink(sectionId) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the corresponding link
        const dataSectionValue = sectionMap[sectionId];
        if (dataSectionValue) {
            const activeLink = document.querySelector(`.nav-link[data-section="${dataSectionValue}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Intersection Observer to detect visible sections
    // Replace just this part of your existing code:
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50% 0px', // Changed from '-20% 0px -70% 0px'
    threshold: 0.2 // Changed from 0.1
};
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                highlightNavLink(sectionId);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        if (sectionId && sectionMap[sectionId]) {
            observer.observe(section);
        }
    });
    
    // Also highlight on click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Highlight home section by default if at top of page
    window.addEventListener('load', function() {
        if (window.scrollY < 100) {
            highlightNavLink('home');
        }
    });
    
    // Handle scroll to update active link
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // If at top of page, highlight home
            if (window.scrollY < 100) {
                highlightNavLink('home');
            }
        }, 100);
    });
});


//scroll and type animation



function restartTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    // Remove and re-add the animation
    typingElement.style.animation = 'none';
    void typingElement.offsetWidth; // Trigger reflow
    typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
}

// Restart the typing animation every 2 minutes
setInterval(restartTypingAnimation, 60000);

// Also restart when the element becomes visible again
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    // Create observer with proper error handling
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    restartTypingAnimation();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(typingElement);
    }
});



// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    restartTypingAnimation();
    setupCodeEditorScrolling();
});





document.addEventListener("DOMContentLoaded", () => {
            const editorContent = document.getElementById("editorContent");
            const lines = editorContent.querySelectorAll(".code-line");
            
            // Store original HTML for each line
            const originalLines = [];
            lines.forEach(line => {
                originalLines.push(line.innerHTML);
                line.innerHTML = ""; // Clear the content for typing animation
                line.style.opacity = "0";
            });
            
            let lineIndex = 0;
            let currentLineElement = null;
            let currentLineIndex = 0;
            let currentCharIndex = 0;
            let typingSpeed = 5; // ms per character
            let lineDelay = 25; // ms between lines
            let fadeDelay = 2000; // ms before fading out
            
            function startTypingAnimation() {
                lineIndex = 0;
                typeNextLine();
            }
            
            function typeNextLine() {
                if (lineIndex >= lines.length) {
                    // All lines are typed, wait and then fade out
                    setTimeout(fadeOutLines, fadeDelay);
                    return;
                }
                
                currentLineElement = lines[lineIndex];
                currentLineIndex = lineIndex;
                currentCharIndex = 0;
                
                // Fade in the line
                currentLineElement.style.opacity = "1";
                
                typeNextCharacter();
                lineIndex++;
            }
            
            function typeNextCharacter() {
                if (currentCharIndex < originalLines[currentLineIndex].length) {
                    currentLineElement.innerHTML = originalLines[currentLineIndex].substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    setTimeout(typeNextCharacter, typingSpeed);
                } else {
                    // Add cursor to the end of the completed line
                    currentLineElement.innerHTML = originalLines[currentLineIndex] + '<span class="typed-cursor"></span>';
                    
                    // Move to next line after a delay
                    setTimeout(() => {
                        // Remove cursor from current line
                        currentLineElement.innerHTML = originalLines[currentLineIndex];
                        
                        // Start typing next line
                        typeNextLine();
                    }, lineDelay);
                }
            }
            
            function fadeOutLines() {
                let fadeIndex = 0;
                
                function fadeNextLine() {
                    if (fadeIndex >= lines.length) {
                        // All lines are faded out, restart the animation
                        setTimeout(startTypingAnimation, 500);
                        return;
                    }
                    
                    lines[fadeIndex].style.opacity = "0";
                    fadeIndex++;
                    setTimeout(fadeNextLine, 50); // Speed of fade out
                }
                
                fadeNextLine();
            }
            
            // Start the typing animation after a short delay
            setTimeout(startTypingAnimation, 1000);
        });
        

        // Effect selection for bounce animation
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.querySelector('.name-animation');
    
    // Set bounce animation on load
    setTimeout(() => {
        nameElement.style.animation = 'hue-rotate 5s linear infinite, bounceIn 1.2s ease forwards';
    }, 500);
});


// Add this to your JavaScript file
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function restartAnimation() {
    const nameElement = document.querySelector('.name-animation');
    const header = document.getElementById('home');
    
    if (isElementInViewport(header)) {
        // Reset animation
        nameElement.style.animation = 'none';
        
        // Trigger reflow
        void nameElement.offsetWidth;
        
        // Restart animation
        nameElement.style.animation = 'hue-rotate 5s linear infinite, bounceIn 1.2s ease forwards';
    }
}

// Run on scroll and initial load
window.addEventListener('scroll', restartAnimation);
window.addEventListener('load', restartAnimation);


// Debounce scroll events for better performance
let scrollTimeout;
function optimizeScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        // Your scroll handling code here
    }, 100);
}

window.addEventListener('scroll', optimizeScroll, { passive: true });


