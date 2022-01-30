import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Shelter } from '../classes/shelter/shelter';
import { ShelterService } from '../servicies/shelter/shelter.service';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css']
})
export class ShelterComponent implements OnInit {

  public shelters: Shelter[] = [];
  public editShelter!: Shelter;
  public infoShelter!: Shelter ;
  public deleteShelter!: Shelter;


  constructor(private shelterService: ShelterService){ }

  ngOnInit(): void {
    this.getShelters();
  }

  public getShelters(): void{
    this.shelterService.getShelters().subscribe(
      (response: Shelter[]) =>{
        this.shelters = response;
      }
      ,
      (error: HttpErrorResponse) =>{
        alert(error.message + " this is the error!");
      }
    )
  }

  public onAddShelter(addForm: NgForm): void{

    var a;
    if((a = document.getElementById('add-shelter-form')) !== null){

      a.click();
      this.shelterService.addShelter(addForm.value).subscribe(
        (response: Shelter) => {
          console.log(response);
          this.getShelters();
          addForm.reset();
        },
        (error: HttpErrorResponse) =>{
          alert(error);
          addForm.reset();
        }
      );
    }
  }

  public onUpdateShelter(shelter: Shelter): void {
    this.shelterService.updateShelter(shelter).subscribe(
      (response: Shelter) => {
        console.log(response);
        this.getShelters();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteShelter(shelterId: number | undefined): void {
    if(shelterId !== undefined)
      this.shelterService.deleteShelter(shelterId).subscribe(
        (response: void) => {
          console.log(response);
          this.getShelters();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onOpenModal(shelter: Shelter | null, mode: string) : void{
    const container = document.getElementById('main-container');
    console.log("container:" + container);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');

    if(mode === 'add'){
      btn.setAttribute('data-target', '#addShelterModal');
    }

    if(mode === 'edit'){

      if(shelter){
        this.editShelter = shelter;
      }

      btn.setAttribute('data-target', '#editShelterModal');
    }

    if(mode === 'info'){
      if(shelter){
        this.infoShelter = shelter;
      }
      btn.setAttribute('data-target', '#infoShelterModal');
    }

    if(mode === 'delete'){
      if(shelter){
        this.deleteShelter = shelter;
      }
      btn.setAttribute('data-target', '#deleteShelterModal');
    }

    if(container !== null)
      container.appendChild(btn);

    btn.click();
  }

}
