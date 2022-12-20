import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }, {
    path: 'home',
    loadChildren: () => import('./home/feature/home.module').then((m) => m.HomePageModule),
  }, {
    path: 'about',
    loadChildren: () => import('./about/features/about-shell/about-page.module').then((m) => m.AboutPageModule)
  }, {
    path: 'auth',
    loadChildren: () => import('./auth/feature/auth-shell/auth-shell.module').then((m) => m.AuthShellModule)
  }, {
    path: 'blog',
    loadChildren: () => import('./blog/features/blog-shell/blog-shell.module').then((m) => m.BlogShellModule)
  }, {
    path: 'category',
    loadChildren: () => import('./category/features/category-shell/category-shell.module').then((m) => m.CategoryShellModule)
  }, {
    path: 'contact',
    loadChildren: () => import('./contact/features/contact-shell/contact.module').then((m) => m.ContactPageModule)
  }, {
    path: 'gallery',
    loadChildren: () => import('./gallery/feature/gallery-shell/gallery-shell.module').then((m) => m.GalleryShellModule)
  }, {
    path: 'picture',
    loadChildren: () => import('./picture/features/picture-shell/picture-shell.module').then((m) => m.PictureShellModule)
  }, {
    path: 'shop',
    loadChildren: () => import('./shop/features/shop-shell/shop-page.module').then((m) => m.ShopPageModule)
  }, {
    path: 'not-found',
    loadChildren: () => import('./shared/ui/not-found/not-found.module').then((m) => m.NotFoundPageModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
