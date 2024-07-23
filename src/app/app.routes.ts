import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EpicComponent } from './pages/epic/epic.component';

export const routes: Routes = [
    {
    path: 'login',
    component: LoginComponent,
    },

    {
        path: 'epic',
        component: EpicComponent,
    }
];
