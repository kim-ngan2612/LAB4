function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      console.log("Hello ");
      resolve();
    }, t);
  });
}
const sayHello = () => {
  delay(100).then((e) => console.log("binh"));
  console.log("something")
};

sayHello();
