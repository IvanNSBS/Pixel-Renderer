class AnimList {
    constructor(el) {

        var ph_names = ["walk", "run", "idle", "wallclimb", "jump",
            "ladderclimb", "attack1", "attack2", "cast1",
            "castcomplete", "newcast", "rapier1"]
        //var ph_names = [];

        this.anim_container = document.createElement("div");
        this.add_anim_btn = document.createElement("button");
        this.parent = el;

        this.anim_container.id = "anim_cont_";// + i;
        this.anim_container.className = "character_list";

        this.add_anim_btn.id = "add_anim_btn_";// + i.toString();
        this.add_anim_btn.className = "char_list_element";

        var tsname = document.createTextNode("+ Add anim");

        this.add_anim_btn.appendChild(tsname);

        this.anim_container.appendChild(this.add_anim_btn);

        for (var i = 0; i < ph_names.length; i++) {
            var n = document.createElement("button");
            n.className = "char_list_element";
            var t = document.createTextNode(ph_names[i]);
            n.appendChild(t);
            this.anim_container.insertBefore(n, this.add_anim_btn);
        }
        this.parent.appendChild(this.anim_container);
    }

}

AnimList.prototype.getAnimContainer = function () {
    return this.anim_container;
}

//window.onload = function(){ console.log("JUST LOADED ANIMATION LIST");}