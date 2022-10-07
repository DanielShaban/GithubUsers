// eslint-disable-next-line import/prefer-default-export
export function debounce(func:() => void, wait:number) {
  let timeout:number;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
