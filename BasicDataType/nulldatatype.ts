// With strictNullChecks set to true
let a: null = null; // Ok
let b: undefined = null; // Error
let c: number = null; // Error
let d: void = null; // Error
 
// With strictNullChecks set to false
let a: null = null; // Ok
let b: undefined = null; // Ok
let c: number = null; // Ok
let d: void = null; // Ok