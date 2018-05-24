var fs = require("fs");
var data = "O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electrónica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letraset, que continham passagens com Lorem Ipsum, e mais recentemente com os programas de publicação como o Aldus PageMaker que incluem versões do Lorem Ipsum.";
var writerStream = fs.createWriteStream('x.txt');
var readerStream = fs.createReadStream('output.txt');
readerStream.setEncoding('UTF8');


// for (var i = 0; i <= 10000; i++) {
//     writerStream.write(data, 'UTF8');
// }

// for (var x = 0; x <= 10; x++) {
//     readerStream.on('data', function (chunk) {
//         data += chunk;
//     });
// }



// function readFile(fileName){
//      var file = fs.readFileSync(fileName, 'utf-8');
//      return file;
// }

// readerStream.on("data",function(chunk){
//     writerStream.write(chunk);    
// });

readerStream.pipe(writerStream);

writerStream.on('finish', function () {
    console.log("write completed.");
});


readerStream.on('end', function () {
     writerStream.end();
    // console.log(data);
});

writerStream.on('error', function (err) {
    console.log(err.stack);
});
readerStream.on('error', function () {
    console.log(err.stack);
});

