import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private id_user: number = 0;

    constructor() { }

    setUser(id: number) {
        this.id_user = id;
    }

    getUser(): number {
        return this.id_user;
    }


}

