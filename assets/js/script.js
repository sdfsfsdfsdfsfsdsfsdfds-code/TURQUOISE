/* =====================================================
   TURQUOISE — MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   LANGUAGE
===================================================== */

const langBtn = document.getElementById("langBtn");

let currentLang =
    localStorage.getItem("turquoise-lang") || "fa";


function applyLanguage() {

    /* Page direction */

    document.documentElement.lang = currentLang;

    document.documentElement.dir =
        currentLang === "fa"
            ? "rtl"
            : "ltr";


    /* Change all bilingual texts */

    document
        .querySelectorAll("[data-fa]")
        .forEach(element => {

            const text =
                currentLang === "fa"
                    ? element.dataset.fa
                    : element.dataset.en;


            if (text) {

                element.textContent = text;

            }

        });


    /* Language button */

    if (langBtn) {

        langBtn.textContent =
            currentLang === "fa"
                ? "EN"
                : "FA";

    }


    /* Save language */

    localStorage.setItem(
        "turquoise-lang",
        currentLang
    );

}



/* =====================================================
   LANGUAGE BUTTON
===================================================== */

if (langBtn) {

    langBtn.addEventListener(
        "click",
        () => {

            currentLang =
                currentLang === "fa"
                    ? "en"
                    : "fa";


            applyLanguage();

        }
    );

}



/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.querySelector(".nav");


if (menuBtn && nav) {

    menuBtn.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

        }
    );


    /* Close menu after clicking a link */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

            }
        );

    });

}



/* =====================================================
   ACTIVE PAGE
===================================================== */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        const linkPage =
            link.getAttribute("href");


        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold:0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}



/* =====================================================
   COLLECTION FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(
        ".category-tabs button"
    );


if (filterButtons.length) {

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {


                /* Remove active */

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                /* Activate clicked button */

                button.classList.add(
                    "active"
                );


                /* Selected category */

                const filter =
                    button.dataset.filter;


                /* Filter cards */

                document
                    .querySelectorAll(
                        ".catalog-card"
                    )
                    .forEach(card => {


                        if (
                            filter === "all" ||
                            card.dataset.type === filter
                        ) {

                            card.style.display =
                                "block";

                        } else {

                            card.style.display =
                                "none";

                        }

                    });

            }
        );

    });

}



/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formSuccess =
    document.getElementById(
        "formSuccess"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (formSuccess) {

                formSuccess.classList.add(
                    "show"
                );

            }


            contactForm.reset();


            /* Hide message after a few seconds */

            setTimeout(
                () => {

                    if (formSuccess) {

                        formSuccess.classList.remove(
                            "show"
                        );

                    }

                },
                5000
            );

        }
    );

}



/* =====================================================
   START
===================================================== */

applyLanguage();
