
class Character {
    constructor(char_, add_char) {
        this.char = document.createElement("div");
        this.toggle_anim = document.createElement("button");
        this.tst = null;
        this.char_list = char_;
        this.add_char_btn = add_char;
        //this.createButton.apply(this);
        //console.log(add_char_btn);
        //add_char_btn.onclick = this.createButton;

        //console.log(this.char_list);
    }


    createButton() {
        var that = this;
        console.log(that);
        var i = this.char_list.childNodes.length;
        this.char = document.createElement("div");
        this.char.id = "char_" + i;
        this.char.className = "button-default";

        var char_container = document.createElement("div");
        char_container.id = "char_cont_" + i;


        this.char_list.appendChild(char_container);

        var char_name = document.createElement("input");

        char_name.id = "char_" + i + "_name";
        char_name.setAttribute("type", "text");
        char_name.setAttribute("value", "New Character");
        char_name.className = "character-txt-default";
        char_name.readOnly = true;
        char_name.ondblclick = function () { char_name.readOnly = false; }
        char_name.onkeypress = function (e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13') {
                char_name.readOnly = true;
                return;
            }
        }

        this.toggle_anim = document.createElement("button");
        this.toggle_anim.className = "character-expand-default";
        this.toggle_anim.id = "show_anim_" + i;
        //this.toggle_anim.onclick = this.click_expand.bind(this.toggle_anim);
        var that = this;
        //this.toggle_anim.addEventListener("click", that.click_expand.call(), false);

        var exp_txt = document.createTextNode("v");
        this.toggle_anim.appendChild(exp_txt);

        this.char.appendChild(this.toggle_anim);
        this.char.appendChild(char_name);

        char_container.appendChild(this.char);
        this.tst = new AnimList(char_container);


        //console.log(this.toggle_anim);
    }

    click_expand() {
        if (this.toggle_anim.childNodes[0].nodeValue === ">") {
            toggle_anim.childNodes[0].nodeValue = "v";
            tst.getAnimContainer().style.height = 'auto';

            var endHeight = getComputedStyle(tst.getAnimContainer()).height; //max height
            tst.getAnimContainer().style.height = '0px';//go back to 0
            tst.getAnimContainer().style.transition = 'height 300ms ease-in-out';
            tst.getAnimContainer().offsetHeight;
            tst.getAnimContainer().style.height = endHeight;

            tst.getAnimContainer().addEventListener('transitionend', function transitionEnd(event) {
                if (event.propertyName == 'height') {
                    tst.getAnimContainer().style.transition = ''
                    tst.getAnimContainer().style.height = 'auto'
                    tst.getAnimContainer().removeEventListener('transitionend', transitionEnd, false)
                }
            }, false)

        }
        else {
            this.toggle_anim.childNodes[0].nodeValue = ">";

            //this.tst.getAnimContainer().style.height = getComputedStyle(tst.getAnimContainer()).height;
            //this.tst.getAnimContainer().style.transition = 'height 300ms ease-in-out';
            //this.tst.getAnimContainer().offsetHeight;
            //this.tst.getAnimContainer().style.height = '0px';
        }
    }
}


class CharacterElement extends HTMLElement {
    constructor() {
        super();
        window.onload = function () {
            //TODO: Fix clicking on toggle show character list changing selection
            //      to the clicked character
            //TODO: Separate everything in classes
            //FIXME: The add new character button is triggering the select div functions(this is not right)

            this.char_lista = document.getElementById("character-list");

            this.add_char_btn = document.getElementById("add_char_btn");
            this.ref = new Character(this.char_lista);
            let func = ref.createButton.bind(ref);
            //ref.createButton(); // works
            //this.add_char_btn.onclick = ref.createButton.call(); // changes parent
            //also tried with addEventListener. Got
            this.add_char_btn.addEventListener("click", func, false);
        }
    }
}

customElements.define('char-element', CharacterElement);

/*function selectDiv(char_el, txt, exp)
{
    console.log("Selected Div");
    console.log(char_el);
    console.log(txt);
    if(selected_button != null)
    {
        selected_button.className = "button-default";
        cur_txt.className = "character-txt-default";
        cur_exp.className = "character-expand-default";
    }
    else
    {
        selected_button = char_el;
        cur_txt = txt;
        cur_exp = exp;

        selected_button.className = "button-selected";
        cur_txt.className = "character-txt-selected";
        cur_exp.className = "character-expand-selected";
    }
}*/