
//training data
let examples= {
    1: {
        input: [1,0],
        target: [1]
    },

    2: {
        input: [0,1],
        target: [1]
    },

    3: {
        input: [1,1],
        target: [0]
    },
    4:{
        input: [0,0],
        target: [0]
    }
};




// Creating the neural network  - XOR problem
let nn = new NeuralNetwork(2,2,1);   // 2 input nodes, 2 hidden nodes, 1 output node

for (let i = 0; i< 100000; i++)
{
    let r_number = Math.floor(Math.random()*4+1);
    nn.train(examples[r_number].input, examples[r_number].target);
}


console.log("0 XOR 1: "+nn.feedforward([0,1]));
console.log("1 XOR 0: "+nn.feedforward([1,0]));
console.log("0 XOR 0: "+nn.feedforward([0,0]));
console.log("1 XOR 1: "+nn.feedforward([1,1]));
