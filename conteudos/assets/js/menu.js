
function hide_all () {
    document.getElementsByClassName("card").classList.add("hide");
}

function show(id) {
    hide_all();
    document.getElementsById(id).classList.remove("hide");
}