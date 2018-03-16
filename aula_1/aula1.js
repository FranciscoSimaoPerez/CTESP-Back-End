<<<<<<< HEAD
function media(nota_1, nota_2, nota_3) {
   
    var media = nota_1*0.3 + nota_2*0.3 + nota_3*0.4;
    
    if (media < 10){
        console.log("Reprovado! Media=" + media);
    }
    else if(media <=20){
        console.log("Aprovado! Media=" + media);
    }
    else{
        console.log("Notas Inválidas!!!");
    }

}
//função que mostra o mes por extenso
function nMes(mes){
    switch (mes){
        case 1:
            console.log("Janeiro");
            break;
        case 2:
            console.log("Fevereiro");
            break;
        case 3:
            console.log("Março");
            break;
        case 4:
            console.log("Abril");
            break;
        case 5:
            console.log("Maio");
            break;
        case 6:
            console.log("Junho");
            break;
        case 7:
            console.log("Julho");
            break;
        case 8:
            console.log("Agosto");
            break;
        case 9:
            console.log("Setembro");
            break;
        case 10:
            console.log("Outubro");
            break;
        case 11:
            console.log("Novembro");
            break;
        case 12:
            console.log("Dezembro");
            break;
        default:
            console.log("Mês Inválido :(");
            break;
        
    }
}

function calculadora(n1,n2,op){
    if (op == "+"){
        console.log(n1 + n2);
    }
    else if (op == "-"){
        console.log(n1 - n2);
    }
    else if (op == "*"){
        console.log(n1 * n2);
    }
    else if(op == "/"){
        console.log(n1 / n2);
    }
    else if(op == "^"){
        console.log(Math.pow(n1,n2));
    }
    else {
        console.log("Operação Inválida!")
    }
}

function multiplos5(){
    for(i=1; i<20 ; i++){
        if(i % 5 == 0){
            return i;
        }
    }
}

function soma100(){
     var resultado = 0; 
    for(i = 1; i <= 100; i++){
        resultado += i; 
    }
    return resultado;
    
}

function maximo(nums){
    var max = nums[0];
    arrayLength=nums.length;
    for (i = 1; i <= arrayLength; i++){
        if (max < nums[i]){
            max = nums[i];
        }
    }
    return max;
}

function minimo(nums){
    var min = nums[0];
    arrayLength=nums.length;
    for (i = 1; i <= arrayLength; i++){
        if (min > nums[i]){
            min = nums[i];
        }
    }
    return min;
}

function media(nums){
    var arrayLength=nums.length;
    var soma = 0;
    for (i = 0; i < arrayLength; i++){
        soma = soma + nums[i];
    }
    calcMedia = soma / arrayLength;
    return calcMedia;
}

function main(){
    var nota_1 = 5;
    var nota_2 = 10;
    var nota_3 = 15; 
    var arrayNumeros = [5, 3, 34, 12, 79, 2, 4 ,11];
    
    nMes(1);
    nMes(2);
    nMes(3);
    nMes(4);
    nMes(5);
    nMes(6);
    nMes(7);
    nMes(8);
    nMes(9);
    nMes(10);
    nMes(11);
    nMes(12);
    calculadora(15,15,"^");
    console.log(multiplos5());
    console.log(soma100());
    console.log(maximo(arrayNumeros));
    console.log(minimo(arrayNumeros));
    console.log(media(arrayNumeros));
}
//Inline
main();
=======
function media(nota_1, nota_2, nota_3) {
   
    var media = nota_1*0.3 + nota_2*0.3 + nota_3*0.4;
    
    if (media < 10){
        console.log("Reprovado! Media=" + media);
    }
    else if(media <=20){
        console.log("Aprovado! Media=" + media);
    }
    else{
        console.log("Notas Inválidas!!!");
    }

}
//função que mostra o mes por extenso
function nMes(mes){
    switch (mes){
        case 1:
            console.log("Janeiro");
            break;
        case 2:
            console.log("Fevereiro");
            break;
        case 3:
            console.log("Março");
            break;
        case 4:
            console.log("Abril");
            break;
        case 5:
            console.log("Maio");
            break;
        case 6:
            console.log("Junho");
            break;
        case 7:
            console.log("Julho");
            break;
        case 8:
            console.log("Agosto");
            break;
        case 9:
            console.log("Setembro");
            break;
        case 10:
            console.log("Outubro");
            break;
        case 11:
            console.log("Novembro");
            break;
        case 12:
            console.log("Dezembro");
            break;
        default:
            console.log("Mês Inválido :(");
            break;
        
    }
}

function calculadora(n1,n2,op){
    if (op == "+"){
        console.log(n1 + n2);
    }
    else if (op == "-"){
        console.log(n1 - n2);
    }
    else if (op == "*"){
        console.log(n1 * n2);
    }
    else if(op == "/"){
        console.log(n1 / n2);
    }
    else if(op == "^"){
        console.log(Math.pow(n1,n2));
    }
    else {
        console.log("Operação Inválida!")
    }
}

function multiplos5(){
    for(i=1; i<20 ; i++){
        if(i % 5 == 0){
            return i;
        }
    }
}

function soma100(){
     var resultado = 0; 
    for(i = 1; i <= 100; i++){
        resultado += i; 
    }
    return resultado;
    
}

function maximo(nums){
    var max = nums[0];
    arrayLength=nums.length;
    for (i = 1; i <= arrayLength; i++){
        if (max < nums[i]){
            max = nums[i];
        }
    }
    return max;
}

function minimo(nums){
    var min = nums[0];
    arrayLength=nums.length;
    for (i = 1; i <= arrayLength; i++){
        if (min > nums[i]){
            min = nums[i];
        }
    }
    return min;
}

function media(nums){
    var arrayLength=nums.length;
    var soma = 0;
    for (i = 0; i < arrayLength; i++){
        soma = soma + nums[i];
    }
    calcMedia = soma / arrayLength;
    return calcMedia;
}

function main(){
    var nota_1 = 5;
    var nota_2 = 10;
    var nota_3 = 15; 
    var arrayNumeros = [5, 3, 34, 12, 79, 2, 4 ,11];
    
    nMes(1);
    nMes(2);
    nMes(3);
    nMes(4);
    nMes(5);
    nMes(6);
    nMes(7);
    nMes(8);
    nMes(9);
    nMes(10);
    nMes(11);
    nMes(12);
    calculadora(15,15,"^");
    console.log(multiplos5());
    console.log(soma100());
    console.log(maximo(arrayNumeros));
    console.log(minimo(arrayNumeros));
    console.log(media(arrayNumeros));
}
//Inline
main();
>>>>>>> 3b5083a2c3ee030828ee3a2145c6ac4a0187c1a0
