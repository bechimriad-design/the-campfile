/* =========================================
   THE CAMPFILE: MASTER SCRIPT (FIXED TITLES)
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HEADER SHAPESHIFTER
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. SCROLL REVEAL (TITLES FIX)
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    const observerOptions = {
        // FIXED: Trigger as soon as 15% of the section is visible
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // TURN LIGHTS ON
                entry.target.classList.add("active");

                // Highlight Navigation Dot
                const id = entry.target.getAttribute("id");
                if (id) {
                    navLinks.forEach(link => {
                        link.classList.remove("active-dot");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active-dot");
                        }
                    });
                }
            } else {
                // TURN LIGHTS OFF (Flashlight Effect)
                entry.target.classList.remove("active");
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    
    // SAFETY: Force Hero to be active immediately
    const hero = document.getElementById("hero");
    if (hero) setTimeout(() => hero.classList.add("active"), 100);


    // 3. COPY EMAIL FUNCTIONALITY
    const copyBtn = document.getElementById("copy-btn");
    const emailText = document.getElementById("email-text");
    if (copyBtn && emailText) {
        copyBtn.addEventListener("click", () => {
            const email = emailText.innerText;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "COPIED!";
                copyBtn.style.background = "#FFD700";
                copyBtn.style.color = "#000";
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.background = "";
                    copyBtn.style.color = "";
                }, 2000);
            });
        });
    }
});