class X {
    path() {
        return this
    }

    exec() {
        return
    }
}

const x = new X()

const a = x.path()

const f = x.path().exec()