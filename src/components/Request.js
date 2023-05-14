const NOTES_DB_NAME = "notes";
const NOTES_STORE_NAME = "notes_store";

// Відкриття бази даних
export function openNotesDatabase() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(NOTES_DB_NAME, 1);

        request.onerror = () => {
            reject(request.error);}

        request.onsuccess = () => {
            const db = request.result;
            resolve(db);
        };

        // срабатывает, если на клиенте нет базы данных
        request.onupgradeneeded = (event) => {
            // const db = event.target.result;
            const db = request.result;
            const store = db.createObjectStore(NOTES_STORE_NAME, {
                keyPath: "id",
                autoIncrement: true,
            });
            store.createIndex("date", "date", { unique: false });
            store.createIndex("time", "time", { unique: false });
            store.createIndex("text", "text", { unique: false });
        };
    });
}

// Додавання нової нотатки до бази даних
export async function addNote(note) {
    const db = await openNotesDatabase();
    const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
    const store = transaction.objectStore(NOTES_STORE_NAME);
    const request = store.add(note);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Отримання всіх нотаток з бази даних
export async function getAllNotes() {
    const db = await openNotesDatabase();
    const transaction = db.transaction(NOTES_STORE_NAME, "readonly");
    const store = transaction.objectStore(NOTES_STORE_NAME);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Оновлення існуючої нотатки в базі даних
export async function updateNote(note) {
    const db = await openNotesDatabase();
    const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
    const store = transaction.objectStore(NOTES_STORE_NAME);
    const request = store.put(note);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Видалення нотатки з бази даних
export async function deleteNote(noteId) {
    const db = await openNotesDatabase();
    const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
    const store = transaction.objectStore(NOTES_STORE_NAME);
    const request = store.delete(noteId);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
