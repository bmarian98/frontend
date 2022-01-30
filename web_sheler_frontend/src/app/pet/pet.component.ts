import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../classes/pet/Pet';
import { Shelter } from '../classes/shelter/shelter';
import { PetService } from '../servicies/pet/pet.service';
import { ShelterService } from '../servicies/shelter/shelter.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  public pets: Pet[] = [];
  public addPet: Pet = new Pet();
  public editPet: Pet | undefined;
  public infoPet: Pet | undefined;
  public deletePet: Pet | undefined;
  public shelters: Shelter[] = [];


  constructor(private petService: PetService, private shelterService: ShelterService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.getPets(Number(this.route.snapshot.paramMap.get('id')));
    this.initializeShelters();
  }

  onOptionsSelected(value:string){
    console.log("the selected value is " + value);
}

  public initializeShelters() : void{
    this.shelterService.getShelters().subscribe(
      (response: Shelter[]) =>{
        this.shelters = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message + " this is the error!");
      }
    )
  }

  public getPets(id: number): void{
    this.petService.getPets(id).subscribe(
      (response: Pet[]) =>{
        this.pets = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message + " this is the error!");
      }
    )
  }

  public onAddPet(addForm: NgForm): void{

    var a;
    if((a = document.getElementById('add-pet-form')) !== null){

      a.click();
      this.petService.addPet(addForm.value).subscribe(
        (response: Pet) => {
          console.log(response);
          this.getPets(Number(this.route.snapshot.paramMap.get('id')));
          addForm.reset();
        },
        (error: HttpErrorResponse) =>{
          alert(error);
          //addForm.reset();
        }
      );
    }
  }

  public onUpdatePet(pet: Pet): void {
    this.petService.updatePet(pet).subscribe(
      (response: Pet) => {
        console.log(response);
        this.getPets(Number(this.route.snapshot.paramMap.get('id')));
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePet(petId: number | undefined): void {
    if(petId !== undefined)
      this.petService.deletePet(petId).subscribe(
        (response: void) => {
          console.log(response);
          this.getPets(Number(this.route.snapshot.paramMap.get('id')));
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onOpenModal(pet: Pet | null, mode: string) : void{
    const container = document.getElementById('main-container');
    console.log("container:" + container);
    console.log("container:" + pet);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');

    if(mode === 'add'){
      btn.setAttribute('data-target', '#addPetModal');
    }

    if(mode === 'edit'){

      if(pet){
        this.editPet = pet;
      }

      btn.setAttribute('data-target', '#editPetModal');
    }

    if(mode === 'info'){
      if(pet){
        this.infoPet = pet;
      }
      btn.setAttribute('data-target', '#infoPetModal');
    }

    if(mode === 'delete'){
      if(pet){
        this.deletePet = pet;
      }
      btn.setAttribute('data-target', '#deletePetModal');
    }

    if(container !== null)
      container.appendChild(btn);

    btn.click();
  }

}
