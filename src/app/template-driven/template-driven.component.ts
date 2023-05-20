import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Addressing, CrudTempletDrivenService, Datas, PersonalData } from '../services/crud-templet-driven.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent {

  // Table Column Name
  displayedColumns: string[] = ['id', 'companyName', 'fName', 'lName', 'email', 'mobileNo', 'address', 'salary', 'adharNo', 'panNo', 'passbookNo', 'actions'];

  // Dynamic Angular Material Table Reference
  dataSource = new MatTableDataSource<any>;

  // Dynamic Angular Material Table Pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Get & Store All Datas Array
  allDatas?: Array<Datas> = new Array<Datas>();

  // Data Binding
  getDatas: Datas;

  // Update & Add Button Toggle
  btnUDToogle: boolean = true; 

  // Search Value
  searchVal:string;

  constructor(private _crud: CrudTempletDrivenService, private modalService: NgbModal) { }

  ngOnInit(): void {

    // Data Binding Create New Reference
    this.getDatas = new Datas;
    this.getDatas.address = new Addressing;
    this.getDatas.pernalDetails = new PersonalData;

    // Get Data Method
    this.getDetail();
  }

  // Pagenations Methods
  pagenations(){
    this.dataSource.paginator = this.paginator;
  }

  // Add Module Open Method ( - Angular Material -)
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  // Get All Data In API Method
  getDetail() {
    this._crud.getData().subscribe({
      next: (res) => {
        this.allDatas = res;
        this.dataSource = new MatTableDataSource(this.allDatas);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Add Data In API Method
  addDetail() {
    this._crud.addData(this.getDatas).subscribe({
      next: (res) => {
        this.getDatas = new Datas;
        this.getDatas.address = new Addressing;
        this.getDatas.pernalDetails = new PersonalData;
        this.getDetail();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Fill Data In Edit Model
  fillDetail(data){
    this.getDatas = data;
    this.btnUDToogle = false;
  }

  // Dismiss Details
  dismissDetail(){
    this.getDatas = new Datas;
    this.getDatas.address = new Addressing;
    this.getDatas.pernalDetails = new PersonalData;
    this.btnUDToogle = true;
  }

  // Update Data In API Method
  updateDetail(){
    this._crud.editData(this.getDatas).subscribe({
      next: (res) => {
        this.getDatas = new Datas;
        this.getDatas.address = new Addressing;
        this.getDatas.pernalDetails = new PersonalData;
        this.btnUDToogle = true;
        this.getDetail();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Delete Data In API Method
  deleteDetail(body){
    this._crud.deleteData(body).subscribe({
      next: (res) => {
        this.getDatas = new Datas;
        this.getDatas.address = new Addressing;
        this.getDatas.pernalDetails = new PersonalData;
        this.getDetail();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Search Datas Method
  searchDeatil() {
    if (this.searchVal) {
      let searchEmployee = new Array<Datas>();
      if (this.allDatas.length > 0) {
        for (let emp of this.allDatas) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchVal.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.dataSource = new MatTableDataSource(searchEmployee);
        // this.allDatas = searchEmployee;
      }
    }
    else {
      this.getDetail();
    }
  }

}
