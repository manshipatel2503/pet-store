import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPetComponent } from './pets/components/add-pet/add-pet.component';
import { PetListComponent } from './pets/components/pet-list/pet-list.component';

const routes: Routes = [
  {path:'', component: PetListComponent},
  {path: 'add-pet', component: AddPetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
