
function hide_all () {
    document.getElementsByClassName("pages").classList.add("hide");
}

function show(id) {
    hide_all();
    document.getElementsById(id).classList.remove("hide");
}