import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ClientType } from '../../../_models/clientType.module';
import { ClientTypeService } from '../../../_services/clientType.service';

import { FormsModule, NgForm } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-client-type',
  templateUrl: './client-type.component.html',
  styleUrl: './client-type.component.css',
  standalone:true,
  imports:[DropdownModule,FormsModule ],
   
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
