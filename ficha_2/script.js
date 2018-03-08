function inverte(){
    var string = "Francisco Perez";
    var stringLength=string.length;
    var invertido = "";
    for (i=stringLength-1; i<=0 ; i--){
        invertido += string[i];
    }
    console.log(invertido);
}

function main(){
    inverte();
}

//Inline
main();