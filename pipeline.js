const double = (n) => n * 2;
const increment = (n) => n + 1;

// without pipeline operator
double(increment(double(double(5)))); // 42

// with pipeline operator
5 |> double |> double |> increment |> double; // 42

// pipeline helper function
function pipeline (n, ...args) {
  if (args.length > 0) {
    for (let arg of args) {
      n = arg(n);
    }
    
    return n;
  }
  else {
    return;
  }
}

// piping the same value

pipeline(
5,
double,
double,
increment,
double
); // 42
