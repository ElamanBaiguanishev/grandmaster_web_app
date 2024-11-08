// Переписать на классы, с наследованием базовго класса с 3 методами как ниже, а потом уже его расшаривать под нужды

// import { toast } from "react-toastify";

export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem('token');

    // toast.success(data)

    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Error parsing token from local storage:', error);
        }
    }

    return '';
}

export function setTokenToLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token));
}

export function removeTokenFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}

export function setYearToLocalStorage(year: string) {
    localStorage.setItem('year', JSON.stringify(year));
}

export function removeYearFromLocalStorage(): void {
    localStorage.removeItem('year');
}

export function getYearFromLocalStorage(): string {
    const data = localStorage.getItem('year');

    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Error parsing year from local storage:', error);
        }
    }

    return '';
}