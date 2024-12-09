import LinkedList from "./LinkedList.js";


export default class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.size = 0;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }
    set(key, value) {
        const index = this.hash(key);
        if (index < 0 || index > this.buckets.length) {
            throw new Error("Indice fora do limite do Array");
        }

        let currentNode = this.buckets[index];
        while (currentNode != null) {
            if (currentNode.key == key) {
                currentNode.value = value;
                return;
            }
            currentNode = currentNode.next
        }
        const newNode = Node(key,value);
        if(this.buckets[index] === null){
            this.buckets[index] = newNode
        }

    }

}

function Node(key, value) {
    return { key, value };
}