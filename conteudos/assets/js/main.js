function iterativeSVG(file, element, callback) {
    if (SVG) {
      SVG.on(document, 'DOMContentLoaded', function () {
        var draw = SVG(element)
        //let id =draw.id();
        fetch(file).then(function (response) {
            if (response.ok) {
              response.text().then(function (mytext) {
                //console.log(mytext);
                draw.svg(mytext, true);
                //draw.id(id);
  
                if (callback)
                  callback();
  
              });
            } else {
              console.log('Network response was not ok.');
            }
          })
          .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          });
      })
    }
  }
if(SVG){
(function () {
    var wiStyle = `
:host{
    }
.target { 
    background: transparent;
    background: #0f82f2;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    line-height: 28px;
    margin: -3px 2px;
    padding: 0px;
    position: relative;
    text-align: center;
    transition: border-radius .2s,background .2s,color .2s,margin .2s,padding .2s,width .2s,min-width .2s,box-shadow .2s;
}
.target::before {
        background: none;
        bottom: 1px;
        content: " ";
        height: 3px;
        left: 5px;
        position: absolute;
        right: 5px; }
input {   
    background: none !important;
    color: #fff;
    margin: 0;
    min-width: 60px;
    text-align: center;
    width: 40px;            
    cursor: text;
    display: inline-block;
    border: none;
    padding: 0;
    font-family:inherit;
    font-size:inherit;
    font-weight:inherit; }
input::placeholder {
    color: #fff; }
*:focus {
    outline: none !important; 
}
.target.invalid:before {
    background:#cd0e66;
    border-radius:5px 0 0 5px;
    bottom:0;
    color:#fff;
    content:"×";
    display:block;
    font-weight:700;
    height:auto;
    left:0;
    line-height:1;
    padding:4px 0 3px;
    position:absolute;
    text-align:center;
    top:0;
    width:20px
}    
.target.on,
.target:hover {
    box-shadow:0 0 10px rgba(0,0,0,.2)
}
.target.done {
    background:transparent;
    background-image:none;
    box-shadow:none;
    color:#0f82f2;
    cursor:default;
    display:inline;
    margin:0;
    min-width:0;
    padding:1px 0 0
   }
.target.invalid {
    padding-left:20px
}
::-moz-selection { /* Code for Firefox */
    color: blue;
    background: white;
  }
  
  ::selection {
    color: blue;
    background: white;
  }
    `;
    var wsStyle = `
    :host {
        display:inline-block;
        position:relative
    }
    button {
        background:transparent;
        display:inline-block;
        font-family:inherit;
        font-size:inherit;
        font-weight:inherit
    }
    .done {
        display:inline;
        white-space:normal
    }
    .target {
        -webkit-touch-callout:none;
        background:transparent;
        background:#0f82f2;
        border-radius:6px;
        color:#fff;
        cursor:pointer;
        display:inline-block;
        line-height:28px;
        min-width:50px;
        padding:0px
        margin:-3px 2px;
        position:relative;
        text-align:center;
        transition:border-radius .2s,background .2s,color .2s,margin .2s,padding .2s,width .2s,min-width .2s,box-shadow .2s
    }
    .target:before {
        background:none;
        bottom:1px;
        content:" ";
        height:3px;
        left:5px;
        position:absolute;
        right:5px
    }
    .on .target,
    .target:hover {
        box-shadow:0 0 10px rgba(0,0,0,.2)
    }
    .invalid .target {
        padding-left:30px
    }
    .invalid .target:before {
        background:#cd0e66;
        border-radius:5px 0 0 5px;
        bottom:0;
        color:#fff;
        content:"×";
        display:block;
        font-weight:700;
        height:auto;
        left:0;
        line-height:1;
        padding:4px 0 3px;
        position:absolute;
        text-align:center;
        top:0;
        width:20px
    }
    .done .target {
        background:transparent;
        background-image:none;
        box-shadow:none;
        color:#0f82f2;
        cursor:default;
        display:inline;
        margin:0;
        min-width:0;
        padding:1px 0 0
    }
    .done .target:hover {
        color:#0f82f2
    }
    .popup {
        background:#0e75da;
        border-radius:0 6px 6px 6px;
        box-shadow:0 0 20px rgba(0,0,0,.3);
        font-style:normal;
        left:2px;
        min-width:90px;
        opacity:0;
        pointer-events:none;
        position:absolute;
        text-align:left;
        top:100%;
        transform:scale(.5);
        transform-origin:left top;
        transition:opacity .2s,transform .2s;
        white-space:normal;
        width:-webkit-max-content;
        width:-moz-max-content;
        width:max-content
    }
    .left .popup {
        border-radius:6px 0 6px 6px;
        left:auto;
        right:2px;
        transform-origin:right top
    }
    .top .popup {
        border-radius:6px 6px 6px 0;
        bottom:100%;
        top:auto;
        transform-origin:left bottom
    }
    .left.top .popup {
        border-radius:6px 6px 0 6px;
        transform-origin:right bottom
    }
    .on .popup,
    :focus-within .popup{
        z-index:100
    }
    .on .target,
    .target:focus-within {
        border-radius:5px 5px 0 0
    }
    .on.top .target,
    .top:focus-within .target {
        border-radius:0 0 5px 5px
    }
    .on.invalid .target:before,
    .invalid:focus-within .target:before { /*  */
        border-radius:5px 0 0 0
    }
    .on.top.invalid .target:before,
    .top.invalid .target:before {
        border-radius:0 0 0 5px
    }
    .on .popup,
    :focus-within .popup {
        opacity:1;
        pointer-events:all;
        transform:none
    }
    .choice {
        box-sizing:border-box;
        color:hsla(0,0%,100%,.8);
        cursor:pointer;
        display:block;
        font-size:16px;
        line-height:22px;
        padding:6px 16px 6px 12px;
        text-align:left;
        transition:color .2s,background .2s,box-shadow .2s;
        width:100%
    }
    .choice:focus,
    .choice:hover {
        background:hsla(0,0%,100%,.2);
        color:#fff
    }
    .choice:first-child {
        border-top-right-radius:6px
    }
    .choice:last-child {
        border-radius:0 0 6px 6px
    }
    .choice:before {
        background:hsla(0,0%,100%,.5);
        content:" ";
        display:block;
        height:1px;
        left:12px;
        margin-top:-6px;
        position:absolute;
        right:16px;
        transition:background .2s
    }
    .choice:first-child:before,
    .choice:focus+.choice:before,
    .choice:focus:before,
    .choice:hover+.choice:before,
    .choice:hover:before {
        background:transparent
    }
    `;

    class winput extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();

            this.solution = "";
            this.solutionNum = NaN;
            this.solutionDisplay = "";
            this.range = 0;
            this.input = "";
            this.hint = "";
            this.attempts = 0;
            this.placeholder = "???";
            this.done = false;

            //'<label class="target"><input maxlength="15" autocomplete="off" aria-label="Fill in this blank"></label>';

            // write element functionality in here
            // Create a shadow root
            let shadow = this.attachShadow({
                mode: 'open'
            }); // sets and returns 'this.shadowRoot'

            this.innerLabel = document.createElement('label');
            //this.innerLabel.id = "base"
            this.innerLabel.classList.add('target');
            shadow.appendChild(this.innerLabel);

            /*            this.displayLabel = document.createElement('label');
                       this.displayLabel.id = "display"
                       this.displayLabel.innerHTML = "disp";
                       //this.innerLabel.classList.add('target');
                       shadow.appendChild(this.displayLabel); */

            this.innerInput = document.createElement('input');
            this.innerInput.setAttribute("maxlength", "15");
            this.innerInput.setAttribute("autocomplete", "off");
            this.innerInput.setAttribute("aria-label", "Fill in this blank");
            this.innerLabel.appendChild(this.innerInput);


            this.setAttribute("solved", "false");
            //this.syle = 'display: inline-block; position: relative;';

            // Create some CSS to apply to the shadow dom
            const style = document.createElement('style');
            style.textContent = wiStyle;

            shadow.appendChild(style);

        }

        connectedCallback() {
            this.solution = this.getAttribute("solution");
            /* if (this.solution.indexOf("\xB1") >= 0) {
              const split = this.solution.split("\xB1");
              this.solution = split[0].trim();
              this.range = +split[1];
            } */
            if (this.hasAttribute("range"))
                this.range = +this.getAttribute("range");
            this.solutionNum = +this.solution;
            this.solutionDisplay = this.solution;
            this.hint = this.getAttribute("hint");
            /*         this.removeAttribute("solution");
                    this.removeAttribute("hint"); */
            //this.innerInput.setInputPattern(this.solution);
            if (!isNaN(+this.solution)) {
                const digitsOnly = this.solution.match(/^[0-9]+$/);
                this.setAttribute("inputmode", digitsOnly ? "numeric" : "decimal");
                if (digitsOnly)
                    this.setAttribute("pattern", "[0-9]*");
            }


            if (this.hasAttribute("placeholder"))
                this.placeholder = this.getAttribute("placeholder");
            this.innerInput.setAttribute("placeholder", this.placeholder);
            this.removeAttribute("placeholder");
            this.innerInput.onchange = (value) => {
                this.input = value;
                if (this.isCorrect()) {
                    this.solve();
                    //this.trigger("valid", value);
                    this.dispatchEvent(new Event('valid', value));
                    //this.moveCursor();
                }
            };
            this.innerInput.onkeydown = (e) => {
                if (e.key == 'Enter') this.innerInput.blur()
            };
            this.innerInput.onfocus = () => {
                this.innerLabel.classList.add("on");
                this.innerLabel.classList.remove("invalid");
                this.innerInput.setAttribute("placeholder", " ");
            };
            this.innerInput.onblur = () => {
                this.innerLabel.classList.remove("on");
                if (!!this.input && !this.done)
                    this.innerLabel.classList.add("invalid");
                //this.innerLabel.className = "invalid";
                this.innerInput.setAttribute("placeholder", this.placeholder);
                if (this.input && !this.done) {
                    this.attempts += 1;
                    const hint = this.attempts >= (this.hint ? 4 : 3) ? `Hmmm\u2026 maybe try ${this.solution}?` : this.attempts >= 2 ? this.hint : void 0;
                    //this.trigger("invalid", {hint});
                    this.dispatchEvent(new Event('invalid', {
                        hint
                    }));
                }
            };

            this.dispatchEvent(new Event('ready'));
        }
        isCorrect() {
            if (this.done)
                return true;
            /*         if (this.linkedBlanks) {
                      const solved = this.linkedBlanks.map((b2) => b2.solvedBlank);
                      this.solvedBlank = this.linkedBlanks.find((b2) => {
                        if (b2.done && !b2.solvedBlank)
                          return false;
                        if (solved.includes(b2))
                          return false;
                        if (b2.checkAnswer(this.input))
                          return true;
                      });
                      if (this.solvedBlank)
                        this.solutionDisplay = this.solvedBlank.solution;
                      return !!this.solvedBlank;
                    } */
            return this.checkAnswer(this.innerInput.value);
        }
        checkAnswer(input) {
            const inputNum = +input;
            if (input.toLowerCase() === this.solution.toLowerCase())
                return true;
            if (!isNaN(this.range) && Math.abs(inputNum - this.solutionNum) <= this.range) {
                this.solutionDisplay = input;
                return true;
            }
            return false;
        }
        /*       moveCursor() {
                if (!this.$step)
                  return;
                const $next = this.$step.$blanks[this.$step.$blanks.indexOf(this) + 1];
                if (!$next || $next.done || $next.tagName === "X-BLANK-MC")
                  return;
                if ($next.css("visibility") === "hidden" || !$next.bounds.width)
                  return;
                $next.focus();
              } */
        solve() {
            this.done = true;
            this.innerInput.remove();
            this.innerLabel.innerHTML = this.solutionDisplay;
            this.innerLabel.classList.add("done");
            //this.trigger("solve", {solution: this.solutionDisplay, restore});
            this.setAttribute("solved", "true");
            this.dispatchEvent(new Event('solve', {
                bubbles: true
            }));
        }
        focus() {
            this.innerInput.focus();
        }
        blur() {
            this.innerInput.blur();
        }

        /*       setup($step, goal, userData) {
                var _a4;
                this.goal = goal;
                this.$step = $step;
                if ((_a4 = userData == null ? void 0 : userData.scores) == null ? void 0 : _a4.includes(goal))
                  this.solve(true);
                this.one("valid", () => {
                  $step.addHint("correct");
                  $step.score(this.solvedBlank ? this.solvedBlank.goal : goal);
                });
                this.on("invalid", (e) => $step.addHint(e.hint || "incorrect", {class: "incorrect"}));
              } */
    }

    customElements.define('w-i', winput);

    // W-S -----------------------------------------------------
    class wstep extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();

            this.visible = false;
            this.complete = false;
            //this.components = []


            let ihtml = this.innerHTML;
            this.innerHTML = '';
            this.base = document.createElement('div');
            this.base.style.opacity = "0";
            //this.base.style.display = "none";
            this.base.style.transition = "opacity 2s";

            this.appendChild(this.base);
            this.base.innerHTML = ihtml;

            /*  this.addEventListener("ready", (e) => {
                 e.stopPropagation();
                 //console.log(e.target.id);
                 this.components.push(e.target);
             }); */

            this.base.addEventListener("solve", (e) => {
                e.stopPropagation();
                let remaining = this.base.querySelectorAll("[solved='false']");
                if (remaining.length == 0) {
                    this.complete = true;
                    nextStep();
                }
            });

            // Create some CSS to apply to the shadow dom
            /* const style = document.createElement('style');
            style.textContent = `
            @keyframes example {
                from {opacity: 0;}
                to {opacity: 1;}
              }
            .show {
                animation-name: example;
                animation-duration: 400ms;
            }
            `;
            // Create a shadow root
            let shadow = this.attachShadow({
                mode: 'open'
            }); // sets and returns 'this.shadowRoot'
            shadow.appendChild(style); */
        }
        connectedCallback() {
            this.dispatchEvent(new Event('ready'));
        }
        reveal() {
            //this.style.visibility = "visible";
            //this.classList.add("show");
            //this.base.classList.add("show");
            this.base.style.display = "block";
            this.base.style.opacity = "1";
            //SVG(this.base).animate(2000).css('opacity','1');
            this.visible = true;
        }
    }
    customElements.define('w-s', wstep);

