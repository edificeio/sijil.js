export let fr = {
    "simple.string": "Un simple test",
    "simple.object.parameter": "Un paramètre nommé {{param}}",
    "simple.array.parameter": "Un paramètre nommé {{0}}"
}

export let en = {
    "simple.string": "A simple test",
    "simple.object.parameter": "A parameter named {{param}}",
    "simple.array.parameter": "A parameter named {{0}}",
    
    "true.false.object.check1": "{{ check ? it's true : it's false }}",
    "true.false.object.check2": "it's {{check? true : false }}",
    "true.false.object.check3": "{{check?it's $true:it's $false}}",

    "true.false.array.check1": "{{ 0 ? it's true : it's false }}",
    "true.false.array.check2": "it's {{0 ? true : false }}",
    "true.false.array.check3": "{{0?it's $1:it's $2}}",

    "gt.object.check": "{{ check > check2 ? it's true : it's false }}",
    "gt.array.check": "{{ $0 > $1 ? it's true : it's false }}",

    "gte.object.check": "{{ check >= check2 ? it's true : it's false }}",
    "gte.array.check": "{{ $0 >= $1 ? it's true : it's false }}",

    "lt.object.check": "{{ check < check2 ? it's true : it's false }}",
    "lt.array.check": "{{ $0 < $1 ? it's true : it's false }}",

    "lte.object.check": "{{ check <= check2 ? it's true : it's false }}",
    "lte.array.check": "{{ $0 <= $1 ? it's true : it's false }}",
    
    "eq.object.check": "{{ check == check2 ? it's true : it's false }}",
    "eq.array.check": "{{ $0 == $1 ? it's true : it's false }}",
    "eq.array.check2": "{{ 0 == $1 ? it's true : it's false }}"
}