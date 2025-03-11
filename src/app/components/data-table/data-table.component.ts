import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users.service';
import { FormsUtilitiesService } from '../../services/forms-utilities.service';
import { User } from '../../models/user';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../services/flowbite.service';
import { Modal } from "flowbite";
import { Tooltip } from 'flowbite';
import type { TooltipOptions, TooltipInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';



@Component({
  selector: 'app-data-table',
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatPaginatorModule, MatTableModule, MatInputModule, MatSortModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  displayedColumns = ['first_name', 'is_admin', 'email', 'is_active', 'actions'];
  dataSource!: MatTableDataSource<User>;
  private _liveAnnouncer = inject(LiveAnnouncer);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Use static: false for dynamic elements

  error?: string;
  createUserForm: FormGroup;
  editUserForm: FormGroup;
  selectedUserToDelete: any = "";
  deleteModal!: Modal;
  editModal!: Modal;
  createModal!: Modal;
  selectedUserToEdit: any = "";

  constructor(
    private flowbiteService: FlowbiteService,
    private userService: UsersService,
    private formValidator: FormsUtilitiesService
  ) {
    this.createUserForm = new FormGroup(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        status: new FormControl(false, Validators.required),
        permissions: new FormControl('', Validators.required),
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

    this.editUserForm = new FormGroup(
      {

        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        status: new FormControl(true, Validators.required),
        permissions: new FormControl('', Validators.required),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        password: new FormControl('', [
          Validators.minLength(8),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        password_confirmation: new FormControl('', [
          Validators.minLength(8),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ])
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // ✅ Initialize Flowbite and Load Data
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {

      initFlowbite();
      console.log("Flowbite initialized");
      this.loadUsers();


      setTimeout(() => this.initializeModals(), 100);
      setTimeout(() => this.initializeTooltips(), 100);

    });
  }




  // ✅ Filtering Logic
  applyFilter(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ✅ Load Data from API
  private loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource<User>(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.error = 'Failed to load users';
      }
    });
  }

  // ✅ Announce Sort Change
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // ✅ Password Match Validator
  passwordsMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('password_confirmation')?.value;

    return password === passwordConfirmation ? null : { passwordsMismatch: true };
  }

  // ✅ Create User
  createNewUser(): void {
    if (this.createUserForm.invalid) {
      console.warn('⚠ Form is invalid');
      return;
    }

    const { first_name, last_name, email, password, permissions, status } = this.createUserForm.value;
    const is_admin = permissions === 'Administrator';
    const is_active = status;

    this.userService.createUser(first_name, last_name, email, password, is_admin, is_active).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
          timer: 3000,
          showConfirmButton: false
        });

        this.createUserForm.reset();
        this.loadUsers();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred!',
          timer: 2500,
          showConfirmButton: false
        });
      }
    });
  }

  // ✅ Initialize Delete Modal
  private initializeModals(): void {
    const deleteModalElement = document.querySelector('#delete-modal') as HTMLElement;
    const editModalElement = document.querySelector('#edit-modal') as HTMLElement;
    const createModalElement = document.querySelector('#create-modal') as HTMLElement;

    if (deleteModalElement && editModalElement && createModalElement) {
      this.deleteModal = new Modal(deleteModalElement);
      this.editModal = new Modal(editModalElement);
      this.createModal = new Modal(createModalElement);
    } else {
      console.warn('Modal elements not found in DOM!');
    }
  }

  private initializeTooltips(): void {
    // set the tooltip content element
    const targetEl: HTMLElement = document.getElementById('tooltip-permissions-content') as HTMLElement;
    // set the element that trigger the tooltip using hover or click
    const triggerEl: HTMLElement = document.getElementById('tooltip-permissions-button') as HTMLElement;

    const options: TooltipOptions = {
      placement: 'top',
      triggerType: 'hover'
    }


    if (targetEl && triggerEl) {
      const tooltip: TooltipInterface = new Tooltip(targetEl, triggerEl, options);
    } else {
      console.warn('Modal elements not found in DOM!');
    }
  }




  // ✅ Open Delete Modal
  openDeleteModal(row: any): void {
    console.log("ROWW: ", row)
    this.selectedUserToDelete = row;
    console.log('Selected user to delete:', row.id);

    if (this.deleteModal) {
      this.deleteModal.show();
    } else {
      console.warn("⚠️ Modal is not initialized yet.");
    }
  }


  // ✅ Close Delete Modal
  closeDeleteModal(): void {
    if (this.deleteModal) {
      this.deleteModal.hide();
    }
  }

  openEditModal(row: any): void {
    this.selectedUserToEdit = row;

    this.editUserForm.reset();

    const { first_name, last_name, email, is_admin, is_active } = this.selectedUserToEdit;

    this.editUserForm.patchValue({
      first_name: first_name,
      last_name: last_name,
      email: email,
      permissions: is_admin,
      status: is_active
    });

    console.log("ROW: ", this.selectedUserToEdit);
    console.log("Form: ", this.editUserForm.value);
    if (this.editModal) {
      this.editModal.show();
    } else {
      console.warn("⚠️ Modal is not initialized yet.");
    }
  }

  closeEditModal(): void {
    if (this.editModal) {
      this.editModal.hide();
    }
  }

  openCreateModal(): void {
    if (this.createModal) {
      this.createModal.show()
    }
  }

  closeCreateModal(): void {
    if (this.createModal) {
      this.createModal.hide()
    }
  }


  // ✅ Delete User
  deleteUser(): void {

    this.userService.deactivateUser(this.selectedUserToDelete.id).subscribe({
      next: (response) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: response.message,
            timer: 3000,
            showConfirmButton: false
          });
          this.loadUsers();
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred!',
          timer: 2500,
          showConfirmButton: false
        });
      }
    });
  }

  // ✅ Edit User
  editUser(): void {
    if (this.editUserForm.invalid) {
      console.warn('⚠ Form is invalid');
      return;
    }

    const { first_name, last_name, email, password, permissions, status } = this.editUserForm.value;
    const is_admin = !!permissions;
    const is_active = status;



    // Create a dynamic object based on the provided values
    const updates: Partial<any> = {};

    if (first_name) updates['first_name'] = first_name;
    if (last_name) updates['last_name'] = last_name;
    if (email) updates['email'] = email;
    if (password) {
      updates['password'] = password;
      updates['password_confirmation'] = password;
    }
    if (is_admin !== undefined) updates['is_admin'] = is_admin;
    if (is_active !== undefined) updates['is_active'] = is_active;

    // Ensure the selectedUserId exists before sending the request
    if (!this.selectedUserToEdit.id) {
      console.warn('⚠ No user selected to update.');
      return;
    }

    console.log('📡 PATCH request payload:', updates);
    this.closeEditModal();

    this.userService.editUser(this.selectedUserToEdit.id, updates).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
          timer: 3000,
          showConfirmButton: false
        });

        this.editUserForm.reset();
        this.loadUsers(); // Refresh the table after updating
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: error.message,
          text: error.error,
          timer: 2500,
          showConfirmButton: false
        });
      }
    });
  }

}