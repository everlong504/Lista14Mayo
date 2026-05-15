


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
    constructor(valor, nombre) {
        this.valor = valor;
        this.nombre = nombre;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaDoblementeEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
    }

    ingresarAlInicio(valor, nombre) {
        const nuevoNodo = new Nodo(valor, nombre);
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

    /*     ingresarEnPosicion(valor, posicion) {
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
    
            const nuevoNodo = new Nodo(valor);
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
        } */

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

    generarCaja() {
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

    Sumatoria() {
        let suma = 0;
        let actual = this.cabeza;

        while (actual) {
            suma += actual.valor;
            actual = actual.siguiente;
        }

        alert("La sumatoria es de: " + suma);
    }
}

const cajas = [new Caja(), new Caja(), new Caja(), new Caja(), new Caja()];
const lista = new ListaDoblementeEnlazada();

function printCaja() {
    for (let i = 0; i < cajas.length; i++) {
        console.log('Caja' + i + ': ' + cajas[i].valor + ', ' + cajas[i].lleno);
    }
}

function addCaja() {
    cajas.push(new Caja());
}

function renderCajas() {
    // creat this element in html
    /*<div class="col">
                <div class="card">
                    <div class="card-body">



                        <!--tabla-->
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre Completo</th>
                                    <th scope="col">Lleno</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ALEJANDRO RAMIREZ</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>*/
    const contenedor = document.getElementById("cajascontainer");
    contenedor.innerHTML = "";

    cajas.forEach((caja, index) => {

        //if full, become red, if empty, green
        const div = document.createElement("div");
        div.classList.add("col");

        const card = document.createElement("div");
        card.classList.add("card");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.style.backgroundColor = caja.lleno ? "lightcoral" : "lightgreen";

        const table = document.createElement("table");
        table.classList.add("table");

        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.setAttribute("scope", "col");
        th1.textContent = "#";
        const th2 = document.createElement("th");
        th2.setAttribute("scope", "col");
        th2.textContent = "Valor";
        const th3 = document.createElement("th");
        th3.setAttribute("scope", "col");
        th3.textContent = "Lleno";

        //button to empty and fill the box
        th4 = document.createElement("th");
        th4.setAttribute("scope", "col");
        th4.textContent = "Acciones";

        trHead.appendChild(th1);
        trHead.appendChild(th2);
        trHead.appendChild(th3);
        trHead.appendChild(th4);
        thead.appendChild(trHead);

        const tbody = document.createElement("tbody");

        const trBody = document.createElement("tr");
        const thRow = document.createElement("th");
        thRow.setAttribute("scope", "row");
        thRow.textContent = index + 1;
        const tdValor = document.createElement("td");
        tdValor.textContent = caja.valor !== null ? caja.valor.valor : "Vacío";
        const tdLleno = document.createElement("td");
        tdLleno.textContent = caja.lleno ? "Sí" : "No";


        const tdAcciones = document.createElement("td");
        const btnToggle = document.createElement("button");
        btnToggle.classList.add("btn", "btn-primary", "me-2");
        btnToggle.textContent = caja.lleno ? "Vaciar" : "Llamar";
        btnToggle.style.width = "80px";
        btnToggle.addEventListener("click", () => {
            if (caja.lleno && caja.valor) {
                caja.vaciar();
                renderCajas();
            } else if (!caja.lleno && lista.cabeza !== null) {
                caja.llenar(lista.cabeza);
                lista.quitarAlInicio();
                renderCajas();
            }
        });

        tdAcciones.appendChild(btnToggle);

        trBody.appendChild(thRow);
        trBody.appendChild(tdValor);
        trBody.appendChild(tdLleno);
        trBody.appendChild(tdAcciones);
        tbody.appendChild(trBody);
        table.appendChild(thead);
        table.appendChild(tbody);

        cardBody.appendChild(table);
        card.appendChild(cardBody);
        div.appendChild(card);
        contenedor.appendChild(div);
    });
}
