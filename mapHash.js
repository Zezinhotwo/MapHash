class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.keysAmount = 0;
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null);
        this.keysAmount = 0;
    }
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return Math.abs(hashCode) % this.capacity;
    }
    resize() {
        this.capacity *= 2;
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
        for (let i = 0; i < oldBuckets.length; i++) {
            let current = oldBuckets[i];
            while (current) {
                this.set(current.key, current.value);
                current = current.next;
            }
        }
    }
    set(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = listNode(key, value);
        }
        else {
            let current = this.buckets[index];
            while (current) {
                if (current.key == key) {
                    current.value = value;
                    return;
                }
                if (!current.next) {
                    current.next = listNode(key, value);
                    break;
                }
                current = current.next;
            }
        }
        this.keysAmount++;
        this.size++;
        if (this.size > this.capacity * this.loadFactor) {
            this.resize();
        }
    }
    get(key) {
        const index = this.hash(key);
        let current = this.buckets[index];
        while (current) {
            if (current.key === key)
                return current.value;
            current = current.next;
        }
        return null;
    }
    remove(key) {
        const index = this.hash(key);
        let current = this.buckets[index];
        let prev = null;
        while (current) {
            if (current.key == key) {
                if (prev) {
                    prev.next = current.next;
                }
                else {
                    this.buckets[index] = current.next;
                }
                this.size--;
                this.keysAmount++;
                return true;
            }
            prev = current;
            current = current.next;
        }
        return false;
    }
    length() {
        return this.keysAmount;
    }
    clear() {
        this.size = 0;
        this.keysAmount = 0;
        this.buckets = new Array(this.capacity);
    }
    // CHAT GPT
    keys() {
        const keysArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while (current) { // Percorre a lista encadeada dentro do bucket
                keysArray.push(current.key); // Adiciona a chave ao array
                current = current.next; // Avança para o próximo nó
            }
        }
        return keysArray;
    }
    values() {
        const list = []; // Array para armazenar os valores
        for (const item of this.buckets) {
            let current = item; // Começa no primeiro nó do bucket
            while (current) {
                list.push(current.value); // Adiciona o valor à lista
                current = current.next; // Avança para o próximo nó
            }
        }
        return list; // Retorna o array com os valores
    }
    entries() {
        const list = []; // Array de pares [key, value]
        for (const item of this.buckets) {
            let current = item; // Começa no primeiro nó do bucket
            while (current) {
                list.push([current.key, current.value]); // Adiciona [key, value] à lista
                current = current.next; // Avança para o próximo nó
            }
        }
        return list; // Retorna o array de pares [key, value]
    }
}
function listNode(key, value) {
    return { key: key, value: value, next: null };
}
const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log("Valores:", test.values());
console.log("Entries:", test.entries());
console.log("Chaves:", test.keys());
test.remove("lion");
console.log("Após remover 'lion':");
console.log("Valores:", test.values());
console.log("Entries:", test.entries());
