document.addEventListener('DOMContentLoaded', function () {
    
    const contentTitle = document.getElementById('content-title');
    const contentDisplayArea = document.getElementById('content-display-area');

    if (!contentTitle) return;

    const contentLinks = document.querySelectorAll('.content-link');
    contentLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const newTitle = link.textContent;
            contentTitle.textContent = newTitle;
            contentDisplayArea.innerHTML = ''; 

            if (link.dataset.iframeSrc) {
                const iframe = document.createElement('iframe');
                iframe.src = link.dataset.iframeSrc;
                iframe.title = newTitle;
                iframe.frameborder = '0';
                iframe.allowfullscreen = true;
                contentDisplayArea.appendChild(iframe);
            
            } else if (link.dataset.pdfSrc) {
                const iframe = document.createElement('iframe');
                iframe.src = `../pdfjs/web/viewer.html?file=${encodeURIComponent(link.dataset.pdfSrc)}`;
                iframe.title = newTitle;
                contentDisplayArea.appendChild(iframe);
            }
        });
    });

    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const parentNavItem = tab.parentElement;
            const subMenu = parentNavItem.querySelector('.sub-menu');
            if(!subMenu) return;
            
            const isExpanded = tab.getAttribute('aria-expanded') === 'true';
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
    if(mobileNavToggle) {
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
    }
});