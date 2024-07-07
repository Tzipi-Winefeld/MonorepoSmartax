import { PriorityService } from './../_services/priority.service';
import { Priority } from './../_models/priority.module';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client.module';
import { TagService } from '../_services/tag.service';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task.module';
import { Tag } from '../_models/tag.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { Status } from '../_models/status.module';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ColorPickerModule } from 'primeng/colorpicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipsModule } from 'primeng/chips';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
// import { UploadDocComponent } from '../pages/client/upload-doc/upload-doc.component';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '../editor/editor.component';
import { UploadDocTaskComponent } from '../upload-doc-task/upload-doc-task.component';
import { DocumentService } from '../_services/document.service';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { StatusService } from '../_services/status.service';

@Component({


  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CardModule,
    PanelModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    TagModule,
    ListboxModule,
    MenuModule,
    CalendarModule,
    ChipsModule,
    InputGroupAddonModule,
    InputGroupModule,
    CheckboxModule,
    RadioButtonModule,
    EditorModule,
    FileUploadModule,
    ToastModule,
    ColorPickerModule,
    AutoCompleteModule,
    IconProfileComponent,
    // UploadDocComponent,
    TabMenuModule,
    EditorComponent,
    UploadDocTaskComponent,
  ],
  providers: [DocumentService],

})
export class TaskComponent implements OnInit {
  users: User[] = [];
  clients: Client[] = [];
  listStatus: Status[] = [];
  listPriority: Priority[] = [];
  items: any[] = []; //list of status
  currentTask: Task | undefined;
  newTask: Task | undefined;
  taskName!: string;
  rangeDates: Date[] = [];
  id: string | undefined;
  checked: boolean = false;
  text: string | undefined; //description of task
  buttonText: string = '';
  buttons: { color: string; text: string; id: string }[] = [];
  htmlContent: string = '';
  images: string[] = [];

