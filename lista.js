

//class caja
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

//clase NODO
class Nodo {
    constructor(valor, nombre) {
        this.valor = valor;
        this.nombre = nombre;
        this.siguiente = null;
        this.anterior = null;
    }
}

//class lista
class ListaDoblementeEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
    }

    ingresarAlInicio(valor, nombre) {

        if(this.verificarId(valor)){
            document.getElementById('mensaje').textContent = "El ID ya existe.";
            return;
        }

        const nuevoNodo = new Nodo(valor, nombre);

        if (!this.cabeza) {
            this.cabeza = this.cola = nuevoNodo;
        } else {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevoNodo;
            this.cabeza = nuevoNodo;
        }
        this.imprimirLista();
    }

    ingresarAlFinal(valor, nombre) {
        const nuevoNodo = new Nodo(valor, nombre);
        if (!this.cola) {
            this.cabeza = this.cola = nuevoNodo;
        } else {
            nuevoNodo.anterior = this.cola;
            this.cola.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }
        this.imprimirLista();
    }

    ingresarEnPosicion(valor, nombre, posicion) {
        const nuevoNodo = new Nodo(valor, nombre);
        if (posicion === 0) {
            this.ingresarAlInicio(valor, nombre);
            return;
        }

        let actual = this.cabeza;
        for (let i = 0; i < posicion - 1 && actual; i++) {
            actual = actual.siguiente;
        }

        if (!actual) {
            this.ingresarAlFinal(valor, nombre);
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

        this.imprimirLista();
    }

    verificarId(valor){
        let actual = this.cabeza;
        while(actual !== null){
            if(actual.valor === valor){
                return true;
            }
            actual = actual.siguiente;
        }

        return false;

    }

    quitarAlInicio() {
        if (!this.cabeza) return;

        this.cabeza = this.cabeza.siguiente;

        if (this.cabeza) {
            this.cabeza.anterior = null;
        } else {
            this.cola = null;
        }

        this.imprimirLista();
    }

    quitarAlFinal() {
        if (!this.cola) return;

        this.cola = this.cola.anterior;

        if (this.cola) {
            this.cola.siguiente = null;
        } else {
            this.cabeza = null;
        }

        this.imprimirLista();
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

    imprimirLista() {
    const tbody = document.getElementById("lista-tbody");
    tbody.innerHTML = "";
        let actual = this.cabeza;
        let contador = 1;
        const values = [];
        while (actual) {
            const fila = document.createElement("tr");
            
            if(contador ===1){
                fila.classList.add("table-success");
            }

            fila.innerHTML = `

            <th scope="row">${actual.valor}</th>
                <td>${actual.nombre}</td>
                `;
            tbody.appendChild(fila);
            actual = actual.siguiente;
            contador++;
        }
        
        document.getElementById('mensaje').textContent = " ";


    }

    mostrarValEspecifico(indice) {
        let actual = this.cabeza;
        for (let i = 0; i <= indice; i++) {
            if (i === indice) {
                console.log(actual);
            }
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

}

const cajas = [new Caja(), new Caja(), new Caja(), new Caja(), new Caja()];
const lista = new ListaDoblementeEnlazada();

function printCaja() {
    for (let i = 0; i < cajas.length; i++) {
        console.log('Caja' + i + ': ' + cajas[i].valor + ', ' + cajas[i].lleno);
    }
}

function generarCaja(id, nombre) {
    // Crear el contenedor de la columna
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 mb-3'; // Ajusta el tamaño según necesites, col-md-4 para mini

    // Crear la card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    // Crear el card-body
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    // Crear la tabla
    const table = document.createElement('table');
    table.className = 'table';

    // Crear el thead
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.scope = 'col';
    th1.textContent = '#';
    const th2 = document.createElement('th');
    th2.scope = 'col';
    th2.textContent = 'Nombre Completo';
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    thead.appendChild(headerRow);

    // Crear el tbody
    const tbody = document.createElement('tbody');
    const bodyRow = document.createElement('tr');
    const thRow = document.createElement('th');
    thRow.scope = 'row';
    thRow.textContent = id;
    const td = document.createElement('td');
    td.textContent = nombre;
    bodyRow.appendChild(thRow);
    bodyRow.appendChild(td);
    tbody.appendChild(bodyRow);

    // Ensamblar la tabla
    table.appendChild(thead);
    table.appendChild(tbody);

    // Ensamblar la card
    cardBodyDiv.appendChild(table);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

function addCaja() {
    cajas.push(new Caja());
}


