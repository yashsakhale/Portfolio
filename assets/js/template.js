/* ========================================================
   GEN Z SPIDER-MAN PORTFOLIO - JavaScript
   Web shooter, konami code, scroll progress,
   magnetic buttons, tilt, and more
   ======================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // --- Page Loader ---
  var loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('loaded'); }, 300);
    });
  }

  // --- Scroll Progress Bar ---
  var scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  // --- Cursor Glow (desktop only) ---
  var glow = document.querySelector('.cursor-glow');
  var isDesktop = window.matchMedia('(pointer: fine)').matches;
  if (glow && isDesktop) {
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // --- Navbar scroll ---
  var navbar = document.querySelector('.navbar-genz');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- Mobile Menu Toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Scroll Reveal ---
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  // --- Section Labels: add visible class for line animation ---
  var sectionLabels = document.querySelectorAll('.section-label');
  if (sectionLabels.length) {
    var labelObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.5 });
    sectionLabels.forEach(function (el) { labelObserver.observe(el); });
  }

  // --- Project Cards: scroll reveal + webSling class ---
  var cards = document.querySelectorAll('.project-card-genz');
  if (cards.length) {
    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    cards.forEach(function (card) { cardObserver.observe(card); });
  }

  // --- 3D Tilt on cards (desktop) ---
  if (isDesktop) {
    document.querySelectorAll('.project-card-genz, .stat-card, .doc-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -8;
        var rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        // Dynamic spotlight
        card.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(226,54,54,0.06), transparent 50%), var(--bg-card)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.background = '';
      });
    });
  }

  // --- Magnetic Buttons (desktop) ---
  if (isDesktop) {
    document.querySelectorAll('.btn-primary-genz, .btn-secondary-genz, .nav-cta').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  // --- Parallax blobs on scroll ---
  var blobs = document.querySelectorAll('.blob');
  if (blobs.length) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      blobs.forEach(function (blob, i) {
        var speed = (i + 1) * 0.03;
        blob.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    }, { passive: true });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Back to Top Button ---
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Hero Typewriter Effect ---
  var heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    var originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    var cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    heroSubtitle.appendChild(cursor);
    var charIndex = 0;
    function typeChar() {
      if (charIndex < originalText.length) {
        heroSubtitle.insertBefore(document.createTextNode(originalText[charIndex]), cursor);
        charIndex++;
        setTimeout(typeChar, 30 + Math.random() * 40);
      } else {
        setTimeout(function () { cursor.remove(); }, 2000);
      }
    }
    // Start typing after hero fade-in
    setTimeout(typeChar, 1200);
  }

  // --- Konami Code Easter Egg ---
  // Up Up Down Down Left Right Left Right B A
  var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var konamiIndex = 0;
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        document.body.classList.toggle('spidey-mode');
        var toast = document.createElement('div');
        toast.className = 'spidey-toast';
        if (document.body.classList.contains('spidey-mode')) {
          toast.textContent = 'Spider-Sense Activated!';
        } else {
          toast.textContent = 'Spider-Sense Deactivated';
        }
        document.body.appendChild(toast);
        setTimeout(function () { toast.remove(); }, 3000);
      }
    } else {
      konamiIndex = 0;
    }
  });

  // --- Section Title Glitch: set data-text attributes ---
  document.querySelectorAll('.section-title-genz .highlight').forEach(function (el) {
    el.setAttribute('data-text', el.textContent);
  });

  // --- Symbiote Mode Toggle ---
  (function () {
    // Always restore symbiote state from localStorage on every page
    if (localStorage.getItem('symbioteMode') === 'on') {
      document.body.classList.add('symbiote-mode');
    }

    // Inject symbiote toggle button into navbar if not present
    var symBtn = document.querySelector('.symbiote-toggle');
    if (!symBtn) {
      var nav = document.querySelector('.navbar-genz');
      if (nav) {
        symBtn = document.createElement('button');
        symBtn.className = 'symbiote-toggle';
        symBtn.setAttribute('aria-label', 'Toggle Symbiote Mode');
        symBtn.innerHTML = '<i class="fa-solid fa-spider"></i>';
        nav.appendChild(symBtn);
      }
    }
    if (!symBtn) return;

    symBtn.addEventListener('click', function () {
      document.body.classList.toggle('symbiote-mode');
      var isOn = document.body.classList.contains('symbiote-mode');
      localStorage.setItem('symbioteMode', isOn ? 'on' : 'off');
      // Toast
      var toast = document.createElement('div');
      toast.className = 'symbiote-toast';
      toast.textContent = isOn ? 'Symbiote Bonded!' : 'Symbiote Removed';
      document.body.appendChild(toast);
      setTimeout(function () { toast.remove(); }, 3000);
    });
  })();

  // --- Spidey Photo Mode ---
  (function () {
    var photoBtn = document.querySelector('.spidey-photo-btn');
    if (!photoBtn) return;
    photoBtn.addEventListener('click', function () {
      // Flash effect
      photoBtn.classList.add('flash');
      setTimeout(function () { photoBtn.classList.remove('flash'); }, 500);

      var flash = document.createElement('div');
      flash.className = 'photo-flash-overlay';
      document.body.appendChild(flash);
      setTimeout(function () { flash.remove(); }, 400);

      // Use html2canvas if available, otherwise fallback toast
      if (typeof html2canvas !== 'undefined') {
        html2canvas(document.body, {
          scale: 1,
          useCORS: true,
          logging: false,
          backgroundColor: '#0a0e27'
        }).then(function (canvas) {
          showPhotoPreview(canvas.toDataURL('image/png'));
        });
      } else {
        // Dynamic load html2canvas
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = function () {
          html2canvas(document.body, {
            scale: 1,
            useCORS: true,
            logging: false,
            backgroundColor: '#0a0e27'
          }).then(function (canvas) {
            showPhotoPreview(canvas.toDataURL('image/png'));
          });
        };
        document.head.appendChild(script);
      }
    });

    function showPhotoPreview(dataUrl) {
      // Create preview frame
      var frame = document.createElement('div');
      frame.className = 'photo-frame-preview';
      var img = document.createElement('img');
      img.src = dataUrl;
      img.alt = 'Screenshot';
      frame.appendChild(img);
      var label = document.createElement('div');
      label.className = 'photo-frame-label';
      label.textContent = 'PARKER PHOTO - CLICK TO SAVE';
      frame.appendChild(label);
      document.body.appendChild(frame);

      // Click to download
      frame.addEventListener('click', function () {
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'spidey-portfolio-' + Date.now() + '.png';
        a.click();
        frame.style.animation = 'none';
        frame.style.opacity = '0';
        frame.style.transform = 'translate(-50%, -50%) scale(0.5)';
        frame.style.transition = 'all 0.3s ease';
        setTimeout(function () { frame.remove(); }, 300);
      });

      // Auto-dismiss after 5s
      setTimeout(function () {
        if (frame.parentNode) {
          frame.style.opacity = '0';
          frame.style.transform = 'translate(-50%, -50%) scale(0.5)';
          frame.style.transition = 'all 0.3s ease';
          setTimeout(function () { frame.remove(); }, 300);
        }
      }, 5000);
    }
  })();

  // --- Web-Swing Page Transitions ---
  (function () {
    // Create the transition overlay
    var overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    var spider = document.createElement('div');
    spider.className = 'swing-spider';
    spider.innerHTML = '<i class="fa-solid fa-spider"></i>';
    overlay.appendChild(spider);
    document.body.appendChild(overlay);

    // Intercept project card clicks (and any internal .card-link)
    document.querySelectorAll('.project-card-genz .card-link, .doc-card a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http')) return;
        e.preventDefault();
        overlay.classList.add('swinging');
        setTimeout(function () {
          window.location.href = href;
        }, 600);
      });
    });
  })();

  // --- Comic Panel Layout: inject SFX text into project cards ---
  (function () {
    var sfxPool = [
      ['THWIP!', 'thwip'], ['POW!', 'pow'], ['ZAP!', 'zap'],
      ['THWACK!', 'thwip'], ['BANG!', 'pow'], ['WHAM!', 'zap'],
      ['SNAP!', 'thwip'], ['CRACK!', 'pow']
    ];

    // Safe zones that avoid icon (top-left), text (center-left), arrow (bottom-left)
    // Each zone: { top: [min, max], left: [min, max] } in %
    var safeZones = [
      { top: [2, 14], left: [65, 88] },   // A: top-right
      { top: [72, 90], left: [60, 88] },   // B: bottom-right
      { top: [35, 58], left: [72, 90] },   // C: mid-right edge
      { top: [2, 14], left: [35, 60] }     // D: top-center (right of icon)
    ];

    function randInZone(zone) {
      var t = zone.top[0] + Math.random() * (zone.top[1] - zone.top[0]);
      var l = zone.left[0] + Math.random() * (zone.left[1] - zone.left[0]);
      return { top: t, left: l };
    }

    // Shuffle helper
    function shuffle(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
      }
      return a;
    }

    document.querySelectorAll('.project-card-genz').forEach(function (card, i) {
      var sfx1 = sfxPool[i % sfxPool.length];
      var sfx2 = sfxPool[(i + 3) % sfxPool.length];

      // Pick 2 different safe zones randomly
      var picked = shuffle([0, 1, 2, 3]);
      var pos1 = randInZone(safeZones[picked[0]]);
      var pos2 = randInZone(safeZones[picked[1]]);

      var rot1 = -15 + Math.random() * 30;
      var rot2 = -15 + Math.random() * 30;

      var el1 = document.createElement('span');
      el1.className = 'comic-sfx comic-sfx-' + sfx1[1];
      el1.textContent = sfx1[0];
      el1.style.top = pos1.top + '%';
      el1.style.left = pos1.left + '%';
      el1.style.setProperty('--sfx-rot', rot1 + 'deg');
      card.appendChild(el1);

      var el2 = document.createElement('span');
      el2.className = 'comic-sfx comic-sfx-' + sfx2[1];
      el2.textContent = sfx2[0];
      el2.style.top = pos2.top + '%';
      el2.style.left = pos2.left + '%';
      el2.style.setProperty('--sfx-rot', rot2 + 'deg');
      card.appendChild(el2);
    });
  })();

  // --- Web-Net Cursor: Realistic Spider Web (desktop only) ---
  if (isDesktop) {
    (function () {
      var canvas = document.createElement('canvas');
      canvas.className = 'web-net-canvas';
      document.body.appendChild(canvas);
      var ctx = canvas.getContext('2d');

      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      var anchors = [];
      var maxAnchors = 8;
      var anchorLife = 5000;
      var lastX = 0, lastY = 0;
      var pauseTimer = null;
      var trail = [];
      var maxTrail = 60;
      var gravity = 0.15; // silk sag factor

      document.addEventListener('mousemove', function (e) {
        lastX = e.clientX;
        lastY = e.clientY;
        trail.push({ x: e.clientX, y: e.clientY, t: Date.now() });
        if (trail.length > maxTrail) trail.shift();
      });

      // Place anchor web on click
      document.addEventListener('click', function (e) {
        anchors.push({
          x: e.clientX, y: e.clientY, born: Date.now(),
          spokes: 6 + Math.floor(Math.random() * 6),
          rings: 3 + Math.floor(Math.random() * 3),
          maxR: 35 + Math.random() * 30,
          rotation: Math.random() * Math.PI * 2,
          growStart: Date.now()
        });
        if (anchors.length > maxAnchors) anchors.shift();
      });

      // Catenary/sag curve between two points
      function drawSagLine(x1, y1, x2, y2, sagAmount) {
        var midX = (x1 + x2) / 2;
        var midY = (y1 + y2) / 2 + sagAmount;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midX, midY, x2, y2);
        ctx.stroke();
      }

      function drawWeb() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var now = Date.now();
        var isSymbiote = document.body.classList.contains('symbiote-mode');

        // Symbiote color palette
        var silkColor = isSymbiote ? '156, 39, 176' : '255, 255, 255';
        var silkMainAlpha = isSymbiote ? 0.5 : 0.35;
        var silkSideAlpha = isSymbiote ? 0.2 : 0.12;
        var glowColor1 = isSymbiote ? 'rgba(171, 71, 188, 0.45)' : 'rgba(255, 255, 255, 0.35)';
        var glowColor2 = isSymbiote ? 'rgba(123, 31, 162, 0.15)' : 'rgba(226, 54, 54, 0.08)';
        var glowColor3 = isSymbiote ? 'rgba(156, 39, 176, 0)' : 'rgba(255, 255, 255, 0)';
        var dropColor = isSymbiote ? '171, 71, 188' : '255, 255, 255';
        var coreColor = isSymbiote ? 'rgba(206, 147, 216, 0.6)' : 'rgba(255, 255, 255, 0.5)';
        var webColor = isSymbiote ? '123, 31, 162' : '255, 255, 255';

        // Cleanup
        while (anchors.length && now - anchors[0].born > anchorLife) anchors.shift();
        while (trail.length && now - trail[0].t > 4000) trail.shift();

        // --- 1) Realistic silk thread trail ---
        if (trail.length > 3) {
          // Helper: offset a point perpendicular to the direction
          function perpOffset(p1, p2, offset) {
            var ddx = p2.x - p1.x;
            var ddy = p2.y - p1.y;
            var len = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
            return { x: -ddy / len * offset, y: ddx / len * offset };
          }

          // Draw 3 parallel silk strands (main + 2 side fibers)
          var strandOffsets = [0, -2.5, 2.5];
          for (var si = 0; si < strandOffsets.length; si++) {
            var off = strandOffsets[si];
            var isMain = si === 0;

            ctx.beginPath();
            var started = false;
            for (var t = 1; t < trail.length; t++) {
              var prev = trail[t - 1];
              var cur = trail[t];
              var segAge = 1 - (now - cur.t) / 4000;
              if (segAge <= 0) continue;

              var timeSince = (now - cur.t) / 1000;
              // Gravity sag increases over time
              var sag = timeSince * timeSince * 6 * gravity;
              var dx = cur.x - prev.x;
              var dy = cur.y - prev.y;
              var segLen = Math.sqrt(dx * dx + dy * dy);
              sag += segLen * 0.04;

              // Perpendicular offset for side strands
              var perp = perpOffset(prev, cur, off);
              // Side strands wobble slightly more
              var wobble = isMain ? 0 : Math.sin(t * 1.7 + si * 3) * 1.5;

              var px = cur.x + perp.x + wobble;
              var py = cur.y + perp.y + sag + wobble * 0.5;

              if (!started) {
                ctx.moveTo(prev.x + perp.x, prev.y + perp.y);
                started = true;
              }
              // Smooth curve
              var prevPx = prev.x + perp.x;
              var prevPy = prev.y + perp.y + (timeSince > 0.1 ? (timeSince - 0.1) * (timeSince - 0.1) * 6 * gravity : 0);
              var midX = (prevPx + px) / 2;
              var midY = (prevPy + py) / 2 + sag * 0.3;
              ctx.quadraticCurveTo(prevPx, prevPy, midX, midY);
            }
            var lastSeg = trail[trail.length - 1];
            var lastAge = 1 - (now - lastSeg.t) / 4000;
            ctx.strokeStyle = 'rgba(' + silkColor + ', ' + (lastAge * (isMain ? silkMainAlpha : silkSideAlpha)) + ')';
            ctx.lineWidth = isMain ? 1.4 : 0.5;
            ctx.stroke();
          }

          // --- Silk glue droplets along the main strand ---
          for (var d = 2; d < trail.length; d += 3) {
            var dp = trail[d];
            var dpAge = 1 - (now - dp.t) / 4000;
            if (dpAge <= 0) continue;
            var dropTimeSince = (now - dp.t) / 1000;
            var dropSag = dropTimeSince * dropTimeSince * 6 * gravity;
            // Tiny glistening droplet
            var dropSize = 1.2 + Math.sin(now * 0.005 + d) * 0.4; // shimmer
            ctx.beginPath();
            ctx.arc(dp.x, dp.y + dropSag, dropSize, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + dropColor + ', ' + (dpAge * 0.3) + ')';
            ctx.fill();
            // Tiny highlight (glisten)
            ctx.beginPath();
            ctx.arc(dp.x - 0.5, dp.y + dropSag - 0.5, dropSize * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + dropColor + ', ' + (dpAge * 0.5) + ')';
            ctx.fill();
          }

          // --- Spinnerette glow at cursor tip ---
          var tip = trail[trail.length - 1];
          // Soft silk emission glow
          var grad = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 8);
          grad.addColorStop(0, glowColor1);
          grad.addColorStop(0.5, glowColor2);
          grad.addColorStop(1, glowColor3);
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          // Core dot
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = coreColor;
          ctx.fill();
        }

        // --- 2) Anchor webs (grow in, then fade) ---
        for (var i = 0; i < anchors.length; i++) {
          var a = anchors[i];
          var age = 1 - (now - a.born) / anchorLife;
          if (age <= 0) continue;

          // Grow-in animation (0-400ms)
          var growTime = now - a.growStart;
          var growProg = Math.min(growTime / 400, 1);
          growProg = 1 - Math.pow(1 - growProg, 3); // ease-out

          var alpha = age * 0.35;
          var currentR = a.maxR * growProg;

          // Draw radial spokes
          for (var s = 0; s < a.spokes; s++) {
            var angle = a.rotation + (s / a.spokes) * Math.PI * 2;
            // Slight irregularity per spoke
            var spokeLen = currentR * (0.85 + Math.sin(s * 2.7) * 0.15);
            var ex = a.x + Math.cos(angle) * spokeLen;
            var ey = a.y + Math.sin(angle) * spokeLen;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(ex, ey);
            ctx.strokeStyle = 'rgba(' + webColor + ', ' + alpha + ')';
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }

          // Draw spiral rings with sticky sag between spokes
          for (var r = 1; r <= a.rings; r++) {
            var ringR = (r / a.rings) * currentR;
            // Each ring segment sags slightly between spokes
            for (var s2 = 0; s2 < a.spokes; s2++) {
              var ang1 = a.rotation + (s2 / a.spokes) * Math.PI * 2;
              var ang2 = a.rotation + ((s2 + 1) / a.spokes) * Math.PI * 2;
              // Wobble per ring
              var w1 = ringR + Math.sin(ang1 * 3 + r * 1.5) * 3;
              var w2 = ringR + Math.sin(ang2 * 3 + r * 1.5) * 3;
              var px1 = a.x + Math.cos(ang1) * w1;
              var py1 = a.y + Math.sin(ang1) * w1;
              var px2 = a.x + Math.cos(ang2) * w2;
              var py2 = a.y + Math.sin(ang2) * w2;

              // Sag the ring segment downward (gravity)
              var sagAmt = ringR * 0.08 + r * 1.5;
              ctx.strokeStyle = 'rgba(' + webColor + ', ' + (alpha * 0.6) + ')';
              ctx.lineWidth = 0.7;
              drawSagLine(px1, py1, px2, py2, sagAmt);
            }
          }

          // Center junction dot (sticky silk blob)
          ctx.beginPath();
          ctx.arc(a.x, a.y, 2.5 * growProg, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + webColor + ', ' + (alpha * 0.6) + ')';
          ctx.fill();

          // Outer dots at spoke tips
          for (var s3 = 0; s3 < a.spokes; s3++) {
            var tipAngle = a.rotation + (s3 / a.spokes) * Math.PI * 2;
            var tipLen = currentR * (0.85 + Math.sin(s3 * 2.7) * 0.15);
            var tx = a.x + Math.cos(tipAngle) * tipLen;
            var ty = a.y + Math.sin(tipAngle) * tipLen;
            ctx.beginPath();
            ctx.arc(tx, ty, 1.5 * growProg, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + webColor + ', ' + (alpha * 0.4) + ')';
            ctx.fill();
          }

          // --- 3) Connect nearby anchors with drooping silk strands ---
          for (var j = i + 1; j < anchors.length; j++) {
            var b = anchors[j];
            var ageB = 1 - (now - b.born) / anchorLife;
            if (ageB <= 0) continue;
            var cdx = a.x - b.x;
            var cdy = a.y - b.y;
            var dist = Math.sqrt(cdx * cdx + cdy * cdy);
            if (dist < 350) {
              var connAlpha = Math.min(age, ageB) * (1 - dist / 350) * 0.25;
              // Heavy sag on longer connections
              var connSag = dist * 0.12 + 10;

              // Main strand
              ctx.strokeStyle = 'rgba(' + webColor + ', ' + connAlpha + ')';
              ctx.lineWidth = 1.0;
              drawSagLine(a.x, a.y, b.x, b.y, connSag);

              // Secondary thinner strand (slightly different sag)
              ctx.strokeStyle = 'rgba(' + webColor + ', ' + (connAlpha * 0.4) + ')';
              ctx.lineWidth = 0.5;
              drawSagLine(a.x, a.y, b.x, b.y, connSag * 0.6);
            }
          }
        }

        requestAnimationFrame(drawWeb);
      }
      requestAnimationFrame(drawWeb);
    })();
  }

  // --- Web Zip Scroll (Shift+Click to zip) ---
  if (isDesktop) {
    (function () {
      var zipCanvas = document.querySelector('.web-zip-canvas');
      if (!zipCanvas) {
        zipCanvas = document.createElement('canvas');
        zipCanvas.className = 'web-zip-canvas';
        document.body.appendChild(zipCanvas);
      }
      var zCtx = zipCanvas.getContext('2d');

      function resizeZip() {
        zipCanvas.width = window.innerWidth;
        zipCanvas.height = window.innerHeight;
      }
      resizeZip();
      window.addEventListener('resize', resizeZip);

      // Hint tooltip - always visible
      var hint = document.createElement('div');
      hint.className = 'web-zip-hint visible';
      hint.innerHTML = '<kbd>Shift</kbd> + <kbd>Click</kbd> to web-zip';
      document.body.appendChild(hint);

      var zipAnim = null;

      document.addEventListener('click', function (e) {
        if (!e.shiftKey) return;
        e.preventDefault();

        var startX = window.innerWidth / 2;
        var startY = 20; // top of viewport (web anchor point)
        var endX = e.clientX;
        var endY = e.clientY;

        // Scroll to clicked position
        var targetScrollY = window.scrollY + endY - window.innerHeight / 2;
        targetScrollY = Math.max(0, Math.min(targetScrollY, document.documentElement.scrollHeight - window.innerHeight));

        // Animate web line
        var startTime = Date.now();
        var duration = 400;

        if (zipAnim) cancelAnimationFrame(zipAnim);

        function animateZip() {
          var elapsed = Date.now() - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

          zCtx.clearRect(0, 0, zipCanvas.width, zipCanvas.height);

          // Draw web line from top-center to click point
          var curX = startX + (endX - startX) * eased;
          var curY = startY + (endY - startY) * eased;

          // Main web line
          zCtx.beginPath();
          zCtx.moveTo(startX, startY);
          // Slight curve via quadratic bezier
          var cpX = (startX + curX) / 2 - 30;
          var cpY = (startY + curY) / 2;
          zCtx.quadraticCurveTo(cpX, cpY, curX, curY);
          zCtx.strokeStyle = 'rgba(255, 255, 255, ' + (0.6 * (1 - progress * 0.5)) + ')';
          zCtx.lineWidth = 2 - progress;
          zCtx.stroke();

          // Red glow line
          zCtx.beginPath();
          zCtx.moveTo(startX, startY);
          zCtx.quadraticCurveTo(cpX, cpY, curX, curY);
          zCtx.strokeStyle = 'rgba(226, 54, 54, ' + (0.3 * (1 - progress * 0.8)) + ')';
          zCtx.lineWidth = 4 - progress * 2;
          zCtx.stroke();

          // Impact dot at end
          if (progress > 0.5) {
            var dotAlpha = (1 - progress) * 2;
            var dotR = 4 + progress * 8;
            zCtx.beginPath();
            zCtx.arc(endX, endY, dotR, 0, Math.PI * 2);
            zCtx.fillStyle = 'rgba(226, 54, 54, ' + (dotAlpha * 0.4) + ')';
            zCtx.fill();
          }

          if (progress < 1) {
            zipAnim = requestAnimationFrame(animateZip);
          } else {
            // Fade out
            setTimeout(function () {
              zCtx.clearRect(0, 0, zipCanvas.width, zipCanvas.height);
            }, 200);
          }
        }
        animateZip();

        // Smooth scroll to target
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      });
    })();
  }

  // --- Comic Speech Bubble Tooltips ---
  (function () {
    var tooltip = document.createElement('div');
    tooltip.className = 'comic-tooltip';
    document.body.appendChild(tooltip);

    // Elements that should get comic tooltips
    var targets = document.querySelectorAll('[title]');
    targets.forEach(function (el) {
      var text = el.getAttribute('title');
      el.removeAttribute('title'); // prevent default tooltip
      el.setAttribute('data-comic-tip', text);

      el.addEventListener('mouseenter', function (e) {
        tooltip.textContent = text;
        tooltip.classList.add('visible');
        positionTooltip(e);
      });
      el.addEventListener('mousemove', positionTooltip);
      el.addEventListener('mouseleave', function () {
        tooltip.classList.remove('visible');
      });
    });

    function positionTooltip(e) {
      var x = e.clientX - tooltip.offsetWidth / 2;
      var y = e.clientY - tooltip.offsetHeight - 18;
      // Keep within viewport
      x = Math.max(8, Math.min(x, window.innerWidth - tooltip.offsetWidth - 8));
      y = Math.max(8, y);
      tooltip.style.position = 'fixed';
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }
  })();

  // --- Newspaper Fold Ticker ---
  (function () {
    var tickers = document.querySelectorAll('.bugle-ticker');
    if (!tickers.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('folded');
          entry.target.classList.add('unfolding');
        } else {
          entry.target.classList.remove('unfolding');
          entry.target.classList.add('folded');
        }
      });
    }, { threshold: 0.1 });

    tickers.forEach(function (t) {
      t.classList.add('folded');
      observer.observe(t);
    });
  })();


  // --- Achievement Badges ---
  (function () {
    var achievements = {
      explorer: { icon: 'fa-solid fa-compass', title: 'Explorer!', desc: 'Scrolled through all sections', threshold: 0.85 },
      curious: { icon: 'fa-solid fa-magnifying-glass', title: 'Curious Mind!', desc: 'Clicked on 3 projects', clickCount: 3 },
      symbiote: { icon: 'fa-solid fa-spider', title: 'Bonded!', desc: 'Activated Symbiote Mode' },
      speedster: { icon: 'fa-solid fa-bolt', title: 'Speed Reader!', desc: 'Scrolled to bottom in under 15s' }
    };

    var unlocked = JSON.parse(localStorage.getItem('spideyBadges') || '{}');
    var queue = [];
    var showing = false;
    var projectClicks = parseInt(localStorage.getItem('projectClickCount') || '0', 10);
    var loadTime = Date.now();

    function showBadge(key) {
      if (unlocked[key]) return;
      unlocked[key] = true;
      localStorage.setItem('spideyBadges', JSON.stringify(unlocked));
      queue.push(key);
      processQueue();
    }

    function processQueue() {
      if (showing || !queue.length) return;
      showing = true;
      var key = queue.shift();
      var a = achievements[key];

      var badge = document.createElement('div');
      badge.className = 'achievement-badge';
      badge.innerHTML = '<div class="badge-icon"><i class="' + a.icon + '"></i></div>' +
        '<div class="badge-text"><span class="badge-title">' + a.title + '</span>' +
        '<span class="badge-desc">' + a.desc + '</span></div>';
      document.body.appendChild(badge);

      // Trigger animation
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { badge.classList.add('show'); });
      });

      setTimeout(function () {
        badge.classList.remove('show');
        setTimeout(function () {
          badge.remove();
          showing = false;
          processQueue();
        }, 600);
      }, 3500);
    }

    // Explorer: scrolled 85% of page
    window.addEventListener('scroll', function () {
      var scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPct > achievements.explorer.threshold) {
        showBadge('explorer');
      }
      // Speedster: reached bottom in under 15s
      if (scrollPct > 0.95 && (Date.now() - loadTime) < 15000) {
        showBadge('speedster');
      }
    });

    // Curious: clicked 3 project cards
    document.querySelectorAll('.project-card-genz .card-link').forEach(function (link) {
      link.addEventListener('click', function () {
        projectClicks++;
        localStorage.setItem('projectClickCount', projectClicks);
        if (projectClicks >= achievements.curious.clickCount) {
          showBadge('curious');
        }
      });
    });

    // Symbiote: toggling symbiote mode
    var symBtn = document.querySelector('.symbiote-toggle');
    if (symBtn) {
      symBtn.addEventListener('click', function () {
        if (document.body.classList.contains('symbiote-mode')) {
          showBadge('symbiote');
        }
      });
    }
  })();

  // --- Page Heartbeat Border ---
  (function () {
    var hb = document.createElement('div');
    hb.className = 'page-heartbeat';
    document.body.appendChild(hb);

    var scrollTimer = null;
    window.addEventListener('scroll', function () {
      hb.classList.add('intensified');
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        hb.classList.remove('intensified');
      }, 600);
    });
  })();

  // --- Spidey Quote Rotator ---
  (function () {
    var quotes = [
      "With great power comes great responsibility.",
      "Anyone can wear the mask.",
      "It\u2019s not about the mask. It\u2019s about what you do when you wear it.",
      "The real crime would be not to finish what we started.",
      "No matter how buried it gets, the truth finds a way.",
      "Intelligence is not a privilege, it\u2019s a gift.",
      "When you help someone, you help everyone.",
      "I\u2019m just your friendly neighborhood Spider-Man.",
      "The best way to predict the future is to build it.",
      "Not everyone gets a second chance. Make it count."
    ];
    var footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
      var quoteEl = document.createElement('p');
      quoteEl.className = 'spidey-quote';
      quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
      footerBottom.appendChild(quoteEl);
    }
  })();

  // --- Scroll Depth Web-Shooter Milestones ---
  (function () {
    var milestones = [
      { pct: 25, label: '25%' },
      { pct: 50, label: 'HALFWAY!' },
      { pct: 75, label: '75%' },
      { pct: 100, label: 'THWIP! 100%' }
    ];
    var fired = {};

    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      milestones.forEach(function (m) {
        if (scrollPct >= m.pct && !fired[m.pct]) {
          fired[m.pct] = true;
          shootWebStrand(m);
        }
      });
    }, { passive: true });

    function shootWebStrand(m) {
      var progressBar = document.querySelector('.scroll-progress');
      if (!progressBar) return;

      var barWidth = progressBar.offsetWidth;
      var xPos = barWidth; // shoot from the tip of the progress bar

      var container = document.createElement('div');
      container.className = 'web-milestone';
      container.style.left = xPos + 'px';

      // Web strand
      var strand = document.createElement('div');
      strand.className = 'web-strand-shoot';
      container.appendChild(strand);

      // Milestone badge
      var badge = document.createElement('div');
      badge.className = 'web-milestone-badge';
      badge.textContent = m.label;
      container.appendChild(badge);

      document.body.appendChild(container);

      // Clean up after animation
      setTimeout(function () { container.remove(); }, 1500);
    }
  })();

});