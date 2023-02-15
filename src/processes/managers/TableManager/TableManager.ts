import React from 'react'

interface Column<T extends object = object> { Header: React.FC<{}>, Cell: React.FC<{ origin: T }>, key: keyof T }

class TableManager<T extends object = object> {
   public headers: {
        key:string,
        Cell: React.FC<{}>;
    }[]
    public rows: {key:string,
        cells: ({
            Cell: React.FC<{}>,
            key:string
        } )[]
    }[]

    constructor( data: T[] | undefined = [], columns: Column<T>[],){
       this.headers = columns.map(origin => {
            return {
                key: `column-${origin.key.toString()}`,
                Cell: () => origin.Header({ origin: data }),
            }
        })

        this.rows = data.map((origin, index) => {
            const cells = Object.entries(origin).filter(([key]) => columns.find(column => column.key === key)).map(([key, value]) => {
                const column = columns.find(column => column.key === key)!

                return {
                    key: `${key}-${index}`,
                    Cell:  () => column.Cell({ origin }),
               
                }
             
            })
            return {
                key: `row-${index}`,
                cells
            }
        })
    }
}

export type { Column }
export { TableManager }