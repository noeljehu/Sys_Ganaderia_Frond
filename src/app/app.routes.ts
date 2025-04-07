import { Routes } from '@angular/router';
import { DashboardComponent } from './Componente/Dashboard/dashboard/dashboard.component';
import { UsuarioFormComponent } from './Componente/Formulario/usuario-form/usuario-form.component';
import { ClienteFormComponent } from './Componente/Formulario/cliente-form/cliente-form.component';
import { ProveedorFormComponent } from './Componente/Formulario/proveedor-form/proveedor-form.component';
import { EstabloFormComponent } from './Componente/Formulario/establo-form/establo-form.component';
import { CorralFormComponent } from './Componente/Formulario/corral-form/corral-form.component';
import { GanadoFormComponent } from './Componente/Formulario/ganado-form/ganado-form.component';
import { HistorialClinicoFormComponent } from './Componente/Formulario/historial-clinico-form/historial-clinico-form.component';
import { AlimentoFormComponent } from './Componente/Formulario/alimento-form/alimento-form.component';
import { RegistroAlimentoFormComponent } from './Componente/Formulario/registro-alimento-form/registro-alimento-form.component';
import { MedicinaFormComponent } from './Componente/Formulario/medicina-form/medicina-form.component';
import { RegistroMedicinaFormComponent } from './Componente/Formulario/registro-medicina-form/registro-medicina-form.component';
import { VentaFormComponent } from './Componente/Formulario/venta-form/venta-form.component';
import { LoginComponent } from './Componente/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege el acceso a todo el dashboard
    children: [
      { path: 'inicio', component: UsuarioFormComponent, canActivate: [AuthGuard] },
      { path: 'usuario', component: UsuarioFormComponent, canActivate: [AuthGuard] },
      { path: 'cliente', component: ClienteFormComponent, canActivate: [AuthGuard] },
      { path: 'proveedor', component: ProveedorFormComponent, canActivate: [AuthGuard] },
      { path: 'establo', component: EstabloFormComponent, canActivate: [AuthGuard] },
      { path: 'corral', component: CorralFormComponent, canActivate: [AuthGuard] },
      { path: 'ganado', component: GanadoFormComponent, canActivate: [AuthGuard] },
      { path: 'historial-clinico', component: HistorialClinicoFormComponent, canActivate: [AuthGuard] },
      { path: 'alimento', component: AlimentoFormComponent, canActivate: [AuthGuard] },
      { path: 'registro-alimento', component: RegistroAlimentoFormComponent, canActivate: [AuthGuard] },
      { path: 'medicina', component: MedicinaFormComponent, canActivate: [AuthGuard] },
      { path: 'registro-medicina', component: RegistroMedicinaFormComponent, canActivate: [AuthGuard] },
      { path: 'venta', component: VentaFormComponent, canActivate: [AuthGuard] }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
  { path: '**', redirectTo: '/login' } // Rutas no existentes van al login
];
