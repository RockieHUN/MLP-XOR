

let a = new Matrix(3,3);
let b= new Matrix(3,3);
a.randomize();
b.randomize();

//console.table(a.matrix);
//console.table(Matrix.transpose(a).matrix);
/*console.table(b.matrix);
console.table(Matrix.subtract(a,b).matrix);*/



// NN

let nn = new NeuralNetwork(2,2,2);

let inputs = [1,0];
let targets = [1,0];
//let output = nn.feedforward(input);
nn.train(inputs,targets)

//console.log("guess: "+output);
