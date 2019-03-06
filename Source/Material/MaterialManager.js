class MaterialManager
{
    constructor()
    {
        var mat_list = []

        Object.defineProperty(this, "mat_list", {
            get : function() { return mat_list; },
            set : function(val)  { mat_list=val; }
        });
    }

    init_manager(){
        var container = document.getElementById("mat-config");

        for(var i = 0; i < this.mat_list.length; i++)
        {
            var that = this;

            (function(){
                var m_el = document.createElement("div");
                m_el.className = "mat_element";

                var mat_name = document.createElement("div");
                var text = document.createTextNode(that.mat_list[i].name);
                mat_name.className = "mat-name";
                mat_name.appendChild(text);
                m_el.appendChild(mat_name);
                
                var m_col = document.createElement("div");
                m_col.className = "mat-color";
                

                //TODO: Create a custom HTML Input text and use it for
                //      this and the character name
                var in_col = document.createElement("input");
                in_col.className = "col-txt";
                in_col.setAttribute("type", "text");
                in_col.placeholder = "#ffffff";
                in_col.maxLength = 7;
                in_col.pattern="#[0-9a-fA-F]+";
                in_col.value = "#" + that.mat_list[i].color.getHexString();
                m_col.appendChild(in_col);

                var sel_col = document.createElement("input");
                sel_col.className="sel-color";
                sel_col.setAttribute("type", "color");
                m_col.appendChild(sel_col);
                sel_col.value = "#"+ that.mat_list[i].color.getHexString();

                var idx = i;

                sel_col.addEventListener("change" ,  function (){ 
                    
                    in_col.value = sel_col.value; 
                    that.mat_list[idx].color = new THREE.Color(sel_col.value);

                }, false);

                in_col.oninput = function () { 
                    if(in_col.value[0] !== '#')
                        in_col.value = '#' + in_col.value;
                    
                    if(in_col.checkValidity()){
                        that.mat_list[idx].color = new THREE.Color(in_col.value);
                        sel_col.value = in_col.value;
                    }
                }

                m_el.appendChild(m_col);

                var type = document.createElement("text");
                var type_txt = document.createTextNode("Type");
                type.appendChild(type_txt);
                type.className = "mat-type";

                m_el.appendChild(type);
                container.appendChild(m_el);

            }());
        }
    }
}