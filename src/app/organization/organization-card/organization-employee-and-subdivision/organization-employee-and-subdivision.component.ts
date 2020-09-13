import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { TodoAny } from '@utils';
import { Subscription } from 'rxjs';
import { OrganizationCardService } from '../organization-card.service';

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
    private organizationCardService: OrganizationCardService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      employeeCount: [null],
      subdivisionCount: [null],
    });

    this.form.disable();

    // Подписались на изменения организации
    this.organization$ = this.organizationCardService
      .getOrganization()
      .subscribe((data: TodoAny) => {
        this.form.patchValue(data);
      });
  }

  ngOnInit() {
    this.organizationCardService.getOrganizationHasChange().subscribe((hasChange: TodoAny) => {
      this.hasMainInfoChange = hasChange;
    });
    this.organizationCardService
      .getEmployeeAndSubdivisionHasChange()
      .subscribe((hasChange: TodoAny) => {
        this.hasChange = hasChange;
      });

    this.form.valueChanges.subscribe((formData: TodoAny) => {
      this.organizationCardService.updateEmployeeAndSubdevision(formData);
    });
  }

  save() {
    // Аналогично методу save из компонента organization-card
    this.organizationCardService.save();
  }

  cancel() {
    // Аналогично методу save из компонента organization-card
    this.organizationCardService.cancel();
  }

  edit() {
    if (this.hasMainInfoChange) {
      this.organizationCardService.saveWithSubscribe().subscribe((data) => {
        this.organizationCardService.afterSaving(data);
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
