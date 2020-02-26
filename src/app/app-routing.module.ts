import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Core
import { NotfoundComponent } from './core/notfound/notfound.component';
import { AboutComponent } from './core/about/about.component';
import { VisualsComponent } from './core/visuals/visuals.component';
import { AppsOverviewComponent } from './core/apps/apps-overview/apps-overview.component';



const appRoutes: Routes = [
  // { path: 'map/:map', component: MapComponent, data: {title: 'Map'}},
  // { path: 'post/:post', component: PostComponent, data: {title: 'Post'}},
  // { path: 'posts/category/:category', component: HomeComponent, data: {title: 'Posts'}},
  // { path: 'posts', component: HomeComponent ,data: {title: 'Posts'}},
  { 
    path: 'visuals', 
    component: VisualsComponent, 
    data: {title: 'Visuals'},
    children: [
    ]
  },
  { path: 'apps', component: AppsOverviewComponent, data: {title: 'Apps'}},
  { path: 'about', component: AboutComponent, data: {title: 'About'}},
  { path: '', redirectTo: '/about', pathMatch: 'full'},
  { path: '**', component: NotfoundComponent, data: {title: 'Not Found'}}
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
