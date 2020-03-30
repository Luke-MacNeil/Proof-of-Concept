import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks.module').then( m => m.TasksPageModule)
  },
  {
    path: 'tasks/create',
    loadChildren: () => import('./pages/tasks/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'tasks/view',
    loadChildren: () => import('./pages/tasks/view-task/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'tasks/manage',
    loadChildren: () => import('./pages/tasks/manage/manage.module').then( m => m.ManagePageModule)
  },
  {
    path: 'storage',
    loadChildren: () => import('./pages/storage/storage.module').then( m => m.StoragePageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'workers',
    loadChildren: () => import('./pages/workers/workers.module').then( m => m.WorkersPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
