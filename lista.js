

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

        if (this.verificarId(valor)) {
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

    quitarEnPosicion(valor, nombre, posicion) {
        if (posicion === 0) {
            this.quitarAlInicio();
            return;
        } else if (posicion === this.cantidadElementos() - 1) {
            this.quitarAlFinal();
            return;
        }
        let actual = this.cabeza;
        for (let i = 0; i < posicion && actual; i++) {
            actual = actual.siguiente;
        }
        if (!actual) return;

        if (actual.anterior) {
            actual.anterior.siguiente = actual.siguiente;
        }
        if (actual.siguiente) {
            actual.siguiente.anterior = actual.anterior;
        }
        if (actual === this.cabeza) {
            this.cabeza = actual.siguiente;
        }
        if (actual === this.cola) {
            this.cola = actual.anterior;
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

    verificarId(valor) {
        let actual = this.cabeza;
        while (actual !== null) {
            if (actual.valor === valor) {
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

            if (contador === 1) {
                fila.classList.add("table-success");
            }

            fila.innerHTML = `

            <th scope="row">${actual.valor}</th>
                <td>${actual.nombre}</td>
                `;
            tbody.appendChild(fila);

            const eliminarBtn = document.createElement("button");
            eliminarBtn.classList.add("btn", "btn-danger", "btn-sm");
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.addEventListener("click", () => {
                if (contador === 1) {
                    this.quitarAlInicio();
                } else if (contador === this.cantidadElementos()) {
                    this.quitarAlFinal();
                } else {
                    this.quitarEnPosicion(contador - 1);
                }

                this.imprimirLista();
            });

            fila.appendChild(eliminarBtn);
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
        return contador;
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
    renderCajas();
}

function renderCajas() {
    const contenedor = document.getElementById("cajascontainer");
    contenedor.innerHTML = "";

    cajas.forEach((caja, index) => {
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
