import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { TweedlesComponent } from './tweedles/tweedles.component';
import { AboutComponent } from './about/about.component';
import { TweedleChartComponent } from './tweedle-chart/tweedle-chart.component';



export const router:Routes = [
    {path:'', redirectTo:'about', pathMatch:'full'},
    {path:'about', component:AboutComponent},
    {path:'home', component:FacebookLoginComponent},
    {path:'tweedle', component:TweedleChartComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);