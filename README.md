Basic Wandbox API Wrapper
# Install
npm i wandboxjs

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
