export const getItem = (name: string) => {
    return JSON.parse(localStorage.getItem(name) || "")
}

export const setItem = (name: string, obj: Object) => {
    localStorage.setItem(name, JSON.stringify(obj));
}