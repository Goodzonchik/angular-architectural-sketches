import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { OrganizationService } from '@shared';

import { TodoAny } from '@utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'organization-employee-and-subdivision',
  templateUrl: './organization-employee-and-subdivision.component.html',
  styleUrls: ['./organization-employee-and-subdivision.component.scss'],
})
export class OrganizationEmployeeAndSubdivisionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  hasChange = false;
  editable = false;

  private hasMainInfoChange = false;
  private organization$: Subscription;

  constructor(
    private organizationService: OrganizationService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      employeeCount: [null],
      subdivisionCount: [null],
    });

    this.form.disable();

    // Подписались на изменения организации
    this.organization$ = this.organizationService.getOrganization().subscribe((data: TodoAny) => {
      this.form.patchValue(data);
    });
  }

  ngOnInit() {
    this.organizationService.getOrganizationHasChange().subscribe((hasChange: TodoAny) => {
      this.hasMainInfoChange = hasChange;
    });
    this.organizationService
      .getEmployeeAndSubdivisionHasChange()
      .subscribe((hasChange: TodoAny) => {
        this.hasChange = hasChange;
      });

    this.form.valueChanges.subscribe((formData: TodoAny) => {
      this.organizationService.updateEmployeeAndSubdevision(formData);
    });
  }

  save() {
    // Аналогично методу save из компонента organization-card
    this.organizationService.save();
  }

  cancel() {
    // Аналогично методу save из компонента organization-card
    this.organizationService.cancel();
  }

  edit() {
    if (this.hasMainInfoChange) {
      this.organizationService.saveWithSubscribe().subscribe((data) => {
        this.organizationService.afterSaving(data);
        this.editable = true;
        this.form.enable();
      });
    } else {
      this.editable = true;
      this.form.enable();
    }
  }

  ngOnDestroy(): void {
    // Отписались изменения организации
    this.organization$.unsubscribe();
  }
}
