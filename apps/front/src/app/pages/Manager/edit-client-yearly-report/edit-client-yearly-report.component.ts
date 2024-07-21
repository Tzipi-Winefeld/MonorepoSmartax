import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown'; // ייבוא של קומפוננטת ה-Dropdown
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-edit-client-yearly-report',
  standalone: true,
  imports: [CommonModule, TableModule, ToastModule, ButtonModule, ReactiveFormsModule, FormsModule,DialogModule,DropdownModule,InputTextModule],
  templateUrl: './edit-client-yearly-report.component.html',
  styleUrls: ['./edit-client-yearly-report.component.css'],
})
@Injectable({
  providedIn: 'root'
})
export class EditClientYearlyReportComponent implements OnInit {
  allStepFields: StepField[] = [];
  filteredStepFields: StepField[] = [];
  numberOptions = [1, 2, 3, 4, 5];

  displayAddDialog: boolean = false;
  newStepValue: string = '';
  newStepStepNumber: number = 1;

  constructor(private stepFieldService: stepFieldService) {}

  ngOnInit(): void {
    this.stepFieldService.getAllStepField().subscribe(
      (stepFields) => {
        this.allStepFields = stepFields.filter(x => x.type === "yearly-report");
        this.filteredStepFields = [...this.allStepFields];
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  filterByDescription(description: string): void {
    this.filteredStepFields = this.allStepFields.filter(step =>
      step.value.toLowerCase().includes(description.toLowerCase())
    );
  }

  filterByStepNumber(stepNumber: number): void {
    if (stepNumber) {
      this.filteredStepFields = this.allStepFields.filter(step =>
        step.stepNumber === stepNumber
      );
    } else {
      this.filteredStepFields = [...this.allStepFields];
    }
  }

  showAddDialog(): void {
    this.displayAddDialog = true;
  }

  hideAddDialog(): void {
    this.displayAddDialog = false;
    this.newStepValue = '';
    this.newStepStepNumber = 1;
  }

  addStep(): void {
    const newStep ={
      value: this.newStepValue,
      stepNumber: this.newStepStepNumber,
      isComplete: false,
      type: 'yearly-report'
    };

    if (this.isValidStep(newStep)) {
      this.stepFieldService.createStepField(newStep).subscribe(
        response => {
          if (response) {
            this.allStepFields.push(response);
            this.filteredStepFields = [...this.allStepFields];
            this.hideAddDialog();
          }
        },
        error => {
          console.error('Error adding step', error);
        }
      );
    }
  }

  isValidStep(step): boolean {
    return step.value.length >= 2 && step.stepNumber >= 1 && step.stepNumber <= 5;
  }

  update(step: StepField) {
    if (step.value.length < 2) {
      alert('הפירוט חייב להיות לפחות 2 תווים.');
      return;
    }

    if (step.stepNumber < 1 || step.stepNumber > 5) {
      alert('מספר השלב חייב להיות בטווח 1 עד 5.');
      return;
    }

    const originalStep = this.allStepFields.find(s => s._id === step._id);
    if (originalStep) {
      this.stepFieldService.updateStepField(step).subscribe(
        response => {
          if (response) {
            console.log('Step updated successfully', response);
          }
        },
        error => {
          console.error('Error updating step', error);
        }
      );
    }
  }

  delete(id: string) {
    this.stepFieldService.deleteStepField(id).subscribe(
      response => {
        if (response) {
          this.allStepFields = this.allStepFields.filter(step => step._id !== id);
          this.filteredStepFields = [...this.allStepFields];
        }
      },
      error => {
        console.error('Error deleting step', error);
      }
    );
  }
}