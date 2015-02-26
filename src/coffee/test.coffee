class User
    constructor: (@name) ->
    hello: -> console.log "hello, #{@name}"

tom = new User "hoge"
tom.hello()
