// LocalStorage'dan veriyi yükleme
export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("reduxState");
        if (!serializedState) return;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not retrieve data from LocalStorage:", e);
        return undefined;
    }
};

// LocalStorage'a veriyi kaydetme
export const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("reduxState", serializedState);
    } catch (e) {
        console.warn("Data could not be saved to LocalStorage:", e);
    }
};
