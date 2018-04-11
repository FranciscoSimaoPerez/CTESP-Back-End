function main(){
    var person = {
        "name":"Maria",
        "gender":"Wamen",
        "age":"17"
    };
    var maria = JSON.stringify(person);

    var str='{"name":"Palito","age":6,"gender":"Wamen"}';
    var lul= JSON.parse(str);

    console.log(lul);
}

main();