import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { MapComponent } from './map/map.component';
import { Pages } from './pages';


const post: string = 'assets/post/'; 
const appRoutes: Routes = [
  { path: 'map/:map', component: MapComponent },
  { path: 'post/:post', component: PostComponent },
  { path: 'posts/filter/:category', component: HomeComponent },
  { path: 'posts', component: HomeComponent },  
  { path: 'about', component: PageComponent, data: Pages.About },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
