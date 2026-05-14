class Caja {
    constructor(valor = null, lleno = false) {
        this.valor = valor;
        this.lleno = lleno;
    }

    toggle() {
        this.lleno = !this.lleno;
    }

    llenar(val) {
        if (this.lleno) {
            alert("La caja ya está llena");
            return;
        }
        this.valor = val;
        this.toggle();
    }

    vaciar() {
        if (!this.lleno) {
            alert("La caja ya está vacía");
            return;
        }
        this.valor = null;
        this.toggle();
    }

}

class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaDoblementeEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
    }

    /* 
   
- CantidadElementos()
- SumarElementos()
    */

    ingresarAlInicio(valor) {
        const nuevoNodo = new Nodo(valor);
        if (!this.cabeza) {
            this.cabeza = this.cola = nuevoNodo;
        } else {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevoNodo;
            this.cabeza = nuevoNodo;
        }
        this.imprimir();
    }

    ingresarAlFinal(valor) {
        const nuevoNodo = new Nodo(valor);
        if (!this.cola) {
            this.cabeza = this.cola = nuevoNodo;
        } else {
            nuevoNodo.anterior = this.cola;
            this.cola.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }
        this.imprimir();
    }

    ingresarEnPosicion(valor, posicion) {
        const nuevoNodo = new Nodo(valor);
        if (posicion === 0) {
            this.ingresarAlInicio(valor);
            return;
        }
        let actual = this.cabeza;
        for (let i = 0; i < posicion - 1 && actual; i++) {
            actual = actual.siguiente;
        }
        if (!actual) {
            this.ingresarAlFinal(valor);
            return;
        }
        nuevoNodo.siguiente = actual.siguiente;
        nuevoNodo.anterior = actual;
        if (actual.siguiente) {
            actual.siguiente.anterior = nuevoNodo;
        }
        actual.siguiente = nuevoNodo;
        if (!nuevoNodo.siguiente) {
            this.cola = nuevoNodo;
        }
        this.imprimir();
    }

    quitarAlInicio() {
        if (!this.cabeza) return;
        this.cabeza = this.cabeza.siguiente;
        if (this.cabeza) {
            this.cabeza.anterior = null;
        } else {
            this.cola = null;
        }
        this.imprimir();
    }

    quitarAlFinal() {
        if (!this.cola) return;
        this.cola = this.cola.anterior;
        if (this.cola) {
            this.cola.siguiente = null;
        } else {
            this.cabeza = null;
        }
        this.imprimir();
    }

    imprimir() {
        const listaElementos = document.getElementById("lista");
        listaElementos.innerHTML = "";
        let actual = this.cabeza;
        while (actual) {
            const li = document.createElement("li");
            li.textContent = actual.valor;
            li.classList.add("list-group-item");
            listaElementos.appendChild(li);
            actual = actual.siguiente;
        }
    }

    mostrarValEspecifico(indice) {
        let actual = this.cabeza;
        for (let i = 0; i <= indice; i++) {
            if (i == indice)
                console.log(actual);
            actual = actual.siguiente;
        }
    }

    cantidadElementos() {
        let actual = this.cabeza;
        let contador = 0;
        while (actual !== null) {
            contador++;
            actual = actual.siguiente;
        }
        return alert("Hay " + contador + " en la lista");
    }

    Sumatoria() {


        const listaElementos = document.getElementById("datos");
        let suma = 0;
        let actual = this.cabeza;
        while (actual) {
            suma += actual.valor;
            actual = actual.siguiente;
        }

        alert("La sumatoria es de: " + suma);
    }

}

const cajas = [new Caja, new Caja, new Caja, new Caja, new Caja];

const lista = new ListaDoblementeEnlazada();

function printCaja() {
    for (let i = 0; i < cajas.length; i++) {
        console.log('Caja' + i + ': ' + cajas[i].valor + ', ' + cajas[i].lleno)
    }
}

function addCaja() {
    cajas.push(new Caja);
}