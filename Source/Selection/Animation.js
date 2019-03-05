class Animation
{
    constructor(container, before, file_name)
    {
        var n = document.createElement("button");
        n.className = "char_list_element";
        var txt = file_name.replace(/^.*[\\\/]/, '').replace(".fbx", '');
        var t = document.createTextNode(txt);
        n.appendChild(t);
        container.insertBefore(n, before);
    }
}