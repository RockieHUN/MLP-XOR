
class Matrix{

    constructor(rows, cols){
        this.rows=rows;
        this.cols=cols;
        
        this.matrix=new Array(rows);

        for (let i=0; i<this.matrix.length; i++){
            this.matrix[i]=new Array(cols);
        }
    }

    randomize(){
        for (let i =0; i<this.rows; i++)
            for (let j=0 ;j<this.cols; j++){
                this.matrix[i][j]=Math.random()*2-1;
            }
    }


    multiply(b){

        if (this.cols != b.rows ) {
            console.log ("cols of A doesnt isnt equal to rows of B!" );
            return;
        }
        let result = new Matrix(this.rows, b.cols)
        for (let i=0;i<result.rows; i++){ 
            for (let j=0; j<result.cols ; j++){
                let sum= 0;
                for ( let k=0; k<this.cols; k++)
                    sum += this.matrix[i][k] * b.matrix[k][j]
                result.matrix[i][j]=sum;
            }
        }
        return result;   
    }

    static multiply(a,b){
        if (a.cols != b.rows ) {
            console.log ("cols of A doesnt isnt equal to rows of B!" );
            return;
        }
        let result = new Matrix(a.rows, b.cols)
        for (let i=0;i<result.rows; i++){ 
            for (let j=0; j<result.cols ; j++){
                let sum= 0;
                for ( let k=0; k<a.cols; k++)
                    sum += a.matrix[i][k] * b.matrix[k][j]
                result.matrix[i][j]=sum;
            }
        }
        return result;  
    }

    transpose(){
        let trans = new Matrix(this.cols, this.rows);

        for (let i =0 ; i< this.rows; i++){
            for (let j=0; j<this.cols; j++){
                trans.matrix[j][i]=this.matrix[i][j];
            }
        }
        return trans;
    }

    add(matrix){
        if (!(matrix instanceof Matrix)){
            console.log("Its not a matrix!");
            return;
        }
        if (matrix.rows!= this.rows || matrix.cols!=this.cols){
            console.log("bad dimensions!");
            return;
        }

        for (let i=0; i<this.rows;i++){
            for (let j=0; j<this.cols;j++){
                this.matrix[i][j]+=matrix.matrix[i][j];
            }
        }
    }

    static fromArray(array){
        let matrix = new Matrix(array.length,1);

        for (let i = 0; i<array.length; i++){
            matrix.matrix[i][0]=array[i];
        }
        return matrix;
    }
    

    print(){
        console.table(this.matrix);
    }

    map( fn ){
        for (let i =0; i<this.rows; i++)
        for (let j =0; j<this.cols; j++){
            this.matrix[i][j]=fn(this.matrix[i][j]);
        }
    }

    toArray(){
        if (this.cols!=1){
            console.log("cant convert to Array!");
            return;
        }

        let array=[];
        for (let i=0; i<this.rows;i++){
            array.push(this.matrix[i][0]);
        }

        return array;
    }
}