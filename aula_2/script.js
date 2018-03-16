function calculaImc(peso, altura){
    imc = peso/(altura*altura);
    if (imc < 18.5){
        console.log("Abaixo do peso");
    }
    else if (imc >= 18.5 && imc < 25){
        console.log("Peso Normal");
    }
    else if (imc >= 25 && imc < 30){
        console.log("Peso Normal");
    }
    else{
        console.log("Peso Normal");
    }
}

function inverte(string){
    var stringLength=string.length;
    var stringInvertido = "";
    for (i=stringLength; i >= 0; i--){
        stringInvertido += string[i];
    }
    console.log("Normal: " +string);
    console.log("Invertido: " +stringInvertido);
}

function main(){
    calculaImc(70,1.80);
    inverte(["Ola Francisco"])
}

//Inline 
main();