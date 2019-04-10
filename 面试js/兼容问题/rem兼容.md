```js

    /*REM 布局*/
    var maxWidth = 550;
    var isMobile = /Android|webOS|iPhone|iPod|ipad|BlackBerry/i.test(navigator.userAgent);

    !function (e, t) {
      function n() {
        t.body ? t.body.style.fontSize = 12 * o + "px" : t.addEventListener("DOMContentLoaded", n)
      }

      function d() {
        if (isMobile) {
          maxWidth = document.documentElement.clientWidth
        }
        i.style.fontSize = maxWidth / 10 + "px";
        if (maxWidth < i.clientWidth && !isMobile) {
          document.querySelector('html').style.width = maxWidth + 'px';
          document.querySelector('html').classList.add('pc');
        } else {
          document.querySelector('html').style.width = '100%';
          document.querySelector('html').classList.remove('pc');
        }
      }

      var i = t.documentElement, o = e.devicePixelRatio || 1;
      if (n(), d(), e.addEventListener("resize", d), e.addEventListener("pageshow", function (e) {
          e.persisted && d()
        }), o >= 2) {
        var a = t.createElement("body"), s = t.createElement("div");
        s.style.border = ".5px solid transparent", a.appendChild(s), i.appendChild(a), 1 === s.offsetHeight && i.classList.add("hairlines"), i.removeChild(a)
      }
    }(window, document);

```