  //
  showStatus: boolean = false;
  showAssignees: boolean = false;
  showClients: boolean = false;
  showTags: boolean = false;
  showDescription: boolean = false;
  showPriority: boolean = false;
  showDoc: boolean = false;
  //
  selectedCity!: any;
  selectedClient!: any;
  selectedUser!: any;
  selectStatus!: Status;
  selectedColor: string = '#1976d2'; // default color
  selectedTags: Tag[] = [];
  selectedPriority!: Priority;
  //
  formGroupClient!: FormGroup;
  formGroupUser!: FormGroup;
  formGroupStatus!: FormGroup;
  formGroupTags!: FormGroup;
  //
  constructor(
    private userSErvice: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private tasksService: TaskService,
    private statusService: StatusService,
    private priorityService: PriorityService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    if (this.id != 'create') {
      this.tasksService.searchTask(this.id!).subscribe({
        next: (data) => {
          console.log('tasks: ', data);
          this.currentTask = data;
          this.selectStatus = this.currentTask.status;
          this.selectedPriority = this.currentTask.priority;
          this.selectedClient = this.currentTask.client;
          this.selectedUser = this.currentTask.assignedTo;
          this.rangeDates = [new Date(), new Date()];
          this.rangeDates![0] = new Date(this.currentTask.startDate); //
          this.rangeDates![1] = new Date(this.currentTask.dueDate); //
          this.htmlContent = this.currentTask.description;
          console.log(this.rangeDates);

          this.images = this.currentTask.images;
          this.taskName = this.currentTask.taskName;
          this.buttons = this.currentTask.tags.map((tag: Tag) => ({
            color: tag.color,
            text: tag.text,
            id: tag._id!,
          }));
          this.selectedTags = this.currentTask.tags;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    //users
    this.userSErvice.getAllUsers().subscribe({
      next: (data) => {
        console.log('users: ', data);
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //clients
    this.clientService.getAllClients().subscribe({
      next: (dataClients) => {
        console.log(dataClients);
        this.clients = dataClients;
      },
      error: (errClients) => {
        console.log(errClients);
      },
    });
    // status
    this.statusService.getAllStatuses().subscribe({
      next: (data) => {
        console.log(data);
        this.listStatus = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // priority
    this.priorityService.getAllPrioritys().subscribe({
      next: (data) => {
        console.log(data);
        this.listPriority = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //from group
    this.formGroupClient = new FormGroup({
      selectedClient: new FormControl<any | null>(null),
    });
    this.formGroupUser = new FormGroup({
      selectedUser: new FormControl<any | null>(null),
    });
    this.formGroupStatus = new FormGroup({
      selectStatus: new FormControl<any | null>(null),
    });
    //description
    // this.text2 =
    //   '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
    // this.text =
    //   '<p>fgfjgklvjghlikj;<span style="background-color: rgb(230, 0, 0);">kjbll;</span><span style="background-color: rgb(230, 0, 0); color: rgb(0, 138, 0);">jlkl</span><span style="color: rgb(0, 138, 0);">gvhbjln;k</span></p>';
    // this.editor!.writeValue(this.htmlContent);
  }

  //functions
  save() {
    //create task
    const newTask: Task = {
      client: this.selectedClient,
      description: this.htmlContent,
      status: this.selectStatus,
      tags: this.buttons,
      assignedTo: this.selectedUser,
      taskName: this.taskName,
      dueDate: this.rangeDates[1]!,
      startDate: this.rangeDates[0]!,
      images: this.images,
      priority: this.selectedPriority,
    };
    if (this.id == 'create') {

      this.tasksService.createTask(newTask).subscribe({
        next: (dataClients) => {
          console.log(dataClients);
        },
        error: (errClients) => {
          console.log(errClients);
        },
      });
    } else if (this.id != 'create') {
      this.tasksService.updateTask(this.id!, newTask).subscribe({
        next: (dataClients) => {
          console.log(dataClients);
        },
        error: (errClients) => {
          console.log(errClients);
        },
      });
    }
  }
  //
  cancel() {
    //return to last page
    window.history.back();
  }
  //
  changeStatus() {
    for (let i = 0; i < this.listStatus.length; i++) {
      if (this.listStatus[i].name === 'COMPLETE') {
        this.selectStatus = this.listStatus[i];
      }
    }
  }
  //
  createTag() {
    this.showTags = !this.showTags;
    if (this.buttonText && this.selectedColor) {
      this.tagService
        .createTag({ color: this.selectedColor, text: this.buttonText })
        .subscribe({
          next: (dataTag) => {
            console.log(dataTag);
            this.selectedTags.push({
              color: dataTag.color,
              text: dataTag.text,
              _id: dataTag._id!,
            });
            this.buttons.push({
              color: this.selectedColor,
              text: this.buttonText,
              id: dataTag._id!,
            });
            this.buttonText = '';
          },
          error: (errTag) => {
            console.log(errTag);
          },
        });
    }
  }
  //
  removeButton(button: any) {
    const index = this.buttons.indexOf(button);
    if (index !== -1) {
      this.buttons.splice(index, 1);
    }
  }

  status(s: Status) {
    this.selectStatus = s;
    console.log(this.selectStatus);
  }

  priority(s: Priority) {
    this.selectedPriority = s;
    console.log(this.selectedPriority);
  }
  // date
  onDateSelect(event: any) {
    if (event.data) {
      this.rangeDates[0] = event.data[0];
      this.rangeDates[1] = event.data[1];
    }
    console.log(this.rangeDates);
    console.log(event.data);
  }
  // images
  // ===================================================
  download() {
    const imageUrl = `http://localhost:8080/uploads/ttt.png`;
    FileSaver.saveAs(imageUrl, 'ttt.png');
  }
  //description
  response: any;
  handleResponse(event: any) {
    this.response = event;
    console.log(this.response);
    this.images.push(this.response.viewLink);
    console.log(this.images);
  }
  onContentChange(content: string) {
    this.htmlContent = content;
    console.log(this.htmlContent); // או כל פעולה אחרת שתרצה לבצע עם התוכן
  }
  @ViewChild(EditorComponent) editorComponent!: EditorComponent;

  updateEditorContent(newContent: string) {
    this.editorComponent.initialContent = newContent;
  }
  // ========================================
}
