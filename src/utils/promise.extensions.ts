export function timer(timeout: number){
    return new Promise((resolve, reject) => setTimeout(() => resolve(), timeout));
};