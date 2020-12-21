//Utilidades
class Stack {
    constructor() {
        this.stack = [];
    }

    push(element) {
        this.stack.push(element);
        return this.stack;
    }

    pop() {
        return this.stack.pop();
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }

    size() {
        return this.stack.length;
    }

    print() {
        console.log(this.stack);
    }
}

var count = 0;

function filtro() {
    var idStruct = new Array();
    var cadena = document.getElementById('textarea').value;
    cadena = cadena.replaceAll("struct", "#");
    cadena = filtroIdStruct(cadena);
    cadena = filtroIdStructDecl(cadena);
    cadena = cadena.replaceAll("int", "%");
    cadena = cadena.replaceAll("float", "@");
    cadena = cadena.replaceAll(/[_a-zA-Z][_a-zA-Z0-9]*/g, "&");
    //Funciones
    function filtroIdStruct(cadena) {
        var coincidencias = new Array();
        var i = cadena.indexOf("#");
        while (i >= 0) {
            if (i >= 0) {
                coincidencias.push(i);
                i = cadena.indexOf("#", i + 1);
            }
        }
        for (var j = 0; j < coincidencias.length; j++) {
            var ids;
            var ini = coincidencias[j] + 1;
            var fin = ini + cadena.substring(ini).indexOf("{");
            ids = cadena.substring(ini, fin).replaceAll("\n", "");
            ids = ids.replaceAll("\t", "");
            ids = ids.replaceAll(" ", "");
            if (ids != "") {
                idStruct.push(ids);
            }
            cadena = cadena.substring(0, ini) + cadena.substring(ini, fin).replaceAll(/^[_a-zA-Z][_a-zA-Z0-9]*$/g, "!") + cadena.substring(fin, cadena.length);
            return cadena;
        }
        return cadena;
    }

    function filtroIdStructDecl(cadena) {
        if (idStruct.length > 0) {
            for (var i = 0; i < idStruct.length; i++) {
                cadena = cadena.replaceAll(idStruct[i], "!");
            }
        }
        return cadena;
    }
    cadena = cadena.replaceAll("\n", " ");
    cadena = cadena.replaceAll("\t", " ");
    cadena = cadena.replaceAll(" ", "");
    cadena += "$";
    return parserLL1(cadena);
}

function parserLL1(string) {
    //Atributos
    var cadena = new Array();
    var indice = 0;
    var token;
    var SD = [
        ['\0'],
        ['\0'],
        ['#'],
        ['%', '@', '!'],
        ['$'],
        ['!'],
        ['{'],
        ['!'],
        ['{'],
        ['!'],
        ['%', '@', '!'],
        ['}'],
        ['%', '@', '!'],
        ['%'],
        ['@'],
        ['!'],
        [','],
        [';'],
        ['&'],
        [';'],
        ['&'],
        [','],
        [';']
    ];
    var cadenaRechazada = false;

    function parser() {
        cadena = Array.from(string);
        scanner();
        return S();
    }

    function S() {
        E();
        if (token == '$' && cadenaRechazada == false) {
            reconoce();
            return true;
        } else {
            error();
            return false;
        }
    }

    function E() {
        if (inc(elToken(), 2)) {
            if (token == '#') {
                scanner();
                T();
                E();
            }
        } else if (inc(elToken(), 3)) {
            V();
            E();
        } else if (inc(elToken(), 4)) {
            //lambda
        } else {
            error();
        }
        count++;
        wait();
    }

    function T() {
        if (inc(elToken(), 5)) {
            O();
        } else if (inc(elToken(), 6)) {
            N();
        } else {
            error();
        }
        count++;
        wait();
    }

    function O() {
        D();
        if (token == '{') {
            scanner();
            C();
            if (token == '}') {
                scanner();
                P();
                if (token == ';') {
                    scanner();
                } else {
                    error();
                }
            } else {
                error();
            }
        } else {
            error();
        }
        count++;
        wait();
    }

    function N() {
        if (token == '{') {
            scanner();
            C();
            if (token == '}') {
                scanner();
                G();
                if (token == ';') {
                    scanner();
                } else {
                    error();
                }
            } else {
                error();
            }
        } else {
            error();
        }
        count++;
        wait();
    }

    function D() {
        if (token == '!') {
            scanner();
        } else {
            error();
        }
        count++;
        wait();
    }

    function C() {
        if (inc(elToken(), 10)) {
            V();
            C();
        } else if (inc(elToken(), 11)) {
            //lambda
        } else {
            error();
        }
        count++;
        wait();
    }

    function V() {
        Y();
        if (token == '&') {
            scanner();
            B();
            if (token == ';') {
                scanner();
            } else {
                error();
            }
        } else {
            error();
        }
        count++;
        wait();
    }

    function Y() {
        if (inc(elToken(), 13)) {
            if (token == '%') {
                scanner();
            } else {
                error();
            }
        } else if (inc(elToken(), 14)) {
            if (token == '@') {
                scanner();
            } else {
                error();
            }
        } else if (inc(elToken(), 15)) {
            D();
        } else {
            error();
        }
        count++;
        wait();
    }

    function B() {
        if (inc(elToken(), 16)) {
            if (token == ',') {
                scanner();
                if (token == '&') {
                    scanner();
                    B();
                } else {
                    error();
                }
            } else {
                error();
            }
        } else if (inc(elToken(), 17)) {
            //lambda
        } else {
            error();
        }
        count++;
        wait();
    }

    function P() {
        if (inc(elToken(), 18)) {
            if (elToken() == '&') {
                scanner();
                R();
            } else {
                error();
            }
        } else if (inc(elToken(), 19)) {
            //lambda
        } else {
            error();
        }
        count++;
        wait();
    }

    function G() {
        if (token == '&') {
            scanner();
            R();
        } else {
            error();
        }
        count++;
        wait();
    }

    function R() {
        if (inc(elToken(), 21)) {
            if (token == ',') {
                scanner();
                if (token == '&') {
                    scanner();
                    R();
                } else {
                    error();
                }
            } else {
                error();
            }
        } else if (inc(elToken(), 22)) {
            //lambda
        } else {
            error();
        }
        count++;
        wait();
    }


    function scanner() {
        token = cadena[indice];
        indice++;
    }

    function elToken() {
        return cadena[indice - 1];
    }

    function inc(token, regla) {
        for (var i = 0; i < SD[regla].length; i++) {
            if (token == SD[regla][i]) {
                return true;
            }
        }
        return false;
    }

    function reconoce() {
        cadenaRechazada = false;
    }

    function error() {
        cadenaRechazada = true;
    }

    function wait() {
        if (count < 1000) {
            setTimeout(parserLL1, 10);
        }
    }
    return parser();
}

function parser() {
    if (filtro()) {
        document.getElementById('resultadoafdp').innerHTML = "Análisis hecho con éxito";
        document.getElementById('resultadoafdp').style.color = "green";
    } else {
        document.getElementById('resultadoafdp').innerHTML = "Error sintáctico";
        document.getElementById('resultadoafdp').style.color = "red";
    }
}

let input = document.querySelector('input');
let textarea = document.querySelector('textarea');

input.addEventListener('change', () => {
    let files = input.files;

    if (files.length == 0) return;

    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
        textarea.value = e.target.result;
    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);

});


function limpiar() {
    document.getElementById('selector').value = null;
}
