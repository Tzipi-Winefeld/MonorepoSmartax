import { Component, Inject } from '@angular/core';
import { Injectable, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MonthlyReportService } from '../../../_services/monthlyReport.service';
import { MonthlyReport } from '../../../_models/monthlyReport.module';
import { Client } from '../../../../../../../server/src/Models/client.model';
import { DatePipe } from '@angular/common';
import { TreeTableModule } from 'primeng/treetable';
import { stepFieldMonth } from '../../../_models/stepFieldMonth.module';
@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TreeTableModule,
  ],
  templateUrl: './monthly-report.component.html',
  styleUrl: './monthly-report.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class MonthlyReportComponent implements OnInit {
  select: any;
  constructor(private monthlyReportService: MonthlyReportService) {}
  ngOnInit(): void {
    this.client = history.state.client;
    //this.getMonthlyReports()
   // this.getMonthlyReportsForClientF();
    this.getMonthlyReports();
    this.getStepByType('מעם');
  }

  dates: any = [{ "num": "01" }, { "num": "02" }, { "num": "03" }, { "num": "04" }, { "num": "05" }, { "num": "06" }, { "num": "07" }, { "num": "08" }, { "num": "09" }, { "num": "10" }, { "num": "11" }, { "num": "12" }];
  // currentDate = new Date();
  selectedDate: string;
  // selectedDate: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, this.currentDate.getDate());
  // datePipe: DatePipe = new DatePipe('en-US');
  //formattedDate: string = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
  allMonthlyReportsClient: MonthlyReport[] | undefined;
  client: Client;
  clientId: string;
  allMonthlyReports: MonthlyReport[] | undefined;
  myReport: MonthlyReport[] | undefined;
  y: boolean = false;
  types: string[] = [];
  steps: any[];
  allFields:stepFieldMonth[];
  fieldByType: { [key: string]: stepFieldMonth[] } = {};
  myDate: Date;;
  getMonthlyReportsForClientF(date:Date): void {
    console.log(this.client, 'client');
    const clientId = String(this.client._id);
    this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe(
      (reports) => {
        this.allMonthlyReportsClient = reports;
        this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === date.getMonth());

      },
      (error) => {
        console.error('Error fetching monthly reports for client', error);
      }
    );
  }
  getMonthlyReports(): void {
    this.monthlyReportService.getAllMonthlyReport().subscribe(
      (reports) => {
        this.allMonthlyReports = reports;
        console.log(this.allMonthlyReports, 'myReport');
      },
      (error) => {
        console.error('Error fetching yearly reports for client', error);
      }
    );
  }
  myReportf(month: string): void {
    const currentYear = new Date().getFullYear();
    const m = Number(month);
    this.myDate = new Date(currentYear, m, 1)
    this.getMonthlyReportsForClientF(this.myDate)
  }
  getStepByType(type: string): void {
    this.steps = this.allMonthlyReports.map((r) =>
      r.monthlyReportFields.filter((r) => r.type === type)
    );
    console.log(this.steps, 'steps');
  }
}
