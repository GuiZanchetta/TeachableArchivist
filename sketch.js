let input;
let img;
let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/v18IdWKm8/';
let label = "";
notclassifyed = true;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  input = createFileInput(handleFile);
  input.position(0, 350);
  
}

function draw() {
  background(0);
  if (img) {
  image(img, 0, 0, width, height);
  if(notclassifyed){
    classifyImage();
  }
  }
  
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}



function classifyImage() {
  
  classifier.classify(img, gotResult);
  

}

function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  notclassifyed = false;
    
  
}