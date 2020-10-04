function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

class NeuralNetwork{
    constructor(input_nodes, hidden_nodes, output_nodes){
        this.input_nodes=input_nodes;
        this.hidden_nodes=hidden_nodes;
        this.output_nodes=output_nodes;

        this.weights_ih=new Matrix(this.hidden_nodes,this.input_nodes);
        this.weights_ho=new Matrix(this.output_nodes,this.hidden_nodes);

        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h= new Matrix(this.input_nodes,1);
        this.bias_o= new Matrix(this.output_nodes,1);

        this.bias_h.randomize();
        this.bias_o.randomize();
        //TO-DO: randomize? ^
    }

    //Guessing the answer
    feedforward(input){

        let input_matrix = Matrix.fromArray(input);
        let hidden = Matrix.multiply(this.weights_ih,input_matrix);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);


        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArray();
    }


    // Training(Backpropagation) : Calculating the error, adjusting weights
    train(inputs, targets){
        let outputs = this.feedforward(inputs);

        outputs= Matrix.fromArray(outputs);
        targets= Matrix.fromArray(targets);


        // error = targets - outputs
        let errors = Matrix.subtract(targets,outputs)

        //calculating the hidden layer errors
        let trans_ho= Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(trans_ho,errors);


        outputs.print();
        targets.print();
        errors.print();
    }
}