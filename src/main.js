import * as THREE from 'three';



// ESCENA


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';



// TEXTURE LOADER cargar textura


const textureLoader = new THREE.TextureLoader();


// ======================
// TEXTURAS
// ======================

// SUELO
const textura_uno_suelo = textureLoader.load(`${import.meta.env.BASE_URL}textures/7.jpg`);
const textura_dos_suelo = textureLoader.load(`${import.meta.env.BASE_URL}textures/6.jpg`);

// CIELO
const textura_uno_cielo = textureLoader.load(`${import.meta.env.BASE_URL}textures/7.jpg`);
const textura_dos_cielo = textureLoader.load(`${import.meta.env.BASE_URL}textures/6.jpg`);

// ESFERA
const textura_uno_esfera = textureLoader.load(`${import.meta.env.BASE_URL}textures/7.jpg`);
const textura_dos_esfera = textureLoader.load(`${import.meta.env.BASE_URL}textures/6.jpg`);


// ======================
// CONFIGURACIÓN TEXTURAS
// ======================

// Suelo
textura_uno_suelo.wrapS = THREE.RepeatWrapping;
textura_uno_suelo.wrapT = THREE.RepeatWrapping;
textura_uno_suelo.repeat.set(1, 4);

textura_dos_suelo.wrapS = THREE.RepeatWrapping;
textura_dos_suelo.wrapT = THREE.RepeatWrapping;
textura_dos_suelo.repeat.set(1, 4);

// Cielo
textura_uno_cielo.wrapS = THREE.RepeatWrapping;
textura_uno_cielo.wrapT = THREE.RepeatWrapping;

textura_dos_cielo.wrapS = THREE.RepeatWrapping;
textura_dos_cielo.wrapT = THREE.RepeatWrapping;


// ======================
// ESTADOS
// ======================

const estados = [

    // Estado 0
    {
        esfera: textura_dos_esfera,
        suelo: textura_dos_suelo,
        cielo: textura_dos_cielo
    },

    // Estado 1
    {
        esfera: textura_dos_esfera,
        suelo: textura_uno_suelo,
        cielo: textura_uno_cielo
    },

    // Estado 3
    {
        esfera: textura_uno_esfera,
        suelo: textura_dos_suelo,
        cielo: textura_dos_cielo
    },
// estado 4
    {
        esfera: textura_uno_esfera,
        suelo: textura_uno_suelo,
        cielo: textura_uno_cielo
    }

];


// ======================
// SUELO
// ======================

const sueloMaterial = new THREE.MeshStandardMaterial({
    map: estados[0].suelo
});

const sueloGeometry = new THREE.PlaneGeometry(20, 20);

const suelo = new THREE.Mesh(
    sueloGeometry,
    sueloMaterial
);

suelo.rotation.x = -Math.PI / 2;
suelo.position.y = -2;

scene.add(suelo);


// ======================
// CIELO
// ======================

const cieloMaterial = new THREE.MeshBasicMaterial({
    map: estados[0].cielo,
    side: THREE.DoubleSide
});

const cieloGeometry = new THREE.PlaneGeometry(30, 20);

const cielo = new THREE.Mesh(
    cieloGeometry,
    cieloMaterial
);

cielo.position.z = -3;
cielo.position.y = 2;

scene.add(cielo);


// ======================
// LUZ
// ======================

const luzSol = new THREE.DirectionalLight(0xffffff, 3);

luzSol.position.set(5, 10, 7);

scene.add(luzSol);


// ======================
// CÁMARA
// ======================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;


// ======================
// RENDERIZADOR
// ======================

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);


// ======================
// ESFERAS
// ======================

const geometry = new THREE.SphereGeometry(2, 45, 32);

const material = new THREE.MeshBasicMaterial({
    map: estados[0].esfera,
    color: 0xffffff
});

const esfera = new THREE.Mesh(
    geometry,
    material
);

const otraFigura = new THREE.Mesh(
    geometry,
    material
);

scene.add(esfera);
scene.add(otraFigura);


// ======================
// ESTADO ACTUAL
// ======================

let estadoActual = 0;


// ======================
// CLICK
// ======================

document.body.addEventListener("click", () => {

    // Pasar al siguiente estado
    estadoActual++;

    // Si llegamos al final, volver al primero
    if (estadoActual >= estados.length) {
        estadoActual = 0;
    }

    // Obtener el estado actual
    const estado = estados[estadoActual];

    // Cambiar texturas
    esfera.material.map = estado.esfera;
    suelo.material.map = estado.suelo;
    cielo.material.map = estado.cielo;

    // Actualizar materiales
    esfera.material.needsUpdate = true;
    suelo.material.needsUpdate = true;
    cielo.material.needsUpdate = true;

});


// ======================
// ANIMACIÓN
// ======================

function animateEs() {

    requestAnimationFrame(animateEs);

    // Mover las texturas actualmente utilizadas
    suelo.material.map.offset.y += 0.01;
    cielo.material.map.offset.y -= 0.01;

    // Rotar esfera
    esfera.rotation.x += 0.01;
    esfera.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animateEs();

//responsive
window.addEventListener('resize', () => {

    // Cámara
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Renderer
    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
