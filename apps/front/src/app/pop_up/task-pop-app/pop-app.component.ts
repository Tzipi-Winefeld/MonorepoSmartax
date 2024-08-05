import { Component, Input, OnInit } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  Location,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
} from '@angular/common';
import { TaskComponent } from '../../task/task.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Footer, PrimeTemplate } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IconProfileComponent } from '../../share/icon-profile/icon-profile.component';
import { Button, ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-pop-app',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    RouterLink,
    RouterOutlet,
    // TaskComponent,
    DialogModule,
    Footer,
    ButtonDirective,
    SidebarModule,
    NgIf,
    CalendarModule,
    FormsModule,
    AutoCompleteModule,
    PrimeTemplate,
    IconProfileComponent,
    MultiSelectModule,
    Button,
    RouterLink,
    InputTextModule,
    NgFor,
    PanelModule,
    TableModule,
    NgStyle,
    NgClass,
    ToastModule,
    DatePipe,
    TaskComponent,
  ],
  templateUrl: './pop-app.component.html',
  styleUrl: './pop-app.component.css',
})
export class PopAppComponent implements OnInit {
  id: string | null;
  @Input() parent: string | null = null;

  visible: boolean = true;

  create = false;
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.id == 'create') {
      // alert("יצירה בפופאפ")
      this.id == null;
      this.create = true;
    } else {
      alert('עריכה בפופאפ');
      this.create = false;
    }

    this.route.queryParams.subscribe((params) => {
      this.parent = params['parent'];
    });
  }

  showDialog() {
    this.visible = true;
  }
  show = true;

  onHide() {
    console.log('The dialog has been closed.');
    this.location.back();
  }
}