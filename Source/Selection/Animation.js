class Animation
{
    constructor(container, before, file_name, loader)
    {
        var n = document.createElement("button");
        n.className = "char_list_element";
        var txt = file_name.replace(/^.*[\\\/]/, '').replace(".fbx", '');
        var t = document.createTextNode(txt);
        n.appendChild(t);
        container.insertBefore(n, before);

        var anim;
        var loader_helper = loader;

        Object.defineProperty(this, "anim", {
            get : function() { return anim; },
            set : function(val)  { anim=val; }
        });

        n.onclick = function(){
            loader_helper.cur_anim = this;
            loader_helper.true_load(anim);            
        }
    }
}