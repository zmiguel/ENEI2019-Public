import {Routes} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users/usersList/usersList.component';
import { UserComponent } from './users/user/user.component';
import { Component } from '@angular/core';
import { EditComponent } from './users/edit/edit.component';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { AdminComponent } from './admin/admin.component';




export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'user/:id',
        component: UserComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'user/edit/:id',
        component: EditComponent,
        canDeactivate: [PreventUnsavedChanges],

    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            roles: ['Admin']
        }
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: {
                roles: ['Admin']
            }
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
