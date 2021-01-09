import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PAGE_SIZE} from '../common/list-components/pagination/pagination.component';
import {Subject} from 'rxjs';
import {NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SortableDirective} from '../common/list-components/sort/sortable.directive';
import {debounceTime} from 'rxjs/internal/operators';
import {Contract} from './contract.model';
import {Company} from '../company/company.model';
import {Project} from '../project/project.model';
import {ProjectService} from '../project/project.service';
import {ContractService} from './contract.service';
import {CompanyService} from '../company/company.service';

@Component({
    selector: 'app-contract-details',
    template: `
        <div>
            <ngb-alert #errorAlert
                       *ngIf="error_message"
                       [type]="'danger'"
                       [dismissible]="false"
                       (closed)=" error_message = ''"
                       class="text-center">
                {{error_message | translate}}
            </ngb-alert>
            <ngb-alert #successAlert
                       *ngIf="success_message"
                       [type]="'success'"
                       [dismissible]="false"
                       (closed)=" success_message = ''"
                       class="text-center">
                {{success_message | translate}}
            </ngb-alert>
            <div class="d-flex flex-column border rounded p-2 mt-3 w-50 mx-auto">
                <div class="d-flex justify-content-between">
                    <h2>{{'contract.details.header' | translate }}{{contract.contractNumber}}</h2>
<!--                    <a class="btn btn-primary btn-lg" (click)="openEdit()">{{'employee.details.edit' | translate}}</a>-->
                </div>
                <div class="d-flex flex-column align-items-center ">
                    <div class="form-group">
                        <label for="companyName">{{'contract.details.company-name' | translate}} </label>
                        <input class="form-control" value="{{contract.companyName}}" name="companyName" disabled>
                    </div>
                    <div class="form-group">
                        <label for="taxNumber">{{'contract.details.tax-number' | translate}} </label>
                        <input class="form-control" value="{{company.taxNumber}}" name="taxNumber" disabled>
                    </div>
                    <div class="form-group">
                        <label for="address">{{'contract.details.address' | translate}} </label>
                        <input class="form-control" value="{{company.address}}" name="address" disabled>
                    </div>
                    <div class="form-group">
                        <label for="project">{{'contract.details.project-name' | translate}} </label>
                        <input class="form-control" value="{{project.name}}" name="project" disabled>
                    </div>
                    <div class="form-group">
                        <label for="amount">{{'contract.details.amount' | translate}} </label>
                        <input class="form-control" value="{{contract.amount}}" name="amount" disabled>
                    </div>
                    <div class="form-group">
                        <label for="conditions">{{'contract.details.conditions' | translate}} </label>
                        <textarea class="form-control" value="{{contract.conditions}}" name="conditions" disabled style="resize: none"></textarea>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class ContractDetailsComponent implements OnInit, OnDestroy {

    pageSize = PAGE_SIZE;
    error_message: string;
    success_message: string;
    contract: Contract;
    company: Company;
    project: Project;
    private errorSubject = new Subject<string>();
    private successSubject = new Subject<string>();
    @ViewChild('errorAlert', {static: false}) errorAlert: NgbAlert;
    @ViewChild('successAlert', {static: false}) successAlert: NgbAlert;
    @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;


    constructor(private contractService: ContractService,
                private projectService: ProjectService,
                private companyService: CompanyService,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        const contractId = this.route.snapshot.paramMap.get('contractId');
        this.contractService.getContract(contractId).subscribe(
            (contract) => {
                this.contract = contract;
                this.projectService.getProject(contract.projectId).subscribe(
                    (project) => {
                        this.project = project
                    }
                );
                this.companyService.getCompany(contract.companyTaxNumber).subscribe(
                    (company) => {
                        this.company = company
                    }
                );
            }
        );

        this.errorSubject.pipe(debounceTime(10000)).subscribe(() => {
            if (this.errorAlert) {
                this.errorAlert.close();
            }
        });

        this.successSubject.pipe(debounceTime(10000)).subscribe(() => {
            if (this.successAlert) {
                this.successAlert.close();
            }
        });
    }

    ngOnDestroy(): void {
        this.successSubject.unsubscribe();
        this.errorSubject.unsubscribe();
    }

    private showInfo(result) {
        if (result.includes('error')) {
            this.error_message = result;
            this.errorSubject.next(result);
        } else {
            this.success_message = result;
            this.successSubject.next(result);
        }
    }
}
