const fetch = require("node-fetch")

const compiler = async(lang, code) => {
	const langs = {
		cpp: {
			"compiler": "gcc-10.1.0",
			"options": "warning,boost-1.73.0-gcc-head,gnu++2b,cpp-no-pedantic"
		},
		c: {
			"compiler": "gcc-10.1.0-c",
			"options": "warning,gnu11,cpp-no-pedantic"
		},
		csharp: {
			"compiler": "mono-5.8.0.108",
			"options": ""
		},
		coffeescript: {
			"compiler": "coffeescript-1.12.7",
			"options": ""
		},
		crystal: {
			"compiler": "crystal-1.0.0",
			"options": ""
		},
		d: {
			"compiler": "dmd-2.076.0",
			"options": ""
		},
		elixir: {
			"compiler": "elixir-1.7.1",
			"options": ""
		},
		erlang: {
			"compiler": "erlang-21.2",
			"options": ""
		},
		fsharp: {
			"compiler": "fsharp-4.1.34",
			"options": ""
		},
		go: {
			"compiler": "go-1.14.2",
			"options": ""
		},
		groovy: {
			"compiler": "groovy-3.0.7",
			"options": ""
		},
		haskell: {
			"compiler": "ghc-8.4.2",
			"options": "haskell-warning"
		},
		java: {
			"compiler": "openjdk-jdk-11+28",
			"options": ""
		},
		javascript: {
			"compiler": "nodejs-14.0.0",
			"options": ""
		},
		julia: {
			"compiler": "julia-1.6.0",
			"options": ""
		},
		lazyk: {
			"compiler": "lazyk",
			"options": ""
		},
		lisp: {
			"compiler": "clisp-2.49",
			"options": ""
		},
		lua: {
			"compiler": "lua-5.4.0",
			"options": ""
		},
		nim: {
			"compiler": "nim-1.4.4",
			"options": ""
		},
		ocaml: {
			"compiler": "ocaml-4.06.1",
			"options": ""
		},
		openssl: {
			"compiler": "openssl-1.1.0f",
			"options": ""
		},
		php: {
			"compiler": "php-7.3.3",
			"options": ""
		},
        pascal: {
            "compiler": "fpc-3.0.2",
            "options": ""
        },
        perl: {
            "compiler": "perl-5.32.0",
            "options": ""
        },
        pony: {
            "compiler": "pony-0.14.0",
            "options": ""
        },
        pony: {
            "compiler": "pony-0.14.0",
            "options": ""
        },
        python: {
            "compiler": "cpython-3.8.0",
            "options": ""
        },
        r: {
            "compiler": "r-3.5.1",
            "options": ""
        },
        rill: {
            "compiler": "rill-head",
            "options": ""
        },
        ruby: {
            "compiler": "ruby-3.0.0",
            "options": ""
        },
        rust: {
            "compiler": "rust-1.18.0",
            "options": ""
        },
        sqlite: {
            "compiler": "sqlite-3.19.3",
            "options": ""
        },
        scala: {
            "compiler": "scala-2.12.2",
            "options": ""
        },
        swift: {
            "compiler": "swift-5.0.1",
            "options": ""
        },
        typescript: {
            "compiler": "typescript-3.9.5",
            "options": ""
        },
        vimscript: {
            "compiler": "vim-8.0.0671",
            "options": ""
        },
	bash: {
	    "compiler": "bash",
	    "options": ""
	}
	}
	
	const body = {
		"compiler": langs[lang].compiler,
		"code": code,
		"codes": [],
		"stdin": "",
		"options": langs[lang].options,
		"compiler-option-raw": "",
		"runtime-option-raw": ""
	}
	
	const res = await fetch("https://wandbox.org/compile", {
	  "headers": {
		"accept": "text/event-stream",
		"accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
		"cache-control": "no-cache",
		"content-type": "application/json",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin",
		"sec-gpc": "1",
		"x-requested-with": "XMLHttpRequest"
	  },
	  "referrer": "https://wandbox.org/",
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": JSON.stringify(body),
	  "method": "POST",
	  "mode": "cors"
	})
	
	let compiled = await res.text()
	let splitted = compiled.split("\n")
	const bitis = splitted.findIndex(i => i.includes("data: ExitCode"))
	let sonuc = splitted.slice(5, bitis-4).filter(i => (!i.includes("\r"))).join("\n").replace(/(data: |data:|StdOut:|StdErr:|\\n)/g, "").split("\n").filter(i => i !== "" && i !== "\r").join("\n")
    console.log(sonuc)
}

module.exports = compiler;
