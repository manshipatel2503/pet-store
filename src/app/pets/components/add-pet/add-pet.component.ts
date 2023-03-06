import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { v4 as uuid } from 'uuid';
import { STATUSES } from 'src/constant';
import { PetService } from '../../services/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {

  @ViewChild('chipList') chipList: any;

  petForm!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  statuses = STATUSES;
  constructor(private formBuilder: FormBuilder,
    private petService: PetService,
    private router: Router) {}

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      photoUrls: this.formBuilder.array([this.formBuilder.control('')]),
      tags: this.formBuilder.array([this.formBuilder.control('')]),
      status:['', Validators.required]
    });
  }
  addPhotoUrl(): void {
    this.getPhotoUrls().push(this.formBuilder.control(''));
  }

  removePhotoUrl(index: number): void {
    this.getPhotoUrls().removeAt(index);
  }

  getTagUrl(){
    return this.petForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.getTagUrl().push(this.formBuilder.control(''));
  }

  removeTag(index : number): void{
    this.getTagUrl().removeAt(index);
  }

  getPhotoUrls(){
    return this.petForm.get('photoUrls') as FormArray;
  }

  onSubmit(): void {
    
    if (this.petForm.valid) {
      // Do something with the form data
     const pet =  this.petMapper(this.petForm.value);
    this.petService.addPets(pet).subscribe((res) =>{
      this.router.navigateByUrl('');
    })
    }
  }

  petMapper(obj : any){
    let pet = {...obj, id: Math.random(), category : {id: 1, name : obj.category},  tags: obj.tags.map((t : string, i: number) => {return {id: i+1, name: t}})};
    return pet;
  }
}
