var fs = require("fs");
var data = "O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electrónica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letraset, que continham passagens com Lorem Ipsum, e mais recentemente com os programas de publicação como o Aldus PageMaker que incluem versões do Lorem Ipsum.";
var writeStream = fs.createWriteStream('output.txt');

function repeat(){
    for (var i=0; i<10000; i++){
        writeStream.write(data,'UTF8');
    }
}
writeStream.end();
writeStream.on('finish', function(){
    console.log("write completed.");
});

console.log(repeat());