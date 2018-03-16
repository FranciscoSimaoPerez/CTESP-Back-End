function inverte(){
    var string = "Francisco Perez";
    var stringLength=string.length;
    var invertido = "";
    for (i=stringLength-1; i>=0 ; i--){
        invertido += string[i];
    }
    return invertido;
}

function main(){
    var a = inverte();
    console.log(a);
}

//Inline
main();