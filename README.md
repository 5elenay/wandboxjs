Basic Wandbox API Wrapper

# Example
```js
const compiler = require("wandboxjs");

compiler("go", `
package main
import "fmt"

func main() {
    fmt.Println("go.")
}
`)
// -> go.
```