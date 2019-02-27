class ChracterElement extends HTMLElement
{

    constructor()
    {
        super();
        window.onload = function()
        {
            //TODO: Fix clicking on toggle show character list changing selection
            //      to the clicked character
            //TODO: Separate everything in classes
            //FIXME: The add new character button is triggering the select div functions(this is not right)
            var ph_names = ["walk", "run", "idle", "wallclimb", "jump",
                            "ladderclimb", "attack1", "attack2", "cast1", 
                            "castcomplete", "newcast", "rapier1"]
            //var ph_names = [];
            var char_list = document.getElementById("character-list");

            var add_char_btn = document.getElementById("add_char_btn");
            add_char_btn.onclick = createButton;
    
            var char = null;
            var toggle_anim = null;
            var anim_container = null;
            var add_anim_btn = null;

            function click_expand()
            {
                
                if(toggle_anim.childNodes[0].nodeValue === ">")
                {
                    toggle_anim.childNodes[0].nodeValue = "v";
                    anim_container.style.height = 'auto';

                    var endHeight = getComputedStyle(anim_container).height; //max height
                    anim_container.style.height = '0px';//go back to 0
                    anim_container.style.transition = 'height 300ms ease-in-out';
                    anim_container.offsetHeight;
                    anim_container.style.height = endHeight
    
                    anim_container.addEventListener('transitionend', function transitionEnd(event) {
                        if (event.propertyName == 'height') {
                            anim_container.style.transition = ''
                            anim_container.style.height = 'auto'
                            anim_container.removeEventListener('transitionend', transitionEnd, false)
                        }
                    }, false)
                    
                }
                else
                {
                    toggle_anim.childNodes[0].nodeValue = ">";
    
                    anim_container.style.height = getComputedStyle(anim_container).height;
                    anim_container.style.transition = 'height 300ms ease-in-out';
                    anim_container.offsetHeight;
                    anim_container.style.height = '0px';
                }
            }
            
            function createButton()
            {
                var i = char_list.childNodes.length;
                console.log(i);
                char = document.createElement("div");
                char.id = "char_" + i;
                char.className = "button-default";
                
                var char_container = document.createElement("div");
                char_container.id = "char_cont_" + i;
                
                
                char_list.appendChild(char_container);
                
                var char_name = document.createElement("input");
                
                char_name.id = "char_"+i+"_name";
                char_name.setAttribute("type", "text");
                char_name.setAttribute("value", "New Character");
                char_name.className = "character-txt-default";
                char_name.readOnly = true;
                char_name.ondblclick = function(){char_name.readOnly = false;}
                char_name.onkeypress = function(e){
                    if (!e) e = window.event;
                    var keyCode = e.keyCode || e.which;
                    if (keyCode == '13'){
                        char_name.readOnly = true;
                        return;
                    }
                }

                toggle_anim = document.createElement("button");
                toggle_anim.className = "character-expand-default";
                toggle_anim.id = "show_anim_"+i;
                var exp_txt = document.createTextNode("v");
                toggle_anim.appendChild(exp_txt);
                toggle_anim.onclick = click_expand;
                
                char.appendChild(toggle_anim);
                char.appendChild(char_name);
                
                char_container.appendChild(char);
    
                anim_container = document.createElement("div")
                anim_container.id = "anim_cont_"+i;
                anim_container.className = "character_list";
                char_container.appendChild(anim_container);
    
                add_anim_btn = document.createElement("button");
                add_anim_btn.id = "add_anim_btn_" + i.toString();
                add_anim_btn.className = "char_list_element";
                var tsname = document.createTextNode("+ Add anim");
                add_anim_btn.appendChild(tsname);
    
                anim_container.appendChild(add_anim_btn);
    
                for(i = 0; i < ph_names.length; i++)
                {
                    var n = document.createElement("button");
                    n.className = "char_list_element";
                    var t = document.createTextNode(ph_names[i]);
                    n.appendChild(t);
                    anim_container.insertBefore(n, add_anim_btn);
                }

                var d = new Character(anim_container);
            }
        }
    }
}

customElements.define('char-element', ChracterElement);

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