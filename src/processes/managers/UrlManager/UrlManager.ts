class UrlManager {
    public url:string 
    constructor(url:string ) {
        this.url = url
    }

    protected slash(entity:string){
        this.url = `${this.url}/${entity}`

        return this
    }

    protected slashColon(entity:string){
        this.url = `${this.url}/:${entity}`

        return this
    }

    protected query<Q extends object = object>(queries: Q){
      const params = new URLSearchParams(this.url)

      for(const key in queries) {
        if(Object.hasOwn(queries, key)) {
            params.append(key, String(queries[key]))
        }
      }

      return params.toString()
    }
}

export { UrlManager }