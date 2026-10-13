const LARGHEZZA = 1280;
const ALTEZZA = 720;

const config = {
    canvas_width: LARGHEZZA,
    canvas_height: ALTEZZA,
    canvas_id: "area_gioco",
    background_color: 0x7EC8F0,
    gravity_value: 2000,
    debug_mode: true, // Ti mostra i rettangoli della fisica colorati ( viola/blu )
};

PP.game.create(config);