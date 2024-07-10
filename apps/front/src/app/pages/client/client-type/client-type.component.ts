import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ClientType } from '../../../_models/clientType.module';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { ClientTypeService } from '../../../_services/clientType.service';



@Component({
  selector: 'app-client-type',
  templateUrl: './client-type.component.html',
  styleUrl: './client-type.component.css',
  standalone:true,
  imports:[DropdownModule]
   
})
export class ClientTypeComponent implements OnInit{
  
  clientTypes=[{}];
  selectedClientType: ClientType | null = null;
  constructor
  (
    private clientTypeService: ClientTypeService,
    private primengConfig: PrimeNGConfig
  ) 
  {
        
    this.loadAllClientTypes();
      
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true; // Enable Ripple effect globally
    this.loadAllClientTypes();
  }  
  loadAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe(clientTypes => {
      this.clientTypes = clientTypes;
    });
  }
}
