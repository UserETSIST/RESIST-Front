import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { FlowbiteService } from '../../../services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormsUtilitiesService } from '../../../services/forms-utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-table',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],

})
export class UsersTableComponent implements OnInit, AfterViewInit {

  private dataTable: DataTable | null = null;
  dataUsers: User[] = [];
  error: string | null = null;
  createUserForm: FormGroup;

  constructor(
    private userService: UsersService,
    private formValidator: FormsUtilitiesService,
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    this.createUserForm = new FormGroup(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        last_name: new FormControl('', [
          Validators.minLength(2),
          Validators.required,
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        status: new FormControl(true, [
          Validators.required,
        ]),
        permissions: new FormControl('', [
          Validators.required,
        ]),

        email: new FormControl('', [
          Validators.required,
          Validators.email,
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        password_confirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ])
      },
      { validators: this.passwordsMatchValidator }
    );
  }






  ngAfterViewInit(): void {
    console.log("ngAfterViewInit() called. Ensuring we are in the browser.");

    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
    }
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
      this.initializeDataTable();
      console.log('Flowbite loaded in ngOnInit.');
    });

  }


  private initializeDataTable(): void {
    const tableElement = document.getElementById('pagination-table');
    if (tableElement) {
      if (!this.dataTable) { // Ensure DataTable isn't reinitialized multiple times
        this.dataTable = new DataTable("#pagination-table", {
          paging: true,
          perPage: 5,
          perPageSelect: [1, 5, 10, 15, 20, 25],
          sortable: false,
          searchable: true
        });
        console.log('DataTable initialized.');
      }
    } else {
      console.warn('Table element not found.');
    }
  }


  private loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.dataUsers = response.data;
        console.log("ALL USERS: ", response.data)
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.error = 'Failed to load users';
      }
    });
  }


  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('password_confirmation')?.value;

    if (password !== passwordConfirmation) {
      return { passwordsMismatch: true }; // Validation error
    }
    return null; // Valid form
  }

  /**
* Submit new password if the form is valid
*/
  createNewUser(): void {
    if (this.createUserForm.invalid) {
      console.warn("⚠ Form is invalid, cannot create user.");
      return;
    }

    console.log("📝 SUBMITTING USER FORM VALUES: ", this.createUserForm.value);

    const { first_name, last_name, email, password, permissions, status } = this.createUserForm.value;

    // Convert "Administrator" or "Viewer" into a boolean for `is_admin`
    const is_admin = permissions === "Administrator";
    const is_active = status;

    this.userService.createUser(first_name, last_name, email, password, is_admin, is_active).subscribe({
      next: (response) => {
        if (response.success) {
          const user = response.data;
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 3000
          });

        } else {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "An unexpected error has occured!",
            showConfirmButton: false,
            timer: 2500
          });
        }
        this.createUserForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "An unexpected error has occured!",
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  }

}
