// Costanti di colore e dimensioni
const TERRA = "0xB96E54";
const VERDE = "0x72A110";
const ROSSO = "0xE44A4A";
const GIALLO = "0xFFD95A";

const A_TERRENO = 96;
const Y_TERRENO = 624;

const X_GINO = 200;
const L_GINO = 81;
const A_GINO = 84;

const L_FUNGO = 90;
const A_FUNGO = 63;
const VEL_FUNGO = 400;

const VEL_SALTO = 1000;
const TASTO_SALTO = PP.key_codes.SPACE;

let terreno;
let gino;
let fungo;

function preload(s) {
}

function create(s) {
    // Disegna il sole
    PP.shapes.arc_add(s, 1080, 130, 56, 0, 360, false, GIALLO, 1);

    crea_terreno(s);
    crea_gino(s);
    crea_fungo(s);
}

function crea_terreno(s) {
    terreno = PP.shapes.rectangle_add(s, 
        LARGHEZZA / 2, Y_TERRENO + A_TERRENO / 2, 
        LARGHEZZA, A_TERRENO, TERRA, 1);
    
    // Diamo al terreno un corpo STATIC (fisso)
    PP.physics.add(s, terreno, PP.physics.type.STATIC);
}

function crea_gino(s) {
    gino = PP.shapes.rectangle_add(s, 
        X_GINO, Y_TERRENO - A_GINO / 2, 
        L_GINO, A_GINO, VERDE, 1);
    
    // Corpo DYNAMIC (soggetto a gravità) e bloccato nei bordi dello schermo
    PP.physics.add(s, gino, PP.physics.type.DYNAMIC);
    PP.physics.set_collide_world_bounds(gino, true);
    
    // Fa in modo che Gino urti il terreno invece di attraversarlo
    PP.physics.add_collider(s, gino, terreno);
}

function crea_fungo(s) {
    fungo = PP.shapes.rectangle_add(s, 
        LARGHEZZA * 3 / 4, Y_TERRENO - A_FUNGO / 2, 
        L_FUNGO, A_FUNGO, ROSSO, 1);
    
    // Fungo dinamico senza gravità che si muove verso sinistra
    PP.physics.add(s, fungo, PP.physics.type.DYNAMIC);
    PP.physics.set_allow_gravity(fungo, false);
    PP.physics.set_velocity_x(fungo, -VEL_FUNGO);
}

function salta(s) {
    if (PP.interactive.kb.is_key_just_down(s, TASTO_SALTO) && PP.physics.is_on_ground(gino)) {
        PP.physics.set_velocity_y(gino, -VEL_SALTO);
    }
}

function update(s) {
    salta(s);
}

function destroy(s) {
}

PP.scenes.add("gino", preload, create, update, destroy);
