import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { OrganizationService } from '@shared/states/organization.service';

import { TodoAny } from '@utils';

@Component({
  selector: 'organization-employee-and-subdivision',
  templateUrl: './organization-employee-and-subdivision.component.html',
  styleUrls: ['./organization-employee-and-subdivision.component.scss'],
})
export class OrganizationEmployeeAndSubdivisionComponent implements OnInit {
  form: FormGroup;
  hasMainInfoChange = false;
  hasChange = false;

  editable = false;

  constructor(
    private organizationService: OrganizationService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      employeeCount: [null],
      subdivisionCount: [null],
    });

    this.form.disable();
  }

  ngOnInit() {
    this.organizationService.getOrganization().subscribe((data: TodoAny) => {
      this.form.patchValue(data);
    });

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
    this.organizationService.save();
  }

  cancel() {
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
}
