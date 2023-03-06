import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { STATUSES } from 'src/constant';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit{

  petList$ : any;
  statuses = STATUSES;

  constructor(private petService: PetService){}

  ngOnInit(){
    this.getPetListByStatuses(STATUSES[0].key);  
  }

  getPetListByStatuses(status: string){
    this.petList$ = this.petService.getPetsByStatus(status);
  }
  statusChange(status:{label: string, key: string, selected: boolean}){
    this.statuses.forEach(s => status.selected = s.key === status.key );
    this.getPetListByStatuses(status.key);
  }

  replaceImage(event: any) {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFC23x3n9mW-RbGy93GI7LwJjCAFVhLaeOTg&usqp=CAU';
  }
}
