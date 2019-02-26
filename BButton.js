
class BButton extends HTMLElement
{
    constructor()
    {
        super();
        window.onload = function()
        {
            //TODO: Fix clicking on toggle show character list changing selection
            //      to the clicked character
            //TODO: Separate everything in classes
            var char_names = []
            var ph_names = ["walk", "run", "idle", "wallclimb", "jump",
                            "ladderclimb", "attack1", "attack2", "cast1", 
                            "castcomplete", "newcast", "rapier1", "rapier2",
                            "rapierjump", "rapierair", "axe1", "axe2", "axejump",
                            "sword1", "sword2", "sword3", "swordjump", "ultimate1",
                            "ultimate2", "ultimate3", "holycast", "holycast2",
                            "holycastcompleted", "darkmageidle","dakrmagejump",
                            "icemagecast", "icenovacastcompleted", "teleport",
                            "dash", "quickdash", "dodge", "open door", "kick"]
            //var ph_names = [];
            var char_list = document.getElementById("character-list");
            var selected_button = null;
            var cur_txt = null;
            var cur_exp = null;
            var add_char_btn = document.getElementById("add_char_btn");
            console.log(add_char_btn);
            add_char_btn.onclick = createButton;
    
            function click_expand(index)
            {
                exp = document.getElementById("char_el_expand_"+index);
                add_anim = document.getElementById("anim_cont_"+index);
                console.log(add_anim);
                
                if(exp.childNodes[0].nodeValue === ">")
                {
                    exp.childNodes[0].nodeValue = "v";
                    add_anim.style.height = 'auto';
                    var endHeight = getComputedStyle(add_anim).height; //max height
                    add_anim.style.height = '0px';//go back to 0
                    add_anim.style.transition = 'height 300ms ease-in-out';
                    add_anim.offsetHeight;
                    add_anim.style.height = endHeight
    
                    add_anim.addEventListener('transitionend', function transitionEnd(event) {
                        if (event.propertyName == 'height') {
                            add_anim.style.transition = ''
                            add_anim.style.height = 'auto'
                            add_anim.removeEventListener('transitionend', transitionEnd, false)
                        }
                    }, false)
                    
                }
                else
                {
                    exp.childNodes[0].nodeValue = ">";
    
                    add_anim.style.height = getComputedStyle(add_anim).height;
                    add_anim.style.transition = 'height 300ms ease-in-out';
                    add_anim.offsetHeight;
                    add_anim.style.height = '0px';
                }
                
                //add_anim.classList.toggle('open');
    
            }
    
            function selectDiv(index)
            {
                console.log(index);
                char_el = document.getElementById("char_el"+index);
                txt = document.getElementById("char_el_txt_"+index);
                exp = document.getElementById("char_el_expand_"+index);
                
                if(selected_button != null)
                {
                    selected_button.className = "button-default";
                    cur_txt.className = "character-txt-default";
                    cur_exp.className = "character-expand-default";
                }
    
                selected_button = char_el;
                cur_txt = txt;
                cur_exp = exp;
    
                selected_button.className = "button-selected";
                cur_txt.className = "character-txt-selected";
                cur_exp.className = "character-expand-selected";
            }
    
            
            function createButton()
            {
                console.log("Clicked");
                char_names.push("New Character");
                var i = char_names.length - 1;
    
                var char_el = document.createElement("div");
                char_el.id = "char_el" + i.toString();
                char_el.className = "button-default";
                char_el.setAttribute( "onclick", "selectDiv("+i+")" );
    
                var char_container = document.createElement("div");
                char_container.id = "char_cont_" + i.toString();
                
                
                char_list.appendChild(char_container);
                
                var t = document.createTextNode(char_names[i]);
                var txt = document.createElement("input");
                txt.id = "char_el_txt_"+i;
                txt.setAttribute("type", "text");
                txt.setAttribute("value", "New Character");
                txt.className = "character-txt-default";
                txt.readOnly = true;
                txt.ondblclick = function(){txt.readOnly = false;}
                txt.onkeypress = function(e){
                    if (!e) e = window.event;
                    var keyCode = e.keyCode || e.which;
                    if (keyCode == '13'){
                        txt.readOnly = true;
                        return;
                    }
                }
                
                var expand = document.createElement("button");
                expand.className = "character-expand-default";
                expand.id = "char_el_expand_"+i;
                var exp_txt = document.createTextNode("v");
                expand.appendChild(exp_txt);
                expand.setAttribute( "onclick", "click_expand("+i+")" );
    
                char_el.appendChild(expand);
                char_el.appendChild(txt);
    
                char_container.appendChild(char_el);
    
    
                var anim_container = document.createElement("div")
                anim_container.id = "anim_cont_"+i;
                anim_container.className = "character_list";
                char_container.appendChild(anim_container);
    
                var add_anim = document.createElement("button");
                add_anim.id = "add_anim_" + i.toString();
                add_anim.className = "char_list_element";
                var tsname = document.createTextNode("+ Add anim");
                add_anim.appendChild(tsname);
    
                anim_container.appendChild(add_anim);
    
                for(i = 0; i < ph_names.length; i++)
                {
                    var n = document.createElement("button");
                    n.className = "char_list_element";
                    var t = document.createTextNode(ph_names[i]);
                    //add_anim.style.height = 40 * i+1 + 'px';
                    n.appendChild(t);
                    anim_container.insertBefore(n, add_anim);
                }
                
            }
        }
    }
}

customElements.define('b-button', BButton);