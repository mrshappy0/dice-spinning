const THREE = require("three");
const OrbitControls = require("three-orbitcontrols");

let b = 0;
function main() {
  console.clear();
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 120;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 200;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 2;
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();

  const boxWidth = 5;
  const boxHeight = 5;
  const boxDepth = 5;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  // scene.add(ambientLight);

  // var pointLight = new THREE.PointLight(0xffffff, 1);
  // pointLight.position.set(25, 50, 25);
  // scene.add(pointLight);

  

  // const cubes = []; // just an array we can use to rotate the cubes
  const loader = new THREE.TextureLoader();

  const materials = [
    new THREE.MeshBasicMaterial({
      map: loader.load("./dice-faces/dice-six-faces-one.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./dice-faces/dice-six-faces-two.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./dice-faces/dice-six-faces-three.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./dice-faces/dice-six-faces-four.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./dice-faces/dice-six-faces-five.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("./dice-faces/dice-six-faces-six.png")
    })
  ];

  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);
  // cubes.push(cube); // add to our list of cubes to rotate

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    // time *= 0.003;
    time *= 0.01;
    // b *= 0.01
    // console.log(b)

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // cubes.forEach((cube, ndx) => {

    const speed = 0.05;
    const rot = time * speed;

    let number = Math.round(time);
    let a = Math.random() * 15;
    // let b = Math.random()*2
    // let c = Math.random()*3
    let d = Math.random() * 4;
    let e = Math.random() * 5;
    let f = Math.random() * 6;
    let g = Math.random() * 7;

    if (number % 2 != 0 && a > time) {
      cube.position.x -= 0.4;
      cube.rotation.y = a * rot;
      cube.rotation.x = rot;
      cube.rotation.z = rot;
    } else if (number % 2 == 0 && a > time) {
      cube.position.x += 0.4;
      cube.rotation.y = e * rot;
      cube.rotation.x = f * rot;
      cube.rotation.z = g * rot;
    } else {
      cube.position.x = cube.position.x;
    }
    // });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
    // return 10
  }

  requestAnimationFrame(render);
  // console.log(b)
}

main();
