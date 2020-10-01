

let a = new Matrix(3,3);
let b= new Matrix(3,3);
a.randomize();
b.randomize();

console.table(a.matrix);
console.table(b.matrix);
console.table(Matrix.multiply(a,b).matrix);


// NN

let nn = new NeuralNetwork(2,2,1);

let input = [1,0];
let output = nn.feedforward(input);


console.log("guess: "+output);
