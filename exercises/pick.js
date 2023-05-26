const obj = {
    a: "1",
    b: 2,
    c: 3,
    d: "4",
}

let picked  = ( ({a, b, c, d}) => ({a, c}) )(obj);
let picked2 = ( ({a, c })      => ({a, c}) )(obj);
console.log(picked);
console.log(picked2);