// W-M -----------------------------------------------------
    class wselect extends HTMLElement {
        constructor() {
            super(...arguments);

            //this.solution = "";

            this.hint = "";
            this.attempts = 0;
            this.done = false;

            // write element functionality in here
            // Create a shadow root
            let shadow = this.attachShadow({
                mode: 'open'
            }); // sets and returns 'this.shadowRoot'

            this.base = document.createElement('span');
            shadow.appendChild(this.base);

            this.targetSpan = document.createElement('span');
            this.targetSpan.classList.add("target");
            this.targetSpan.setAttribute("tabindex", '0');
            this.targetSpan.setAttribute("aria-label", 'Fill in this blank');
            this.targetSpan.textContent = '???';
            this.base.appendChild(this.targetSpan);


            this.popupDiv = document.createElement('div');
            this.popupDiv.classList.add("popup");
            this.base.appendChild(this.popupDiv);

            this.setAttribute("solved", "false");
            //this.syle = 'display: inline-block; position: relative;';

            // Create some CSS to apply to the shadow dom
            const style = document.createElement('style');
            style.textContent = wsStyle;

            shadow.appendChild(style);
        }
        connectedCallback() {

            var choices = this.getAttribute("choices");
            choices = choices.split(';');
            this.choices = choices.filter(v => v.trim().length > 0);
            this.solution = choices[0];

            choices = this.shuffle(choices);
            choices.forEach((v, i) => {
                let option = document.createElement('button');
                option.classList.add("choice");
                this.popupDiv.append(option);
                option.textContent = v;
                option.addEventListener("click", (e) => {
                    this.base.classList.remove("on");
                    option.blur();
                    if (option.textContent === this.solution) {
                        this.solve();
                    } else {
                        this.targetSpan.textContent = option.textContent;
                        this.base.classList.remove("invalid");
                        this.dispatchEvent(new Event('invalid'));
                    }
                })
            });

            const goLeft = this.targetSpan.getBoundingClientRect().left + this.popupDiv.width > window.innerWidth - 15;
            if (goLeft)
                this.base.classList.add("left");
            else
                this.base.classList.remove("left");

            this.base.addEventListener("click", () => {
                this.open();
            });
            this.base.addEventListener("mouseover", () => {
                this.open();
            });
            this.base.addEventListener("focus", () => {
                this.open();
            });
            this.base.addEventListener("blur", () => {
                this.exit();
            });
            this.base.addEventListener("mouseout", () => {
                this.exit();
            });
            
            this.dispatchEvent(new Event('ready'));
        }
        solve() {
            this.done = true;
            this.targetSpan.textContent = this.solution;
            this.base.classList.remove("on");
            this.base.classList.remove("invalid");
            this.base.classList.add("done");
            this.base.removeChild(this.popupDiv);
            this.base.removeAttribute('tabindex');
            //this.trigger("solve", {solution: this.solutionDisplay, restore});
            this.setAttribute("solved", "true");
            this.dispatchEvent(new Event('solve', {
                bubbles: true
            }));
        }
        open() {
            //this.targetSpan.getBoundingClientRect().left + this.popupDiv.width > window.innerWidth - 15;
            if (this.done)
                return;
            this.base.classList.add("on");
            const targetBounds = this.base.getBoundingClientRect();
            const popupWidth = this.popupDiv.width;
            const popupHeight = this.popupDiv.height;
            const maxWidth = window.innerWidth - 10 - targetBounds.left;
            const spaceOnRight = popupWidth < maxWidth;
            const spaceOnLeft = targetBounds.right - popupWidth > 10;
            const spaceBelow = targetBounds.top + targetBounds.height + popupHeight > window.innerHeight - 10;
            if(spaceOnLeft && !spaceOnRight)
                this.base.classList.add("left");
            if(spaceBelow)
                this.base.classList.add("top");
            this.popupDiv.style.setProperty("max-width", !spaceOnLeft && !spaceOnRight ? `${maxWidth}px` : "none");
        }
        exit() {
            this.base.classList.remove("on");
        }
        shuffle(array) {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }

            return array;
        }
    };
    customElements.define('w-m', wselect);

    var steps;
    var currentStep;

    function nextStep() {
        currentStep++;
        if (currentStep < steps.length) {
            steps[currentStep].reveal();
        }
    }

    function showAllSteps(){
        steps.forEach((step)=>{
            step.reveal();
        });
    }

    window.addEventListener("load", () => {
        console.log('load event');

    })
    window.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');
        steps = document.querySelectorAll("w-s");
        currentStep = -1;
        nextStep();
    });

    let openLink = document.createElement('a');
    openLink.textContent = "mostrar tudo";
    openLink.style.color = "blue";
    openLink.onclick = showAllSteps;
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(openLink);
})();
}
