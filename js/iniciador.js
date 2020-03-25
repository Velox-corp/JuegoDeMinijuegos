function comprobar() {
    if (localStorage.getItem("dado") == "NaN" ||
        localStorage.getItem("score_global") == "NaN") {
        localStorage.setItem("dado", 1);
        localStorage.setItem("score_global", 0);
    }
}

comprobar();