function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function dSigmoid(y){
    return y*(1-y);
}

class NeuralNetwork{
    constructor(input_nodes, hidden_nodes, output_nodes){
        //structure of the neural network
        this.input_nodes=input_nodes;
        this.hidden_nodes=hidden_nodes;
        this.output_nodes=output_nodes;

        //random weights
        this.weights_ih=new Matrix(this.hidden_nodes,this.input_nodes);
        this.weights_ho=new Matrix(this.output_nodes,this.hidden_nodes);

        this.weights_ih.randomize();
        this.weights_ho.randomize();

        //random bias
        this.bias_h= new Matrix(this.input_nodes,1);
        this.bias_o= new Matrix(this.output_nodes,1);

        this.bias_h.randomize();
        this.bias_o.randomize();
        
        //learning rate
        this.learning_rate = 0.3;

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

        //feedforward
        let input_matrix = Matrix.fromArray(inputs);
        let hidden = Matrix.multiply(this.weights_ih,input_matrix);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);


        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);

        targets= Matrix.fromArray(targets);


        // error = targets - outputs
        let output_errors = Matrix.subtract(targets,outputs)

       
        //gradient for weights_ho
        //calculating the gradient   W=lr*E*(O*(1-O))*H.transpose   
        let gradients = Matrix.map(outputs, dSigmoid);   // O*(1-O)
        gradients = Matrix.elementviseMultiply(gradients,output_errors);
        gradients.scalarMultiply(this.learning_rate);

    
        //calculate ho deltas
        let hidden_t = Matrix.transpose(hidden);
        let deltas_weight_ho = Matrix.multiply(gradients,hidden_t);
        this.weights_ho.add(deltas_weight_ho);
        this.bias_o.add(gradients);

         //calculating the hidden layer errors
         let trans_ho= Matrix.transpose(this.weights_ho);
         let hidden_errors = Matrix.multiply(trans_ho,output_errors); 

        //gradient for weights_ih
        let gradients_ih = Matrix.map(hidden, dSigmoid);
        gradients_ih = Matrix.elementviseMultiply(gradients_ih, hidden_errors);
        gradients_ih.scalarMultiply(this.learning_rate);

        //calculate ih deltas

        let input_t = Matrix.transpose(input_matrix);
        let deltas_weight_ih = Matrix.multiply(gradients_ih,input_t);
        this.weights_ih.add(deltas_weight_ih);
        this.bias_h.add(gradients_ih);


        /*outputs.print();
        targets.print();
        errors.print();*/
    }
}