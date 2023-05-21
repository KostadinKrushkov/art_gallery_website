import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading, PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { PreloadingyByFlagStrategy } from './shared/data-access/custom-preloading-strategy';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }, {
    path: 'home',
    loadChildren: () => import('./home/feature/home.module').then(m => m.HomePageModule),
    data: { preload: true },
  }, {
    path: 'about',
    loadChildren: () => import('./about/features/about-shell/about-page.module').then(m => m.AboutPageModule),
    data: { preload: true },
  }, {
    path: 'auth',
    loadChildren: () => import('./auth/feature/auth-shell/auth-shell.module').then(m => m.AuthShellModule),
    data: { preload: false },
  }, {
    path: 'blog',
    loadChildren: () => import('./blog/features/blog-shell/blog-shell.module').then(m => m.BlogShellModule),
    data: { preload: true },
  }, {
    path: 'category',
    loadChildren: () => import('./category/features/category-shell/category-shell.module').then(m => m.CategoryShellModule),
    data: { preload: false },
  }, {
    path: 'contact',
    loadChildren: () => import('./contact/features/contact-shell/contact.module').then(m => m.ContactPageModule),
    data: { preload: true },
  }, {
    path: 'gallery',
    loadChildren: () => import('./gallery/feature/gallery-shell/gallery-shell.module').then(m => m.GalleryShellModule),
    data: { preload: true },
  }, {
    path: 'picture',
    loadChildren: () => import('./picture/features/picture-shell/picture-shell.module').then(m => m.PictureShellModule),
    data: { preload: false },
  }, {
    path: 'shop',
    loadChildren: () => import('./shop/features/shop-shell/shop-page.module').then(m => m.ShopPageModule),
    data: { preload: true },
  }, {
    path: 'not-found',
    loadChildren: () => import('./shared/ui/not-found/not-found.module').then(m => m.NotFoundPageModule),
    data: { preload: false },
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadingyByFlagStrategy }),
  ],
  exports: [RouterModule],
  providers: [
    { provide: PreloadingStrategy, useClass: PreloadingyByFlagStrategy }
  ]
})
export class AppRoutingModule { }
