document.addEventListener('DOMContentLoaded', function () {
    
    const contentTitle = document.getElementById('content-title');
    const contentDisplayArea = document.getElementById('content-display-area');

    // --- Main Routing and Content Loading Function ---
    function loadContent(linkElement) {
        if (!linkElement) return; // Exit if the link doesn't exist

        const newTitle = linkElement.textContent;
        contentTitle.textContent = newTitle;
        contentDisplayArea.innerHTML = ''; // Clear the display area

        // Logic for iframe-based dashboards
        if (linkElement.dataset.iframeSrc) {
            const iframe = document.createElement('iframe');
            iframe.src = linkElement.dataset.iframeSrc;
            iframe.title = newTitle;
            iframe.frameborder = '0';
            iframe.allowfullscreen = true;
            contentDisplayArea.appendChild(iframe);
        }
        // Logic for PDF-based dashboards
        else if (linkElement.dataset.pdfSrc) {
            const iframe = document.createElement('iframe');
            iframe.src = `pdfjs/web/viewer.html?file=${encodeURIComponent(linkElement.dataset.pdfSrc)}`;
            iframe.title = newTitle;
            contentDisplayArea.appendChild(iframe);
        }

        // Open the parent accordion tab if it's closed
        const parentNavItem = linkElement.closest('.nav-item');
        if (parentNavItem) {
            const mainTab = parentNavItem.querySelector('.main-tab');
            if (mainTab.getAttribute('aria-expanded') === 'false') {
                mainTab.click();
            }
        }
    }


    // --- Event Listener for Clicks ---
    const contentLinks = document.querySelectorAll('.content-link');
    contentLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // We don't prevent default anymore, so the hash changes
            loadContent(link);
        });
    });


    // --- NEW: Handle Page Load and URL Routing ---
    function handleRoute() {
        // Get the "hash" from the URL (e.g., #service-mapping)
        const hash = window.location.hash;

        if (hash) {
            // Find the link that corresponds to the hash
            const linkToLoad = document.querySelector(`a[href="${hash}"]`);
            if (linkToLoad) {
                // If the link is found, load its content
                loadContent(linkToLoad);
            }
        }
    }

    // Call the routing function when the page first loads
    handleRoute();

    // Also handle routing when the user clicks the browser's back/forward buttons
    window.addEventListener('hashchange', handleRoute);


    // --- Accordion Menu & Mobile Toggle Logic (Unchanged) ---
    // (The rest of your existing JavaScript for the accordion and mobile menu goes here)
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const parentNavItem = tab.parentElement;
            const subMenu = parentNavItem.querySelector('.sub-menu');
            const isExpanded = tab.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('.nav-item').forEach(item => {
                if (item !== parentNavItem) {
                    item.querySelector('.main-tab').classList.remove('active');
                    item.querySelector('.main-tab').setAttribute('aria-expanded', 'false');
                    const otherSubMenu = item.querySelector('.sub-menu');
                    if (otherSubMenu) { otherSubMenu.style.maxHeight = null; }
                }
            });
            if (isExpanded) {
                tab.classList.remove('active');
                tab.setAttribute('aria-expanded', 'false');
                subMenu.style.maxHeight = null;
            } else {
                tab.classList.add('active');
                tab.setAttribute('aria-expanded', 'true');
                subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
            }
        });
    });
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    mobileNavToggle.addEventListener('click', () => {
        const isVisible = sidebar.getAttribute('data-visible');
        if (isVisible === "true") {
            sidebar.setAttribute('data-visible', false);
            mobileNavToggle.setAttribute('aria-expanded', false);
        } else {
            sidebar.setAttribute('data-visible', true);
            mobileNavToggle.setAttribute('aria-expanded', true);
        }
    });
});