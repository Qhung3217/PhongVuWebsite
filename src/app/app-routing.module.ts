import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./main/public-pages/public-pages.module').then(
        (m) => m.PublicPagesModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./main/user-pages/user-pages.module').then(
        (m) => m.UserPagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
