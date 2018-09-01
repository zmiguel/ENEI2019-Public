import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';


export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];
