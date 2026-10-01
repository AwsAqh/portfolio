/* ============================================================
   BLOG UI — shared by index.html and blog.html
   ------------------------------------------------------------
   • Renders cards from BLOG_POSTS (see posts.js).
   • index.html:  <div id="blogGrid">  -> only the latest N posts
   • blog.html:   <div id="allPostsGrid"> -> every post + filters
   • The "View all" CTA (#viewAllCta) only appears once the total
     number of posts exceeds HOME_POST_LIMIT.
   ============================================================ */
(function () {
    'use strict';

    var posts  = (typeof BLOG_POSTS !== 'undefined') ? BLOG_POSTS : [];
    var limit  = (typeof HOME_POST_LIMIT !== 'undefined') ? HOME_POST_LIMIT : 6;
    var filters = (typeof POST_FILTERS !== 'undefined') ? POST_FILTERS : [];

    /* ---- Build one card's markup ---- */
    function cardHTML(post) {
        return '' +
            '<article class="blog-card reveal" data-tags="' + post.tags.join(' ') + '" data-post="' + post.id + '">' +
                '<div class="blog-card-inner">' +
                    '<div class="blog-meta">' +
                        '<span class="blog-date"><i class="fas fa-calendar-alt"></i> ' + post.date + '</span>' +
                        '<span class="blog-tag-pill">' + post.tag + '</span>' +
                    '</div>' +
                    '<h3>' + post.title + '</h3>' +
                    '<p>' + post.excerpt + '</p>' +
                    '<div class="blog-read-more">Read more <i class="fas fa-arrow-right"></i></div>' +
                '</div>' +
            '</article>';
    }

    function renderInto(container, list) {
        container.innerHTML = list.map(cardHTML).join('');
    }

    /* ---- Reveal freshly-rendered cards ---- */
    function revealNew() {
        if (typeof window.reveal === 'function') {
            window.reveal();
            return;
        }
        document.querySelectorAll('.blog-card.reveal').forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight - 90) {
                el.classList.add('active');
            }
        });
    }

    /* ---- Modal ---- */
    var overlay = document.getElementById('blogOverlay');

    function openPost(id) {
        var post = posts.filter(function (p) { return String(p.id) === String(id); })[0];
        if (!post || !overlay) return;
        document.getElementById('blogModalMeta').innerHTML =
            '<span class="blog-date"><i class="fas fa-calendar-alt"></i> ' + post.date + '</span>' +
            '<span class="blog-tag-pill">' + post.tag + '</span>';
        document.getElementById('blogModalTitle').textContent = post.title;
        document.getElementById('blogModalBody').innerHTML = post.body;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closePost() {
        if (!overlay) return;
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Keep the global names so inline handlers / older markup keep working
    window.openPost = openPost;
    window.closePost = closePost;

    if (overlay) {
        var closeBtn = document.getElementById('blogModalClose');
        if (closeBtn) closeBtn.addEventListener('click', closePost);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) closePost(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePost(); });
    }

    /* ---- Tag filters (blog.html) ---- */
    function wireFilters() {
        var buttons = document.querySelectorAll('.blog-filter');
        if (!buttons.length) return;
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.blog-filter').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                var filter = btn.dataset.filter;
                document.querySelectorAll('.blog-card').forEach(function (card) {
                    var tags = (card.dataset.tags || '').split(' ');
                    card.style.display = (filter === 'all' || tags.indexOf(filter) !== -1) ? '' : 'none';
                });
            });
        });
    }

    /* ---- Card clicks via delegation (works for dynamic cards) ---- */
    document.addEventListener('click', function (e) {
        var card = e.target.closest ? e.target.closest('.blog-card') : null;
        if (card) openPost(card.dataset.post);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var el = document.activeElement;
        var card = (el && el.closest) ? el.closest('.blog-card') : null;
        if (card) { e.preventDefault(); openPost(card.dataset.post); }
    });

    /* ---- Render whichever grids this page has ---- */
    var homeGrid = document.getElementById('blogGrid');      // index.html
    var allGrid  = document.getElementById('allPostsGrid');  // blog.html

    if (homeGrid) {
        renderInto(homeGrid, posts.slice(0, limit));
        var cta = document.getElementById('viewAllCta');
        if (cta) cta.style.display = posts.length > limit ? '' : 'none';
    }

    if (allGrid) {
        var filterBox = document.getElementById('blogFilters');
        if (filterBox && filters.length) {
            filterBox.innerHTML = filters.map(function (f, i) {
                return '<button type="button" class="blog-filter' + (i === 0 ? ' active' : '') +
                    '" data-filter="' + f.value + '">' + f.label + '</button>';
            }).join('');
        }
        renderInto(allGrid, posts);
    }

    // Make every rendered card keyboard-focusable
    document.querySelectorAll('.blog-card').forEach(function (card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });

    wireFilters();
    revealNew();
})();
